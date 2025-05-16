import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { styles } from '../style/global.style';
import supabase from '../supabase';

type RootStackParamList = {
  EventDetails: { eventId: string };
  MeusEventos: undefined;
};

type MeusEventosScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MeusEventos'>;
type Props = { navigation: MeusEventosScreenNavigationProp };

export default function MeusEventosScreen({ navigation }: Props) {
  const [eventosFavoritos, setEventosFavoritos] = useState<any[]>([]);

  const carregarEventosFavoritos = async () => {
    try {
      const favoritosSalvos = await AsyncStorage.getItem('favoritos');
      const favoritosArray: string[] = favoritosSalvos ? JSON.parse(favoritosSalvos) : [];

      if (favoritosArray.length === 0) {
        setEventosFavoritos([]);
        return;
      }

      const { data, error } = await supabase
        .from('eventos')
        .select('*')
        .in('id', favoritosArray);

      if (error) {
        Alert.alert('Erro', 'Erro ao carregar eventos favoritos');
        console.error(error);
      } else {
        setEventosFavoritos(data || []);
        console.log('Eventos favoritos carregados:', data);
      }
    } catch (err) {
      console.error('Erro ao carregar favoritos:', err);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      carregarEventosFavoritos();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>📅 Meus Eventos</Text>

      {eventosFavoritos.length === 0 ? (
        <Text style={styles.emptyMessage}>
          Ainda não adicionou nenhum evento aos favoritos.
        </Text>
      ) : (
        <FlatList
          data={eventosFavoritos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const SUPABASE_STORAGE_URL =
              'https://gcupjyukfhhebbxfcuiv.supabase.co/storage/v1/object/public/eventos-imagens/';
            const imageUrl = item.url_imagem?.startsWith('http')
              ? item.url_imagem
              : `${SUPABASE_STORAGE_URL}${item.url_imagem}`;

            return (
              <TouchableOpacity
                style={styles.evento}
                onPress={() => navigation.navigate('EventDetails', { eventId: item.id })}
              >
                <Image
                  source={{ uri: imageUrl || 'https://via.placeholder.com/150' }}
                  style={styles.imagem}
                />
                <View style={styles.eventoInfo}>
                  <Text style={styles.eventoNome}>{item.nome}</Text>
                  <Text style={styles.eventoLocal}>📍 {item.local}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
}