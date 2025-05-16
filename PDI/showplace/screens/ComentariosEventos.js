import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { styles } from '../style/global.style';
import supabase from '../supabase'; // ajuste o caminho conforme seu projeto

const ComentariosEventosScreen = ({ route }) => {
  const { eventId } = route.params;

  const [comentarios, setComentarios] = useState([]);
  const [novoComentario, setNovoComentario] = useState('');

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
        setComentarios(data.map(comentario => comentario.texto));
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao carregar os comentários.');
      console.error(error);
    }
  };

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
        fetchComentarios();
        setNovoComentario('');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao adicionar o comentário.');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComentarios();
  }, [eventId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comentários do Evento</Text>

      <FlatList
        data={comentarios}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.commentsContainer}>
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
