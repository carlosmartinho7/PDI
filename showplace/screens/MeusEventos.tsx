import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Para carregar favoritos
import { styles } from '../style/global.style';
import supabase from '../supabase';

type RootStackParamList = { MeusEventos: undefined };
type MeusEventosScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MeusEventos'>;
type Props = { navigation: MeusEventosScreenNavigationProp };

export default function MeusEventosScreen({ navigation }: Props) {
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [eventosFavoritos, setEventosFavoritos] = useState<any[]>([]);

  // Carregar os favoritos salvos no AsyncStorage
  useEffect(() => {
    const carregarFavoritos = async () => {
      try {
        const favoritosSalvos = await AsyncStorage.getItem('favoritos');
        if (favoritosSalvos) {
          setFavoritos(JSON.parse(favoritosSalvos));
        }
      } catch (error) {
        console.error('Erro ao carregar favoritos:', error);
      }
    };

    carregarFavoritos();
  }, []);

  // Buscar eventos favoritos do banco
  useEffect(() => {
    const fetchEventos = async () => {
      if (favoritos.length === 0) return;

      const { data, error } = await supabase
        .from('eventos')
        .select('*')
        .in('id', favoritos); // Filtra apenas eventos favoritos

      if (error) {
        Alert.alert('Erro', 'Não foi possível carregar seus eventos favoritos.');
        console.error(error);
      } else {
        setEventosFavoritos(data || []);
      }
    };

    fetchEventos();
  }, [favoritos]);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>📅 Meus Eventos Favoritos</Text>

      {eventosFavoritos.length === 0 ? (
        <Text style={styles.emptyMessage}>Você ainda não tem eventos favoritos.</Text>
      ) : (
        <FlatList
          data={eventosFavoritos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.evento}>
              <Image source={{ uri: item.url_imagem || 'https://via.placeholder.com/150' }} style={styles.imagem} />
              <View style={styles.eventoInfo}>
                <Text style={styles.eventoNome}>{item.nome}</Text>
                <Text style={styles.eventoLocal}>📍 {item.local}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}