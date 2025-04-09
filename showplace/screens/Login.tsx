import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { styles } from '../style/global.style';
import supabase from '../supabase';  // Certifique-se de que o supabaseClient está corretamente importado

type RootStackParamList = { Login: undefined; Home: undefined; };
type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = { navigation: LoginScreenNavigationProp; };

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha o e-mail e a senha');
      return;
    }

    // Tente fazer o login com as credenciais fornecidas
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // Verifique se houve um erro durante o login
    if (error) {
      Alert.alert('Erro ao entrar', 'E-mail ou senha incorretos');
    } else if (data.user) {
      Alert.alert('Sucesso', 'Login efetuado com sucesso!');
      navigation.navigate('Home');  // Redireciona para a tela principal após login bem-sucedido
    } else {
      // Se o login não foi bem-sucedido e não há um usuário, exiba uma mensagem genérica
      Alert.alert('Erro ao entrar', 'E-mail ou senha incorretos');
    }
  };

  return (
    <View style={styles.loginContainer}>
      <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg' }} style={styles.logo} />
      <Text style={styles.title}>Bem-vindo de volta!</Text>
      <Text style={styles.subtitle}>Entre na sua conta para continuar</Text>

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
        placeholder="Senha"
        placeholderTextColor="#666"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.link}>Esqueceu sua senha?</Text>
      </TouchableOpacity>
    </View>
  );
}
