import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { styles } from '../style/global.style';

// Tipagem para navegação
type RootStackParamList = { 
  Login: undefined; 
  Home: undefined; 
  UserProfile: undefined; 
  MeusEventos: undefined;
  MinhasAvaliacoes: undefined;
  MeusComentarios: undefined;
};

type UserProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'UserProfile'>;
type Props = { navigation: UserProfileScreenNavigationProp; };

export default function UserProfileScreen({ navigation }: Props) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      
      {/* Cabeçalho do Perfil */}
      <View style={styles.profileHeader}>
        <Image 
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg' }} 
          style={styles.profileImage} 
        />
        <Text style={styles.profileName}>Nome do Utilizador</Text>

        {/* Botão pequeno para abrir as opções da conta */}
        <TouchableOpacity style={styles.optionSmallButton} onPress={() => setModalVisible(prev => !prev)}> 
          <Text style={styles.optionSmallText}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Opções de Atividade do Usuário */}
      <View style={styles.profileOptions}>
        <TouchableOpacity style={styles.profileOption} onPress={() => navigation.navigate('MeusEventos')}>
          <Text style={styles.profileOptionText}>📅 Meus Eventos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.profileOption} onPress={() => navigation.navigate('MinhasAvaliacoes')}>
          <Text style={styles.profileOptionText}>⭐ Minhas Avaliações</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.profileOption} onPress={() => navigation.navigate('MeusComentarios')}>
          <Text style={styles.profileOptionText}>💬 Meus Comentários</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de Configurações da Conta */}
      {modalVisible && (
        <View style={styles.sidePanel}>
          <View style={styles.sidePanel}>

            <Text style={styles.modalTitle}>Definições</Text>

            <TouchableOpacity style={styles.modalOption} onPress={() => alert('Alterar Senha')}>
              <Text style={styles.modalOptionText}>🔑 Alterar Palavra-Passe</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalOption} onPress={() => alert('Alterar E-mail')}>
              <Text style={styles.modalOptionText}>📧 Alterar E-mail</Text>
            </TouchableOpacity>

            {/* Botão de Logout */}
            <TouchableOpacity style={styles.modalOption} onPress={() => {
              setModalVisible(false);
              navigation.navigate('Login');
            }}>
              <Text style={styles.modalOptionText}>🚪 Terminar sessão </Text>
            </TouchableOpacity>

          </View>
        </View>
      )}
    </View>
  );
}