import React, { useEffect, useState, useCallback } from 'react';
import { 
  View, Text, TextInput, FlatList, StyleSheet, Alert, ActivityIndicator, 
  Modal, TouchableOpacity, SafeAreaView 
} from 'react-native';
import { api } from '../services/api';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Button from '../components/Button';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Investment'>;

type Investment = {
  id: number;
  name: string;
  value: number;
};

type FormModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onSave: (data: { id?: number; name: string; value: number }) => Promise<void>;
  editingInvestment: Investment | null;
  isLoading: boolean;
};

const InvestmentFormModal: React.FC<FormModalProps> = ({
  isVisible, onClose, onSave, editingInvestment, isLoading
}) => {
  const [name, setName] = useState(editingInvestment?.name || '');
  const [value, setValue] = useState(String(editingInvestment?.value || ''));

  useEffect(() => {
    setName(editingInvestment?.name || '');
    setValue(String(editingInvestment?.value || ''));
  }, [editingInvestment]);

  const handleSave = async () => {
    if (!name || !value) {
      Alert.alert('Atenção', 'Preencha o nome e o valor do investimento.');
      return;
    }
    const data = { id: editingInvestment?.id, name, value: parseFloat(value.replace(',', '.')) };
    await onSave(data);
    onClose();
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={modalStyles.centeredView}>
        <View style={modalStyles.modalView}>
          <Text style={modalStyles.title}>{editingInvestment ? 'Editar Investimento' : 'Adicionar Investimento'}</Text>
          <TextInput
            placeholder="Nome do Investimento"
            style={modalStyles.input}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder="Valor (ex: 123.45)"
            style={modalStyles.input}
            keyboardType="numeric"
            value={value}
            onChangeText={setValue}
          />
          <View style={modalStyles.buttonContainer}>
            <Button title="Cancelar" onPress={onClose} style={modalStyles.cancelButton} />
            <Button title={isLoading ? 'Salvando...' : 'Salvar'} onPress={handleSave} style={modalStyles.saveButton} disabled={isLoading} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default function InvestmentScreen({ navigation }: Props) {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingInvestment, setEditingInvestment] = useState<Investment | null>(null);

  const loadInvestments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/investments');
      setInvestments(res.data);
    } catch (err: any) {
      setError('Falha ao carregar investimentos. Erro: ' + (err.message || 'Desconhecido'));
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSaveInvestment = async (data: { id?: number; name: string; value: number }) => {
    setSaving(true);
    try {
      if (data.id) await api.put(`/investments/${data.id}`, { name: data.name, value: data.value });
      else await api.post('/investments', { name: data.name, value: data.value });
      loadInvestments();
    } catch (err: any) {
      Alert.alert('Erro ao salvar', 'Não foi possível salvar o investimento. Erro: ' + (err.message || 'Desconhecido'));
    } finally {
      setSaving(false);
      setEditingInvestment(null);
    }
  };

  const handleDeleteInvestment = async (id: number) => {
    Alert.alert('Confirmar Exclusão', 'Tem certeza que deseja excluir este investimento?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', onPress: async () => {
        try { await api.delete(`/investments/${id}`); loadInvestments(); }
        catch (err: any) { Alert.alert('Erro ao excluir', 'Não foi possível excluir. Erro: ' + (err.message || 'Desconhecido')); }
      }}
    ]);
  };

  const openCreateModal = () => { setEditingInvestment(null); setIsModalVisible(true); };
  const openEditModal = (investment: Investment) => { setEditingInvestment(investment); setIsModalVisible(true); };

  useEffect(() => { loadInvestments(); }, [loadInvestments]);

  if (loading && investments.length === 0) return (
    <View style={[styles.container, styles.centerContent]}>
      <ActivityIndicator size="large" color="#FFD60A" />
      <Text style={{ marginTop: 10 }}>Carregando dados...</Text>
    </View>
  );

  if (error) return (
    <View style={[styles.container, styles.centerContent]}>
      <Text style={styles.errorText}>Ops! Ocorreu um erro:</Text>
      <Text style={styles.errorTextDetail}>{error}</Text>
      <Button title="Tentar Novamente" onPress={loadInvestments} style={{ marginTop: 20 }} />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'< Voltar'}</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>Seus Investimentos</Text>
        </View>

        {investments.length === 0 ? (
          <View style={styles.centerContent}>
            <Text style={styles.emptyText}>Você ainda não possui investimentos cadastrados.</Text>
          </View>
        ) : (
          <FlatList
            data={investments}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <View>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemValue}>R$ {item.value.toFixed(2).replace('.', ',')}</Text>
                </View>
                <View style={styles.actions}>
                  <TouchableOpacity onPress={() => openEditModal(item)} style={styles.actionButton}>
                    <Text style={styles.actionTextEdit}>Editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDeleteInvestment(item.id)} style={styles.actionButton}>
                    <Text style={styles.actionTextDelete}>Excluir</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            contentContainerStyle={styles.flatListContent}
          />
        )}

        {/* Botões de ação */}
        <View style={{ marginTop: 20 }}>
          <Button title="Novo Investimento" onPress={openCreateModal} style={styles.bottomButton} />
          <Button 
            title="Voltar para Home" 
            onPress={() => navigation.navigate('Home')} 
            style={[styles.bottomButton, { backgroundColor: '#007AFF', marginTop: 10 }]} 
          />
        </View>

        <InvestmentFormModal
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onSave={handleSaveInvestment}
          editingInvestment={editingInvestment}
          isLoading={saving}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f9f9f9' },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 10, backgroundColor: '#f9f9f9' },
  backButton: { alignSelf: 'flex-start', paddingBottom: 10 },
  backButtonText: { fontSize: 16, color: '#444', fontWeight: 'bold' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  flatListContent: { paddingBottom: 20 },
  item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10, borderLeftWidth: 5, borderLeftColor: '#FFD60A', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 3, elevation: 2 },
  itemName: { fontSize: 16, fontWeight: '600' },
  itemValue: { fontSize: 14, color: '#444' },
  actions: { flexDirection: 'row' },
  actionButton: { marginLeft: 15 },
  actionTextEdit: { color: '#007AFF', fontWeight: '500' },
  actionTextDelete: { color: '#FF3B30', fontWeight: '500' },
  centerContent: { justifyContent: 'center', alignItems: 'center', flex: 1 },
  errorText: { color: '#FF3B30', fontSize: 18, marginBottom: 10, fontWeight: 'bold' },
  errorTextDetail: { color: '#444', fontSize: 14, textAlign: 'center' },
  emptyText: { color: '#666', fontSize: 16, textAlign: 'center', marginTop: 50 },
  bottomButton: { marginTop: 0, marginBottom: 10, width: '100%' },
});

const modalStyles = StyleSheet.create({
  centeredView: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalView: { margin: 20, backgroundColor: 'white', borderRadius: 15, padding: 35, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5, width: '90%' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, width: '100%', marginBottom: 15, borderRadius: 8 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 10 },
  cancelButton: { width: '48%' },
  saveButton: { width: '48%' },
});
