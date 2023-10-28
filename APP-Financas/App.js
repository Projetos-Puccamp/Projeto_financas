import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import CalculatorScreen from './CalculatorScreen';
import CadastroScreen from './CadastroScreen';
import TransferenciaScreen from './TransferenciaScreen';
import RecuperacaoSenhaScreen from './RecuperacaoSenhaScreen';
import RecuperarSenha from './RecuperarSenha';
import CriaCartao from './CriaCartao';

const Stack = createStackNavigator();

export default function App() {
  var saldo; // Inicialize saldo como null

  useEffect(() => {
  }, []); // Adicione um array vazio como segundo argumento para executar o useEffect apenas uma vez

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home">
          {(props) => (
            <HomeScreen
              {...props}
              saldo={saldo} // Pass saldo como prop para HomeScreen
              //setSaldo={setSaldo} // Pass setSaldo como prop para HomeScreen
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="CalculatorScreen"
          component={CalculatorScreen}
          initialParams={{ saldo}} // Pass saldo e setSaldo como parâmetros iniciais
        />
        <Stack.Screen name="CadastroScreen" component={CadastroScreen} />
        <Stack.Screen
          name="TransferenciaScreen"
          component={TransferenciaScreen}
          initialParams={{ saldo}} // Pass saldo e setSaldo como parâmetros iniciais
        />
        <Stack.Screen
          name="CriaCartao"
          component={CriaCartao}
        />
        <Stack.Screen
                  name="RecuperacaoSenhaScreen"
                  component={RecuperacaoSenhaScreen} // Adicione a nova tela à navegação
                />
        <Stack.Screen
        name="RecuperarSenha"
        component={RecuperarSenha} // Adicione a nova tela à navegação
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
