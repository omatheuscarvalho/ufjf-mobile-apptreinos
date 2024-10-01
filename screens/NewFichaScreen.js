import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';

export default function NewFichaScreen({ navigation }) {
  const [nomeFicha, setNomeFicha] = useState('');
  const [exercicios, setExercicios] = useState([]);

  const adicionarExercicio = () => {
    navigation.navigate('AddExercise', { setExercicios });
  };

  const salvarFicha = async () => {
    try {
      const novaFicha = { nome: nomeFicha, exercicios };
      const fichasSalvas = await AsyncStorage.getItem('@fichas');
      const fichas = fichasSalvas ? JSON.parse(fichasSalvas) : [];
      fichas.push(novaFicha);
      await AsyncStorage.setItem('@fichas', JSON.stringify(fichas));
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={{ padding: 10, borderBottomWidth: 1 }}>
      <Text>{item.nomeExercicio} - {item.series} séries de {item.repeticoes} repetições</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Nome da Ficha:</Text>
      <TextInput
        value={nomeFicha}
        onChangeText={setNomeFicha}
        placeholder="Digite o nome da ficha"
        style={{ borderWidth: 1, padding: 5, marginBottom: 20 }}
      />
      <Button title="Adicionar Exercício" onPress={adicionarExercicio} />
      <FlatList
        data={exercicios}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text>Nenhum exercício adicionado.</Text>}
      />
      <Button title="Salvar Ficha" onPress={salvarFicha} />
    </View>
  );
}
