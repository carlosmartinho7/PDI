import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, Image, ScrollView, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { styles } from '../style/global.style';
import supabase from '../supabase';  

type RootStackParamList = { 
  Login: undefined; 
  Home: undefined; 
  EventDetails: { eventId: string }; // Parâmetro para a tela de detalhes do evento
  UserProfile: undefined; 
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type Props = { navigation: HomeScreenNavigationProp; };

export default function HomeScreen({ navigation }: Props) {
  const [pesquisa, setPesquisa] = useState<string>('');
  const [eventos, setEventos] = useState<any[]>([]);
  const [avaliacoes, setAvaliacoes] = useState<{ [key: string]: number }>({});
  const [comentarios, setComentarios] = useState<{ [key: string]: string[] }>({});
  const [favoritos, setFavoritos] = useState<{ [key: string]: boolean }>({});
  const commentInputRefs = useRef<{ [key: string]: TextInput | null }>({});

  const categorias = [
    { nome: 'Música', imagem: 'https://cdn-icons-png.flaticon.com/512/3063/3063491.png' },
    { nome: 'Gastronomia', imagem: 'https://cdn-icons-png.flaticon.com/512/1903/1903162.png' },
    { nome: 'Desporto', imagem: 'https://cdn-icons-png.flaticon.com/512/1040/1040241.png' },
    { nome: 'Festas', imagem: 'https://cdn-icons-png.flaticon.com/512/2534/2534176.png' },
    { nome: 'Cultura', imagem: 'https://cdn-icons-png.flaticon.com/512/867/867971.png' },
  ];

  const fetchEventos = async () => {
    const { data, error } = await supabase.from('eventos').select('*');
    if (error) {
      Alert.alert('Erro', 'Não foi possível carregar os eventos');
      console.error(error);
    } else {
      setEventos(data);
    }
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  const renderStars = (rating: number, id: string) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <TouchableOpacity key={i} onPress={() => handleAvaliar(id, i + 1)}>
        <Text style={[styles.star, i < rating ? { color: '#FF5733' } : { color: '#ddd' }]}>{i < rating ? '★' : '☆'}</Text>
      </TouchableOpacity>
    ));
  };

  const handleAvaliar = (id: string, rating: number) => {
    setAvaliacoes((prev) => ({ ...prev, [id]: rating }));
  };

  const handleAddComment = (id: string, comment: string) => {
    setComentarios((prev) => ({
      ...prev,
      [id]: [...(prev[id] || []), comment],
    }));
  };

  const toggleFavorito = (id: string) => {
    setFavoritos((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Image source={require('../assets/logo sem fundo.png')} style={styles.navbarLogo} />
        <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
          <Image 
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg' }} 
            style={styles.userIcon} 
          />
        </TouchableOpacity>
      </View>

      <TextInput 
        style={styles.input} 
        placeholder="🔍 Buscar eventos..." 
        placeholderTextColor="#888" 
        value={pesquisa} 
        onChangeText={(text: string) => setPesquisa(text)}
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
        {categorias.map((categoria, index) => (
          <TouchableOpacity key={index} style={styles.categoryButton}>
            <Image source={{ uri: categoria.imagem }} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{categoria.nome}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={eventos.filter(evento => evento.nome.toLowerCase().includes(pesquisa.toLowerCase()))}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const SUPABASE_STORAGE_URL = "https://gcupjyukfhhebbxfcuiv.supabase.co/storage/v1/object/public/eventos-imagens/";

          const imageUrl = item.url_imagem
            ? (item.url_imagem.startsWith("http") ? item.url_imagem : `${SUPABASE_STORAGE_URL}${item.url_imagem}`)
            : "https://via.placeholder.com/150";

          return (
            <TouchableOpacity onPress={() => navigation.navigate('EventDetails', { eventId: item.id })}> {/* Navega para a tela de detalhes */}
              <View style={styles.evento}>
                <Image 
                  source={{ uri: imageUrl }} 
                  style={styles.imagem} 
                  onError={(e) => console.log("Erro ao carregar imagem:", e.nativeEvent.error)}
                />
                <View style={styles.eventoInfo}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={styles.eventoNome}>{item.nome}</Text>

                    <TouchableOpacity onPress={() => toggleFavorito(item.id)}>
                      <Text style={{ fontSize: 24, color: favoritos[item.id] ? '#FF5733' : '#ddd' }}>
                        {favoritos[item.id] ? '❤️' : '🤍'}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.eventoLocal}>📍 {item.local}</Text>

                  <View style={styles.rating}>
                    {renderStars(avaliacoes[item.id] || 0, item.id)}
                  </View>

                  <View style={styles.commentsContainer}>
                    <Text style={styles.sectionTitle}>Comentários:</Text>
                    {comentarios[item.id]?.map((comment, index) => (
                      <Text key={index} style={styles.commentText}>{comment}</Text>
                    ))}
                  </View>

                  <TextInput
                    style={styles.commentInput}
                    placeholder="Adicionar comentário..."
                    ref={(ref) => (commentInputRefs.current[item.id] = ref)} // Guarda a ref do campo de comentário por ID
                    onSubmitEditing={(e) => {
                      const comment = e.nativeEvent.text;
                      if (comment.trim()) {
                        handleAddComment(item.id, comment);
                        commentInputRefs.current[item.id]?.clear(); // Limpa o campo após adicionar o comentário
                      }
                    }}
                  />
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}
