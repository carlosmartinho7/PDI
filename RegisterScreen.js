import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { supabase } from "../supabaseClient";

const RegisterScreen = ({ navigation }) => {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!nome || !telefone || !email || !password) {
      Alert.alert("Erro", "Todos os campos são obrigatórios!");
      return;
    }

    // Criar utilizador no Supabase Auth
    const { data: user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      Alert.alert("Erro ao criar conta", error.message);
      return;
    }

    // Inserir dados adicionais na tabela utilizadores
    const { error: insertError } = await supabase
      .from("utilizadores")
      .insert([{ id: user.id, nome, telefone, data_registo: new Date() }]);

    if (insertError) {
      Alert.alert("Erro", insertError.message);
    } else {
      Alert.alert("Sucesso", "Conta criada com sucesso!");
      navigation.navigate("Login");
    }
  };

  return (
    <View>
      <Text>Nome</Text>
      <TextInput value={nome} onChangeText={setNome} />
      <Text>Telefone</Text>
      <TextInput value={telefone} onChangeText={setTelefone} keyboardType="phone-pad" />
      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} keyboardType="email-address" />
      <Text>Password</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Criar Conta" onPress={handleRegister} />
      <Button title="Já tem conta? Faça login" onPress={() => navigation.navigate("Login")} />
    </View>
  );
};

export default RegisterScreen;