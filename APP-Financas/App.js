
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import CalculatorScreen from './CalculatorScreen';
import CadastroScreen from './CadastroScreen';
import TransferenciaScreen from './TransferenciaScreen';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CalculatorScreen" component={CalculatorScreen} />
        <Stack.Screen name="CadastroScreen" component={CadastroScreen} />
        <Stack.Screen name="TransferenciaScreen" component={TransferenciaScreen} />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}
