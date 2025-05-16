import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { supabase } from "../supabaseClient";

const RegisterScreen = ({ navigation }) => {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleRegister = async () => {
    if (!nome || !telefone || !email || !password) {
      Alert.alert("Erro", "Todos os campos são obrigatórios!");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Erro", "Por favor, insira um email válido.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);

    // Criar utilizador no Supabase Auth
    const { data: user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setLoading(false);
      Alert.alert("Erro ao criar conta", error.message);
      return;
    }

    // Inserir dados adicionais na tabela utilizadores
    const { error: insertError } = await supabase
      .from("utilizadores")
      .insert([{ id: user.user.id, nome, telefone, data_registo: new Date() }]);

    setLoading(false);

    if (insertError) {
      Alert.alert("Erro", insertError.message);
    } else {
      Alert.alert("Sucesso", "Conta criada com sucesso!");
      // Limpar campos
      setNome("");
      setTelefone("");
      setEmail("");
      setPassword("");
      navigation.navigate("Login");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Criar Conta</Text>

        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          autoCapitalize="words"
          placeholder="Digite seu nome"
        />

        <Text style={styles.label}>Telefone</Text>
        <TextInput
          style={styles.input}
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
          placeholder="Digite seu telefone"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="Digite seu email"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          placeholder="Digite sua senha"
        />

        {loading ? (
          <ActivityIndicator size="large" color="#007AFF" style={{ marginVertical: 20 }} />
        ) : (
          <Button title="Criar Conta" onPress={handleRegister} />
        )}

        <View style={styles.loginLinkContainer}>
          <Text>Já tem uma conta?</Text>
          <Text
            style={styles.loginLink}
            onPress={() => navigation.navigate("Login")}
          >
            Faça login
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContainer: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 30, textAlign: "center" },
  label: { fontWeight: "600", marginBottom: 5, marginTop: 15 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
  },
  loginLinkContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  loginLink: {
    marginLeft: 5,
    color: "#007AFF",
    fontWeight: "600",
  },
});

export default RegisterScreen;
