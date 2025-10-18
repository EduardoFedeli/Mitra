// screens/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'; // 👈 Adicionada SafeAreaView
import Button from '../components/Button';
import { useAuth } from '../contexts/AuthContext'; 

export default function HomeScreen({ navigation }: any) {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    // Usa SafeAreaView para um melhor espaçamento no topo/fundo de celulares modernos
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Bem-vindo ao Mitra</Text>
          <Text style={styles.subtitle}>Gerencie seus investimentos com facilidade</Text>
        </View>

        {/* Grupo de Botões Centralizado */}
        <View style={styles.buttonGroup}>
          <Button
            title="Ver Meus Investimentos"
            onPress={() => navigation.navigate('Investment')}
            style={styles.actionButton}
          />
          
          <Button
            title="Sair (Logout)"
            onPress={handleLogout}
            style={styles.logoutButton} // Botão de Logout separado
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between', // Distribui espaço entre o header e os botões
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 50, // Afasta o título do topo
    marginBottom: 50,
  },
  title: {
    fontSize: 32, // Um pouco maior
    fontWeight: 'bold',
    color: '#FFD60A',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18, // Um pouco maior
    color: '#444',
    textAlign: 'center',
  },
  buttonGroup: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 50, // Afasta os botões da parte inferior
  },
  actionButton: { 
    width: '80%',
  },
  logoutButton: {
    width: '80%',
    marginTop: 20,
    // Você pode querer um estilo diferente aqui (ex: cor diferente)
  }
});