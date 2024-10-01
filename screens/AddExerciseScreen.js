import React, { useState } from 'react';
import { View, Text, TextInput, Button, Picker } from 'react-native';

export default function AddExerciseScreen({ route, navigation }) {
  const [nomeExercicio, setNomeExercicio] = useState('');
  const [repeticoes, setRepeticoes] = useState('');
  const [series, setSeries] = useState('');

  const { setExercicios } = route.params;

  const salvarExercicio = () => {
    const novoExercicio = { nomeExercicio, repeticoes, series };
    setExercicios(prevState => [...prevState, novoExercicio]);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Nome do Exercício:</Text>
      <TextInput
        value={nomeExercicio}
        onChangeText={setNomeExercicio}
        placeholder="Digite o nome do exercício"
        style={{ borderWidth: 1, padding: 5, marginBottom: 20 }}
      />
      <Text>Número de Repetições:</Text>
      <TextInput
        value={repeticoes}
        onChangeText={setRepeticoes}
        placeholder="Digite o número de repetições"
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 5, marginBottom: 20 }}
      />
      <Text>Número de Séries:</Text>
      <TextInput
        value={series}
        onChangeText={setSeries}
        placeholder="Digite o número de séries"
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 5, marginBottom: 20 }}
      />
      <Button title="Salvar Exercício" onPress={salvarExercicio} />
    </View>
  );
}
