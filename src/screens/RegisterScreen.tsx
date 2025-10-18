// screens/RegisterScreen.tsx
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/Button"; // 👈 Importação do componente Button

export default function RegisterScreen({ navigation }: any) {
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await signUp(email, password);
      // A navegação para 'Home' acontecerá automaticamente via AppNavigator e useAuth
      // Não é necessário navigation.navigate("Login") aqui, pois o AppNavigator cuida
      // da navegação condicional após o estado de autenticação mudar.
      Alert.alert("Sucesso", "Conta criada com sucesso!");
    } catch (error: any) {
      Alert.alert("Erro ao cadastrar", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#fff9"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#fff9"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* 👈 Uso do componente Button corrigido */}
      <Button
        title="Cadastrar"
        onPress={handleRegister}
        style={styles.registerButton}
      />

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Já tenho conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b4b1a2ff",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
  },
  input: {
    width: "80%",
    padding: 14,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 10,
    marginBottom: 15,
    color: "#fff",
  },
  // Estilo para o Button (apenas para largura/margem)
  registerButton: {
    width: "80%",
    marginTop: 15,
  },
  link: {
    color: "#fff",
    marginTop: 20,
  },
});