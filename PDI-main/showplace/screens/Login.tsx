import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { styles } from '../style/global.style';
import supabase from '../supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Register: undefined; // Adiciona a rota de registro
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha o e-mail e a senha');
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert('Erro ao iniciar sessão', 'E-mail ou senha incorretos!');
    } else if (data.user) {
      await AsyncStorage.setItem('idutilizador', data.user.id);  // Guarda o id do utilizador localmente
      navigation.navigate('Home');
    } else {
      Alert.alert('Erro ao iniciar sessão', 'E-mail ou senha incorretos!');
    }
  };

  return (
    <View style={styles.loginContainer}>
      <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg' }} style={styles.logo} />
      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.subtitle}>Entre na sua conta para continuar.</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#666"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Palavra-passe"
        placeholderTextColor="#666"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sessão</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.link}>Esqueceu a sua senha?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Criar conta</Text>
      </TouchableOpacity>
    </View>
  );
}
