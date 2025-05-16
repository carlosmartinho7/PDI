import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { styles } from '../style/global.style';
import supabase from '../supabase';

type RootStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
};

type ForgotPasswordScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ForgotPassword'>;

type Props = {
  navigation: ForgotPasswordScreenNavigationProp;
};

export default function ForgotPasswordScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Erro', 'Por favor, insira o seu e-mail.');
      return;
    }

    const { error } = await supabase.auth.api.resetPasswordForEmail(email);

    if (error) {
      Alert.alert('Erro', 'Não foi possível enviar o e-mail de recuperação.');
      console.error('Erro reset password:', error.message);
    } else {
      Alert.alert('Sucesso', 'Verifique seu e-mail para redefinir a senha.');
      navigation.navigate('Login');
    }
  };

  return (
    <View style={styles.loginContainer}>
      <Image
        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg' }}
        style={styles.logo}
      />
      <Text style={styles.title}>Recuperar Senha</Text>
      <Text style={styles.subtitle}>Insira o seu e-mail para receber o link de recuperação.</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#666"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Enviar Link</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Voltar para login</Text>
      </TouchableOpacity>
    </View>
  );
}
