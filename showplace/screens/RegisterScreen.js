import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { styles } from '../style/global.style';
import supabase from "../supabase";

const RegisterScreen = ({ navigation }) => {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.(com|pt|org|net|edu|gov|info|biz)$/i;
    return re.test(email);
  };

  const validateTelefone = (telefone) => {
    const re = /^(2|3|9)[0-9]{8}$/;
    return re.test(telefone);
  };

  const handleRegister = async () => {
    if (!nome || !telefone || !email || !password) {
      Alert.alert("Erro", "Todos os campos são obrigatórios!");
      return;
    }

    if (!validateTelefone(telefone)) {
      Alert.alert("Erro", "Insira um número de telefone português válido (9 dígitos começando com 2, 3 ou 9).");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Erro", "Por favor, insira um email com domínio válido (ex: .com, .pt).");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        Alert.alert("Erro ao criar conta", error.message);
        setLoading(false);
        return;
      }

      if (!data?.user?.id) {
        Alert.alert("Verifique seu email", "Conta criada com sucesso.");
        setLoading(false);
        return;
      }

      const userId = data.user.id;

      const { error: insertError } = await supabase
        .from("utilizadores")
        .insert([
          {
            id: userId,
            nome,
            telefone,
            foto_url: null,
            data_registo: new Date(),
          },
        ]);

      if (insertError) {
        console.log("Erro ao inserir na tabela:", insertError);
        Alert.alert("Erro ao salvar dados do usuário", insertError.message);
        setLoading(false);
        return;
      }

      Alert.alert("Sucesso", "Conta criada com sucesso!");
      setNome("");
      setTelefone("");
      setEmail("");
      setPassword("");
      navigation.navigate("Login");
    } catch (err) {
      console.log("Erro inesperado:", err);
      Alert.alert("Erro inesperado", err.message || err.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.registerContainer}
    >
      <ScrollView contentContainerStyle={styles.registerScrollContainer}>
        <Text style={styles.registerTitle}>Criar Conta</Text>

        <Text style={styles.registerLabel}>Nome</Text>
        <TextInput
          style={styles.registerInput}
          value={nome}
          onChangeText={setNome}
          autoCapitalize="words"
          placeholder="Digite seu nome"
        />

        <Text style={styles.registerLabel}>Telefone</Text>
        <TextInput
          style={styles.registerInput}
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
          placeholder="Digite seu telefone"
        />

        <Text style={styles.registerLabel}>Email</Text>
        <TextInput
          style={styles.registerInput}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="Digite seu email"
        />

        <Text style={styles.registerLabel}>Senha</Text>
        <TextInput
          style={styles.registerInput}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          placeholder="Digite sua senha"
        />

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#007AFF"
            style={{ marginVertical: 20 }}
          />
        ) : (
          <Button title="Criar Conta" onPress={handleRegister} />
        )}

        <View style={styles.registerLoginLinkContainer}>
          <Text>Já tem uma conta?</Text>
          <Text
            style={styles.registerLoginLink}
            onPress={() => navigation.navigate("Login")}
          >
            Faça login
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
