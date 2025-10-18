// screens/LoginScreen.tsx
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/Button"; // 👈 Importação do componente Button

export default function LoginScreen({ navigation }: any) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signIn(email, password);
      // A navegação para 'Home' acontecerá automaticamente via AppNavigator e useAuth
    } catch (error: any) {
      // Exibe a mensagem de erro do Firebase
      Alert.alert("Erro ao entrar", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MITRA</Text>

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
        title="Entrar"
        onPress={handleLogin}
        style={styles.loginButton} 
      />

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.link}>Criar conta</Text>
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
    fontSize: 38,
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
  loginButton: {
    width: "80%",
    marginTop: 15,
  },
  link: {
    color: "#fff",
    marginTop: 20,
  },
});