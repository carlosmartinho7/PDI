import React, { useEffect, useState } from 'react';
import { View, Text, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import supabase from '../supabase';
import { styles } from '../style/global.style';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configuração do calendário em português
LocaleConfig.locales['pt'] = {
  monthNames: [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
  ],
  monthNamesShort: [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',
  ],
  dayNames: [
    'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira',
    'Quinta-feira', 'Sexta-feira', 'Sábado'
  ],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt';

export default function FavoritosCalendario({ navigation }) {
  const [marcados, setMarcados] = useState({});

  // Função para marcar um intervalo como "período"
  const marcarComoPeriodo = (dataInicio, dataFim) => {
    const marks = {};
    const dateOnly = (str) => str.split('T')[0];
    const format = (d) => d.toISOString().split('T')[0];

    let current = new Date(dateOnly(dataInicio));
    const end = new Date(dateOnly(dataFim));

    while (current <= end) {
      const dateStr = format(current);

      if (dateStr === dateOnly(dataInicio) && dateStr === dateOnly(dataFim)) {
        // Evento de 1 dia
        marks[dateStr] = {
          startingDay: true,
          endingDay: true,
          color: '#FF5733',
          textColor: '#fff',
        };
      } else if (dateStr === dateOnly(dataInicio)) {
        marks[dateStr] = {
          startingDay: true,
          color: '#FF5733',
          textColor: '#fff',
        };
      } else if (dateStr === dateOnly(dataFim)) {
        marks[dateStr] = {
          endingDay: true,
          color: '#FF5733',
          textColor: '#fff',
        };
      } else {
        marks[dateStr] = {
          color: '#FF5733',
          textColor: '#fff',
        };
      }

      current.setDate(current.getDate() + 1);
    }

    return marks;
  };

  const carregarEventosFavoritos = async () => {
    try {
      const favoritosSalvos = await AsyncStorage.getItem('favoritos');
      const favoritosArray = favoritosSalvos ? JSON.parse(favoritosSalvos) : [];

      if (favoritosArray.length === 0) {
        setMarcados({});
        return;
      }

      const { data, error } = await supabase
        .from('eventos')
        .select('id, nome, data_inicio, data_fim')
        .in('id', favoritosArray);

      if (error) {
        Alert.alert('Erro', 'Erro ao carregar eventos favoritos');
        console.error(error);
        return;
      }

      let allMarks = {};

      (data || []).forEach(evento => {
        if (evento.data_inicio) {
          const dataFim = evento.data_fim || evento.data_inicio;
          const intervalo = marcarComoPeriodo(evento.data_inicio, dataFim);
          allMarks = { ...allMarks, ...intervalo };
        }
      });

      setMarcados(allMarks);
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

  const onDayPress = (day) => {
    Alert.alert('Dia selecionado', day.dateString);
  };

  return (
    <View style={styles.container}>
      <Calendar
        style={{ marginTop: 40 }}
        markingType="period"
        markedDates={marcados}
        onDayPress={onDayPress}
        theme={{
          todayTextColor: '#FF5733',
          arrowColor: '#FF5733',
          monthTextColor: '#FF5733',
        }}
      />
      {Object.keys(marcados).length === 0 && (
        <Text style={styles.noFavoritesText}>
          Você ainda não marcou eventos favoritos.
        </Text>
      )}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

