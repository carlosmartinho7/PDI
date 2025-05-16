// screens/MyComments.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import supabase from '../supabase'; // assume já tens configurado

import { RootStackParamList } from '../index';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'MyComments'>;

type Comentario = {
  id: number;
  comentario: string;
  created_at: string;
  eventos: {
    id: number;
    nome: string;
  };
};

export default function MyComments() {
  const navigation = useNavigation<NavigationProp>();
  const [comentarios, setComentarios] = useState<Comentario[]>([]);

  useEffect(() => {
    fetchComentarios();
  }, []);

  async function fetchComentarios() {
    const { data, error } = await supabase
      .from('comentario')
      .select(`
        id,
        comentario,
        created_at,
        eventos (id, nome)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar eventos:', error);
    } else if (data) {
      // Supabase retorna o campo 'eventos' como array? Ajusta conforme o teu esquema real
      const formatted = data.map((item: any) => ({
        id: item.id,
        comentario: item.comentario,
        created_at: item.created_at,
        eventos: Array.isArray(item.eventos) ? item.eventos[0] : item.eventos,
      }));
      setComentarios(formatted);
    }
  }

  function renderItem({ item }: { item: Comentario }) {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('EventDetails', { idevento: item.eventos.id })}
      >
        <Text style={styles.eventName}>{item.eventos.nome}</Text>
        <Text>{item.comentario}</Text>
        <Text style={styles.date}>{new Date(item.created_at).toLocaleString()}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💬 Meus Comentários</Text>
      <FlatList
        data={comentarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#ADD8E6'},
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  item: {
    backgroundColor: '#eee',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
  eventName: { fontWeight: 'bold', fontSize: 16 },
  date: { fontSize: 16, color: '#555', marginTop: 4 },
});
