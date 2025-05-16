import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../App'; // Importe RootStackParamList
import { styles } from '../style/global.style';
import supabase from '../supabase';  // ajuste o caminho conforme seu projeto





// Defina o tipo 'Props' corretamente para a navegação
type Props = StackScreenProps<RootStackParamList, 'ComentariosEventos'>;

const ComentariosEventosScreen: React.FC<Props> = ({ route }) => {
  const { eventId } = route.params; // Pegue o eventId dos parâmetros

  const [comentarios, setComentarios] = useState<string[]>([]);
  const [novoComentario, setNovoComentario] = useState<string>('');

  // Função para carregar os comentários
  const fetchComentarios = async () => {
    try {
      const { data, error } = await supabase
        .from('comentarios')
        .select('texto')
        .eq('evento_id', eventId);

      if (error) {
        Alert.alert('Erro', 'Não foi possível carregar os comentários.');
        console.error(error);
      } else {
        setComentarios(data.map((comentario: any) => comentario.texto));
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao carregar os comentários.');
      console.error(error);
    }
  };

  // Função para adicionar um novo comentário
  const handleAddComment = async () => {
    if (novoComentario.trim() === '') {
      Alert.alert('Erro', 'O comentário não pode ser vazio.');
      return;
    }

    try {
      const { error } = await supabase
        .from('comentarios')
        .insert([{ texto: novoComentario, evento_id: eventId }]);

      if (error) {
        Alert.alert('Erro', 'Não foi possível adicionar o comentário.');
        console.error(error);
      } else {
        fetchComentarios(); // Recarregar os comentários
        setNovoComentario(''); // Limpar o campo de comentário
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao adicionar o comentário.');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComentarios(); // Carregar os comentários assim que a tela for montada
  }, [eventId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comentários do Evento</Text>

      <FlatList
  data={comentarios}
  keyExtractor={(item, index) => index.toString()}
  renderItem={({ item }) => (
    <View style={styles.commentsContainer}> {/* Alterado aqui */}
      <Text style={styles.commentText}>{item}</Text>
    </View>
  )}
/>


      <TextInput
        style={styles.input}
        placeholder="Adicionar um comentário."
        value={novoComentario}
        onChangeText={setNovoComentario}
      />

      <TouchableOpacity style={styles.button} onPress={handleAddComment}>
        <Text style={styles.buttonText}>Adicionar Comentário</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ComentariosEventosScreen;