import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, AsyncStorage } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [fichas, setFichas] = useState([]);

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

  const renderItem = ({ item }) => (
    <TouchableOpacity style={{ padding: 10, borderBottomWidth: 1 }}>
      <Text>{item.nome}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={fichas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text>Nenhuma ficha criada.</Text>}
      />
      <Button
        title="Criar Nova Ficha"
        onPress={() => navigation.navigate('NewFicha')}
      />
    </View>
  );
}
