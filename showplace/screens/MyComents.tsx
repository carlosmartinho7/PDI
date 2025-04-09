import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { styles } from '../style/global.style';

type RootStackParamList = { MeusComentarios: undefined; };
type MeusComentariosScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MeusComentarios'>;
type Props = { navigation: MeusComentariosScreenNavigationProp; };

const meusComentarios = [
  { id: '1', evento: 'Feira de Gastronomia', texto: 'Comida deliciosa, recomendo!' },
];

export default function MeusComentariosScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>💬 Meus Comentários</Text>
      <FlatList
        data={meusComentarios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.eventoInfo}>
            <Text style={styles.eventoNome}>{item.evento}</Text>
            <Text>{item.texto}</Text>
          </View>
        )}
      />
    </View>
  );
}
