import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen.js';
import NewFichaScreen from './screens/NewFichaScreen.js';
import AddExerciseScreen from './screens/AddExerciseScreen.js';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Fichas de Treino' }} />
        <Stack.Screen name="NewFicha" component={NewFichaScreen} options={{ title: 'Nova Ficha' }} />
        <Stack.Screen name="AddExercise" component={AddExerciseScreen} options={{ title: 'Adicionar Exercício' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
