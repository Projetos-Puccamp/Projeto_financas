import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import CalculatorScreen from './CalculatorScreen';
import CadastroScreen from './CadastroScreen';
import TransferenciaScreen from './TransferenciaScreen';

const Stack = createStackNavigator();

export default function App() {
  const [saldo, setSaldo] = useState(0); // Initial saldo set to 0

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home">
          {(props) => (
            <HomeScreen
              {...props}
              saldo={saldo} // Pass saldo and setSaldo as props to HomeScreen
              setSaldo={setSaldo}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="CalculatorScreen"
          component={CalculatorScreen}
          initialParams={{ saldo, setSaldo }} // Pass saldo and setSaldo as initial params
        />
        <Stack.Screen name="CadastroScreen" component={CadastroScreen} />
        <Stack.Screen
          name="TransferenciaScreen"
          component={TransferenciaScreen}
          initialParams={{ saldo, setSaldo }} // Pass saldo and setSaldo as initial params
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
