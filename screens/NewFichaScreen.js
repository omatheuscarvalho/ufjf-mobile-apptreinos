import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { 
  TextInput, 
  Button, 
  Title, 
  Card, 
  Paragraph 
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NewFichaScreen({ route, navigation }) {
  const [nomeFicha, setNomeFicha] = useState('');
  const [exercicios, setExercicios] = useState([]);

  useEffect(() => {
    if (route.params?.novoExercicio) {
      const novoExercicio = route.params.novoExercicio;
      setExercicios(prevState => [...prevState, novoExercicio]);

      // Limpar o parâmetro após usar para evitar duplicações
      navigation.setParams({ novoExercicio: null });
    }
  }, [route.params?.novoExercicio]);

  const adicionarExercicio = () => {
    navigation.navigate('AddExercise');
  };

  const salvarFicha = async () => {
    // Validações
    if (nomeFicha.trim() === '') {
      Alert.alert('Validação', 'Por favor, insira o nome da ficha.');
      return;
    }

    if (exercicios.length === 0) {
      Alert.alert('Validação', 'Adicione pelo menos um exercício.');
      return;
    }

    try {
      const novaFicha = { nome: nomeFicha, exercicios };
      const fichasSalvas = await AsyncStorage.getItem('@fichas');
      const fichas = fichasSalvas ? JSON.parse(fichasSalvas) : [];
      fichas.push(novaFicha);
      await AsyncStorage.setItem('@fichas', JSON.stringify(fichas));
      Alert.alert('Sucesso', 'Ficha salva com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível salvar a ficha.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.exercicioItem}>
      <TextInput
        mode="outlined"
        value={item.nomeExercicio}
        editable={false}
        label="Nome do Exercício"
        style={styles.exercicioNome}
      />
      <Paragraph style={styles.exercicioDetalhes}>
        {item.series} séries de {item.repeticoes} repetições
      </Paragraph>
    </View>
  );

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Nova Ficha de Treino</Title>
          
          <TextInput
            label="Nome da Ficha"
            value={nomeFicha}
            onChangeText={setNomeFicha}
            placeholder="Digite o nome da ficha"
            mode="outlined"
            style={styles.input}
          />
          
          <Button 
            mode="contained" 
            onPress={adicionarExercicio} 
            style={styles.button}
          >
            Adicionar Exercício
          </Button>
          
          <Title style={styles.sectionHeader}>Exercícios Adicionados:</Title>
          
          {exercicios.length > 0 ? (
            exercicios.map((exercicio, index) => (
              <Card key={index} style={styles.exercicioCard}>
                <Card.Content>
                  <Paragraph style={styles.exercicioNome}>{exercicio.nomeExercicio}</Paragraph>
                  <Paragraph style={styles.exercicioDetalhes}>
                    {exercicio.series} séries de {exercicio.repeticoes} repetições
                  </Paragraph>
                </Card.Content>
              </Card>
            ))
          ) : (
            <Paragraph style={styles.emptyText}>Nenhum exercício adicionado.</Paragraph>
          )}
          
          <Button 
            mode="contained" 
            onPress={salvarFicha} 
            style={styles.saveButton}
          >
            Salvar Ficha
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f7',
    justifyContent: 'center',
  },
  card: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 3, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 }, // Sombra para iOS
    shadowOpacity: 0.1, // Sombra para iOS
    shadowRadius: 5, // Sombra para iOS
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#007AFF',
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginBottom: 20,
    padding: 5,
  },
  saveButton: {
    marginTop: 20,
    padding: 5,
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
  exercicioNome: {
    fontSize: 16,
    fontWeight: '500',
    color: '#005f99',
  },
  exercicioDetalhes: {
    fontSize: 14,
    color: '#333',
  },
  exercicioItem: {
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginVertical: 10,
  },
});
