import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import CalculatorScreen from './CalculatorScreen';
import CadastroScreen from './CadastroScreen';
import TransferenciaScreen from './TransferenciaScreen';

const Stack = createStackNavigator();

export default function App() {
  var saldo; // Inicialize saldo como null

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    };

    // Realiza a requisição para a API
    fetch('http://172.16.233.34:3001/api/conta/saldo', requestOptions)
      .then(response => response.json())
      .then(data => {
        // Processa a resposta da API
        if (data && data.Saldo) {
          saldo = data.Saldo; // Atualize o saldo com o valor da API
          console.log(saldo);
        } else {
          // O login falhou, exiba uma mensagem de erro ao usuário
          console.log("deu else");
        }
      })
      .catch(error => {
        // Trata erros
        console.error('Erro:', error);
      });
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
