import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import supabase from '../supabase';
import { styles } from '../style/global.style';

export default function MinhasAvaliacoesScreen({ navigation }) {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    buscarAvaliacoes();
  }, []);

  async function buscarAvaliacoes() {
    setLoading(true);

    // PEGANDO USUÁRIO ATUAL na v1.x do Supabase
    const user = supabase.auth.user();

    if (!user) {
      console.warn('Utilizador não autenticado');
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('avaliacoes')
      .select(`
        id,
        avaliacao,
        eventos (
          id,
          nome
        )
      `)
      .eq('idutilizador', user.id)
      .order('id', { ascending: false });

    if (error) {
      console.error('Erro ao buscar avaliações:', error);
      setLoading(false);
      return;
    }

    if (data) {
      const avaliacoesFormatadas = data.map(item => ({
        id: item.id,
        avaliacao: item.avaliacao,
        eventos: Array.isArray(item.eventos) ? item.eventos[0] : item.eventos,
      }));

      setAvaliacoes(avaliacoesFormatadas);
    }

    setLoading(false);
  }

  const renderAvaliacao = ({ item }) => (
    <View style={styles.eventoInfoAv}>
      <Text style={styles.eventoNomeAv}>{item.eventos?.nome || 'Evento desconhecido'}</Text>
      <Text style={styles.eventoLocalAv}>⭐ {item.avaliacao}</Text>
    </View>
  );

  return (
    <View style={styles.containerAv}>
      <Text style={styles.sectionTitleAv}>⭐ Minhas Avaliações</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FlatList
          data={avaliacoes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderAvaliacao}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', marginTop: 20 }}>
              Não há avaliações para mostrar.
            </Text>
          }
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}
