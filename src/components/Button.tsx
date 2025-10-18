// Button.tsx (Arquivo corrigido)
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type Props = {
  title: string;
  onPress: () => void;
  style?: object;
  // 👈 ADICIONE A PROPRIEDADE 'disabled' AQUI
  disabled?: boolean; 
};

export default function Button({ title, onPress, style, disabled }: Props) {
  // 👈 Use 'disabled' no TouchableOpacity e ajuste a opacidade
  return (
    <TouchableOpacity 
      onPress={onPress} 
      activeOpacity={disabled ? 1 : 0.8} 
      style={[style, disabled && styles.disabledContainer]} // Adiciona um estilo opcional para desabilitado
      disabled={disabled} // Aplica a propriedade disabled
    >
      <LinearGradient
        colors={['#FFD60A', '#FFE85C']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.button, disabled && styles.disabledButton]} // Estilo para indicar que está desabilitado
      >
        <Text style={styles.text}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // 👈 NOVOS ESTILOS PARA O ESTADO DESABILITADO
  disabledContainer: {
    opacity: 0.7, // Diminui a opacidade do container para indicar que está desabilitado
  },
  disabledButton: {
    // Você pode adicionar cores diferentes ou outros ajustes se necessário
  }
});