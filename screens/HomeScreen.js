import React, { useEffect, useState } from 'react';
import { View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  Modal, 
  ScrollView, 
  Alert 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card, Title, Paragraph, FAB, Button } from 'react-native-paper';

export default function HomeScreen({ navigation }) {
  const [fichas, setFichas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [fichaSelecionada, setFichaSelecionada] = useState(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      carregarFichas();
    });
    return unsubscribe;
  }, [navigation]);

  const carregarFichas = async () => {
    try {
      const fichasSalvas = await AsyncStorage.getItem('@fichas');
      if (fichasSalvas !== null) {
        setFichas(JSON.parse(fichasSalvas));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const abrirModal = (ficha) => {
    setFichaSelecionada(ficha);
    setModalVisible(true);
  };

  const fecharModal = () => {
    setModalVisible(false);
    setFichaSelecionada(null);
  };

  const handleDeleteFicha = () => {
    Alert.alert(
      "Excluir Ficha",
      "Tem certeza de que deseja excluir esta ficha?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        { 
          text: "Excluir", 
          style: "destructive",
          onPress: async () => {
            try {
              // Filtrar a ficha a ser excluída
              const fichasAtualizadas = fichas.filter(f => f !== fichaSelecionada);
              setFichas(fichasAtualizadas);
              await AsyncStorage.setItem('@fichas', JSON.stringify(fichasAtualizadas));
              fecharModal();
            } catch (error) {
              console.error(error);
              Alert.alert("Erro", "Não foi possível excluir a ficha.");
            }
          } 
        }
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card} onPress={() => abrirModal(item)}>
      <Card.Content>
        <Title style={styles.cardTitle}>{item.nome}</Title>
        {/* Lista de exercícios */}
        {item.exercicios.map((exercicio, index) => (
          <Paragraph key={index} style={styles.exercicioNome}>{exercicio.nomeExercicio}</Paragraph>
        ))}
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={fichas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma ficha criada.</Text>}
        contentContainerStyle={fichas.length === 0 && styles.emptyContainer}
      />

      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() => navigation.navigate('NewFicha')}
      />

      {/* Modal para exibir detalhes da ficha */}
      {fichaSelecionada && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={fecharModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <ScrollView>
                <Title style={styles.modalTitle}>{fichaSelecionada.nome}</Title>
                <Text style={styles.sectionHeader}>Exercícios:</Text>
                {fichaSelecionada.exercicios.map((exercicio, index) => (
                  <Card key={index} style={styles.exercicioCard}>
                    <Card.Content>
                      <Paragraph style={styles.exercicioNome}>{exercicio.nomeExercicio}</Paragraph>
                      <Paragraph style={styles.exercicioDetalhes}>
                        {exercicio.series} séries de {exercicio.repeticoes} repetições
                      </Paragraph>
                    </Card.Content>
                  </Card>
                ))}
              </ScrollView>
              <View style={styles.modalButtons}>
                <Button mode="contained" onPress={fecharModal} style={styles.fecharButton}>
                  Fechar
                </Button>
                <Button mode="contained" onPress={handleDeleteFicha} style={styles.excluirButton} color="#FF3B30">
                  Excluir Ficha
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f4f7',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
  },
  card: {
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 }, // Sombra para iOS
    shadowOpacity: 0.1, // Sombra para iOS
    shadowRadius: 5, // Sombra para iOS
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  exercicioNome: {
    fontSize: 16,
    color: '#5A9BD5', // Azul escuro-claro
    marginLeft: 10,
    marginTop: 2,
  },
  exercicioDetalhes: {
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
    marginBottom: 5,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#007AFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#007AFF',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
    color: '#333',
  },
  exercicioCard: {
    marginBottom: 10,
    backgroundColor: '#e6f7ff',
    borderRadius: 5,
    elevation: 2, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 1 }, // Sombra para iOS
    shadowOpacity: 0.1, // Sombra para iOS
    shadowRadius: 2, // Sombra para iOS
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  fecharButton: {
    flex: 1,
    marginRight: 5,
  },
  excluirButton: {
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
