import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { styles } from '../style/global.style';

type RootStackParamList = { MinhasAvaliacoes: undefined; };
type MinhasAvaliacoesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MinhasAvaliacoes'>;
type Props = { navigation: MinhasAvaliacoesScreenNavigationProp; };

const minhasAvaliacoes = [
  { id: '1', evento: 'Festival de Música', nota: '⭐⭐⭐⭐⭐', comentario: 'Evento incrível!' },
];

export default function MinhasAvaliacoesScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>⭐ Minhas Avaliações</Text>
      <FlatList
        data={minhasAvaliacoes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.eventoInfo}>
            <Text style={styles.eventoNome}>{item.evento}</Text>
            <Text style={styles.eventoLocal}>{item.nota}</Text>
            <Text>{item.comentario}</Text>
          </View>
        )}
      />
    </View>
  );
}
