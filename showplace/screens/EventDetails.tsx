import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../App';  // Importando o tipo de navegação
import { styles } from '../style/global.style';
import supabase from '../supabase';

// Definir a tipagem correta para o parâmetro 'params' que é passado pela navegação
type Props = StackScreenProps<RootStackParamList, 'EventDetails'>;

export default function EventDetailsScreen({ route, navigation }: Props) {
  // Aqui estamos acessando o parâmetro `eventId` que é passado para esta tela
  const { eventId } = route.params;  // Agora o TypeScript sabe que existe um 'eventId' nos parâmetros
  const [detalhes, setDetalhes] = useState<any>(null);  // Armazenando os detalhes do evento
  const [loading, setLoading] = useState<boolean>(true);  // Estado de carregamento

  useEffect(() => {
    fetchDetalhesEvento();
  }, [eventId]);  // Dependência no eventId para carregar os dados toda vez que o ID mudar

  const fetchDetalhesEvento = async () => {
    try {
      const { data, error } = await supabase
        .from('eventos')  // Supondo que você tenha uma tabela chamada 'eventos'
        .select('*')
        .eq('id', eventId)  // Filtrando pelo ID do evento
        .single();  // Apenas um evento, então usamos o .single()

      if (error) {
        Alert.alert('Erro', 'Não foi possível carregar os detalhes do evento.');
        console.error(error);
      } else {
        setDetalhes(data);
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao carregar os detalhes.');
      console.error(error);
    } finally {
      setLoading(false);  // Desliga o carregamento quando termina
    }
  };

  const formatDateTime = (dateTime: string) => {
    const [date, time] = dateTime.split('T');  // Separa a data da hora
    return `${date} ${time.slice(0, 5)}`;  // Exibe a data e a hora sem o "T"
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FF5733" />
        <Text>Carregando detalhes do evento...</Text>
      </View>
    );
  }

  if (!detalhes) {
    return (
      <View style={styles.container}>
        <Text>Erro ao carregar os detalhes do evento.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Exibindo a imagem do evento */}
      <Image source={{ uri: detalhes.url_imagem || 'https://via.placeholder.com/150' }} style={styles.imagemGrande} />

      {/* Exibindo o nome e a localização do evento */}
      <Text style={styles.eventoNome}>{detalhes.nome}</Text>
      <Text style={styles.eventoLocal}>📍 {detalhes.localizacao}</Text> {/* Atualizado para usar "localizacao" */}

      {/* Exibindo a descrição do evento */}
      <Text style={styles.sectionTitle}>Descrição:</Text>
      <Text style={styles.eventoDescricao}>{detalhes.descricao}</Text>

      {/* Exibindo mais detalhes do evento */}
      <Text style={styles.sectionTitle}>Mais Informações</Text>
      <Text style={styles.eventoInfo}>Data Início: {formatDateTime(detalhes.data_inicio)}</Text> {/* Corrigido para remover o "T" */}
      <Text style={styles.eventoInfo}>Data Fim: {formatDateTime(detalhes.data_fim)}</Text> {/* Corrigido para remover o "T" */}
      <Text style={styles.eventoInfo}>Capacidade: {detalhes.capacidade_max}</Text> {/* Verificação para garantir que a capacidade seja exibida corretamente */}

      {/* Botão para voltar para a tela anterior */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
