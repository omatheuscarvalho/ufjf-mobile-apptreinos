import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { 
  TextInput, 
  Button, 
  Title, 
  Card 
} from 'react-native-paper';

export default function AddExerciseScreen({ navigation }) {
  const [nomeExercicio, setNomeExercicio] = useState('');
  const [repeticoes, setRepeticoes] = useState('');
  const [series, setSeries] = useState('');

  const salvarExercicio = () => {
    // Validações
    if (nomeExercicio.trim() === '') {
      Alert.alert('Validação', 'Por favor, insira o nome do exercício.');
      return;
    }

    if (repeticoes.trim() === '' || isNaN(repeticoes)) {
      Alert.alert('Validação', 'Por favor, insira um número válido de repetições.');
      return;
    }

    if (series.trim() === '' || isNaN(series)) {
      Alert.alert('Validação', 'Por favor, insira um número válido de séries.');
      return;
    }

    const novoExercicio = {
      nomeExercicio,
      repeticoes: parseInt(repeticoes),
      series: parseInt(series),
    };

    // Passar o novo exercício de volta para a tela anterior
    navigation.navigate('NewFicha', { novoExercicio });
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Adicionar Novo Exercício</Title>
          
          <TextInput
            label="Nome do Exercício"
            value={nomeExercicio}
            onChangeText={setNomeExercicio}
            placeholder="Digite o nome do exercício"
            mode="outlined"
            style={styles.input}
          />
          
          <TextInput
            label="Número de Repetições"
            value={repeticoes}
            onChangeText={setRepeticoes}
            placeholder="Digite o número de repetições"
            keyboardType="numeric"
            mode="outlined"
            style={styles.input}
          />
          
          <TextInput
            label="Número de Séries"
            value={series}
            onChangeText={setSeries}
            placeholder="Digite o número de séries"
            keyboardType="numeric"
            mode="outlined"
            style={styles.input}
          />
          
          <Button 
            mode="contained" 
            onPress={salvarExercicio} 
            style={styles.button}
          >
            Salvar Exercício
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
    marginTop: 10,
    padding: 5,
  },
});
