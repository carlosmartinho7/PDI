import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { styles } from '../style/global.style';
import supabase from '../supabase';
import MapView, { Marker } from 'react-native-maps';

type Props = StackScreenProps<RootStackParamList, 'EventDetails'>;

interface Comentario {
  id: number;
  comentario: string;
  created_at: string;
  utilizadores: {
    nome: string;
  };
}

export default function EventDetailsScreen({ route, navigation }: Props) {
  const { eventId } = route.params;
  const [detalhes, setDetalhes] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [novoComentario, setNovoComentario] = useState<string>('');
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    fetchUtilizador();
    fetchDetalhesEvento();
    fetchComentarios();
  }, [eventId]);

  const fetchUtilizador = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
      console.error('Erro ao obter utilizador:', error?.message);
    } else {
      setUserId(data.user.id);
    }
  };

  const fetchDetalhesEvento = async () => {
    try {
      const { data, error } = await supabase
        .from('eventos')
        .select('*')
        .eq('id', eventId)
        .single();

      if (error) {
        Alert.alert('Erro', 'Não foi possível carregar os detalhes do evento.');
        console.error(error);
      } else {
        setDetalhes(data);
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao carregar os detalhes.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchComentarios = async () => {
    const { data, error } = await supabase
      .from('comentario')
      .select(`
        id,
        comentario,
        created_at,
        utilizadores (
          nome
        )
      `)
      .eq('idevento', eventId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar comentários:', error);
    } else if (data) {
      const comentariosFormatados = data.map((item: any) => ({
        ...item,
        utilizadores: Array.isArray(item.utilizadores) ? item.utilizadores[0] : item.utilizadores,
      }));
      setComentarios(comentariosFormatados as Comentario[]);
    }
  };

  const handleAdicionarComentario = async () => {
    if (!novoComentario.trim()) {
      Alert.alert('Erro', 'O comentário não pode estar vazio.');
      return;
    }
    if (!userId) {
      Alert.alert('Erro', 'Utilizador não autenticado.');
      return;
    }

    const { error } = await supabase.from('comentario').insert([
      {
        comentario: novoComentario.trim(),
        idutilizador: userId,
        idevento: eventId,
      },
    ]);

    if (error) {
      Alert.alert('Erro', 'Erro ao guardar o comentário.');
      console.error(error);
    } else {
      setNovoComentario('');
      fetchComentarios(); // Atualiza comentários
    }
  };

  const formatDateTime = (dateTime: string) => {
    const [date, time] = dateTime.split('T');
    return `${date} ${time.slice(0, 5)}`;
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FF5733" />
        <Text style={styles.loadingText}>Carregando detalhes do evento...</Text>
      </View>
    );
  }

  if (!detalhes) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Erro ao carregar os detalhes do evento.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: detalhes.url_imagem || 'https://via.placeholder.com/300' }}
        style={styles.imagemGrande}
      />

      <Text style={styles.eventoNome}>{detalhes.nome}</Text>
      <Text style={styles.eventoLocal}>📍 {detalhes.localizacao}</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Descrição</Text>
        <Text style={styles.eventoDescricao}>{detalhes.descricao}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Mais Informações</Text>
        <Text style={styles.eventoInfo}>🗓 Início: {formatDateTime(detalhes.data_inicio)}</Text>
        <Text style={styles.eventoInfo}>🗓 Fim: {formatDateTime(detalhes.data_fim)}</Text>
        <Text style={styles.eventoInfo}>👥 Capacidade Máxima: {detalhes.capacidade_max}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>📍 Local no Mapa</Text>
        {detalhes.latitude && detalhes.longitude ? (
          <MapView
            style={{ width: '100%', height: 200, borderRadius: 10 }}
            initialRegion={{
              latitude: detalhes.latitude,
              longitude: detalhes.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: detalhes.latitude,
                longitude: detalhes.longitude,
              }}
              title={detalhes.nome}
              description={detalhes.localizacao}
            />
          </MapView>
        ) : (
          <Text>Localização não disponível.</Text>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>💬 Comentários</Text>
        {comentarios.length === 0 ? (
          <Text style={styles.commentText}>Nenhum comentário ainda.</Text>
        ) : (
          comentarios.map((coment) => (
            <View key={coment.id} style={{ marginBottom: 6 }}>
              <Text style={styles.commentText}>• {coment.comentario}</Text>
              <Text style={{ fontSize: 12, color: '#666' }}>
                {formatDateTime(coment.created_at)} — {coment.utilizadores?.nome || 'Anónimo'}
              </Text>
            </View>
          ))
        )}

        <TextInput
          style={styles.commentInput}
          placeholder="Escreve um comentário"
          value={novoComentario}
          onChangeText={setNovoComentario}
          onSubmitEditing={handleAdicionarComentario}
          returnKeyType="done"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}