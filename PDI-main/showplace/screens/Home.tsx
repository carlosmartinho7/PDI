import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, Image, ScrollView, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { styles } from '../style/global.style';
import supabase from '../supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  EventDetails: { eventId: string };
  UserProfile: undefined;
  Notifications: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type Props = { navigation: HomeScreenNavigationProp };

const SUPABASE_STORAGE_URL = "https://gcupjyukfhhebbxfcuiv.supabase.co/storage/v1/object/public/eventos-imagens/";

const categorias = [
  { nome: 'Música', imagem: 'https://cdn-icons-png.flaticon.com/512/3063/3063491.png' },
  { nome: 'Gastronomia', imagem: 'https://cdn-icons-png.flaticon.com/512/1903/1903162.png' },
  { nome: 'Desporto', imagem: 'https://cdn-icons-png.flaticon.com/512/1040/1040241.png' },
  { nome: 'Festas', imagem: 'https://cdn-icons-png.flaticon.com/512/2534/2534176.png' },
  { nome: 'Cultura', imagem: 'https://cdn-icons-png.flaticon.com/512/867/867971.png' },
];

const StarRating = ({ rating, onRate }: { rating: number, onRate: (rating: number) => void }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <TouchableOpacity key={i} onPress={() => onRate(i + 1)}>
          <Text style={[styles.star, i < rating ? { color: '#fff033' } : { color: '#ddd' }]}>{i < rating ? '★' : '☆'}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default function HomeScreen({ navigation }: Props) {
  const [pesquisa, setPesquisa] = useState<string>('');
  const [eventos, setEventos] = useState<any[]>([]);
  const [avaliacoes, setAvaliacoes] = useState<{ [key: string]: number }>({});
  const [favoritos, setFavoritos] = useState<{ [key: string]: boolean }>({});

  // Busca eventos e avaliações associadas do utilizador
  const fetchEventosEAvaliacoes = async () => {
    try {
      const { data: eventosData, error: eventosError } = await supabase
        .from('eventos')
        .select('*')
        .ilike('nome', `%${pesquisa}%`);

      if (eventosError) {
        Alert.alert('Erro', 'Não foi possível carregar os eventos');
        console.error(eventosError);
        return;
      }

      setEventos(eventosData || []);

      // Obter id do utilizador
      const idutilizador = await AsyncStorage.getItem('idutilizador');
      if (!idutilizador) {
        console.warn('Utilizador não autenticado para buscar avaliações');
        return;
      }

      // Buscar avaliações do utilizador para esses eventos
      const eventIds = (eventosData || []).map(e => e.id);

      if (eventIds.length === 0) return;

      const { data: avaliacoesData, error: avaliacoesError } = await supabase
        .from('avaliacoes')  // corrigido para plural
        .select('idevento, avaliacao')
        .eq('idutilizador', idutilizador)
        .in('idevento', eventIds);

      if (avaliacoesError) {
        console.error('Erro ao buscar avaliações:', avaliacoesError);
        return;
      }

      // Construir objeto { idevento: avaliacao }
      const avals: { [key: string]: number } = {};
      (avaliacoesData || []).forEach(a => {
        avals[a.idevento] = a.avaliacao;
      });

      setAvaliacoes(avals);

    } catch (err) {
      console.error('Erro geral ao buscar eventos e avaliações:', err);
    }
  };

  const carregarFavoritosSalvos = async () => {
    try {
      const salvos = await AsyncStorage.getItem('favoritos');
      if (salvos) {
        const ids: string[] = JSON.parse(salvos);
        const obj: { [key: string]: boolean } = {};
        ids.forEach((id) => {
          obj[id] = true;
        });
        setFavoritos(obj);
      }
    } catch (e) {
      console.error('Erro ao carregar favoritos:', e);
    }
  };

  const handleAvaliar = async (eventId: string, rating: number) => {
    try {
      const idutilizador = await AsyncStorage.getItem('idutilizador');
      if (!idutilizador) {
        Alert.alert('Erro', 'Utilizador não autenticado');
        return;
      }

      const novaAvaliacao = (avaliacoes[eventId] === rating) ? 0 : rating;

      setAvaliacoes((prev) => ({
        ...prev,
        [eventId]: novaAvaliacao,
      }));

      // Verifica se já existe avaliação do utilizador para este evento
      const { data: existente, error: fetchError } = await supabase
        .from('avaliacoes')  // corrigido para plural
        .select('*')
        .eq('idevento', eventId)
        .eq('idutilizador', idutilizador)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error('Erro ao verificar avaliação existente:', fetchError);
        return;
      }

      if (existente) {
        // Atualiza avaliação
        const { error: updateError } = await supabase
          .from('avaliacoes')  // corrigido para plural
          .update({ avaliacao: novaAvaliacao })
          .eq('idevento', eventId)
          .eq('idutilizador', idutilizador);
        if (updateError) {
          console.error('Erro ao atualizar avaliação:', updateError);
        }
      } else {
        // Cria nova avaliação
        const { error: insertError } = await supabase
          .from('avaliacoes')  // corrigido para plural
          .insert([
            {
              idevento: eventId,
              idutilizador: idutilizador,
              avaliacao: novaAvaliacao,
            },
          ]);
        if (insertError) {
          console.error('Erro ao inserir avaliação:', insertError);
        }
      }
    } catch (err) {
      console.error('Erro geral ao avaliar:', err);
    }
  };

  const toggleFavorito = async (id: string) => {
    setFavoritos((prev) => {
      const updated = {
        ...prev,
        [id]: !prev[id],
      };
      const idsFavoritos = Object.keys(updated).filter((key) => updated[key]);
      AsyncStorage.setItem('favoritos', JSON.stringify(idsFavoritos));
      return updated;
    });
  };

  useEffect(() => {
    fetchEventosEAvaliacoes();
    carregarFavoritosSalvos();
  }, [pesquisa]);

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <Image source={require('../assets/logo sem fundo.png')} style={styles.navbarLogo} />
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/5977/5977696.png' }}
            style={styles.notificationIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
          <Image
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg' }}
            style={styles.userIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Pesquisa */}
      <TextInput
        style={styles.input}
        placeholder="🔍 Procurar"
        placeholderTextColor="#888"
        value={pesquisa}
        onChangeText={(text: string) => setPesquisa(text)}
      />

      {/* Categorias */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
        {categorias.map((categoria, index) => (
          <TouchableOpacity key={index} style={styles.categoryButton}>
            <Image source={{ uri: categoria.imagem }} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{categoria.nome}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Lista de eventos */}
      <FlatList
        data={eventos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const imageUrl = item.url_imagem?.startsWith("http")
            ? item.url_imagem
            : `${SUPABASE_STORAGE_URL}${item.url_imagem || ''}`;

          return (
            <TouchableOpacity onPress={() => navigation.navigate('EventDetails', { eventId: item.id })}>
              <View style={styles.evento}>
                <Image
                  source={{ uri: imageUrl || 'https://via.placeholder.com/150' }}
                  style={styles.imagem}
                />
                <View style={styles.eventoInfo}>
                  <Text style={styles.eventoNome}>{item.nome}</Text>
                  <Text style={styles.eventoLocal}>📍 {item.local}</Text>
                  <View style={styles.rating}>
                    <StarRating
                      rating={avaliacoes[item.id] || 0}
                      onRate={(rating) => handleAvaliar(item.id, rating)}
                    />
                  </View>
                </View>

                <View style={styles.favoritoContainer}>
                  <TouchableOpacity
                    onPress={() => toggleFavorito(item.id)}
                    style={{ padding: 25, marginTop: -75 }}
                  >
                    <Text style={[styles.favoritoIcon, favoritos[item.id] ? { color: '#FF5733' } : { color: '#ddd' }]}>
                      {favoritos[item.id] ? '🖤' : '🤍'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
