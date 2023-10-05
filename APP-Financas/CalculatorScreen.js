import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function CalculatorScreen() {
    const [quantidade, setQuantidade] = useState(''); // Estado para armazenar a quantidade
    const [resultado, setResultado] = useState(null); // Estado para armazenar o resultado
  
    const calcularResultado = (multiplicador) => {
      if (quantidade !== '') {
        const resultadoCalculado = parseFloat(quantidade) * multiplicador;
        setResultado(resultadoCalculado.toFixed(2)); // Arredondar para duas casas decimais
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Calculadora de Moedas</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Insira a quantidade"
          keyboardType="numeric"
          onChangeText={(text) => setQuantidade(text)}
          value={quantidade}
        />
  
        <View style={styles.buttonContainer}>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => calcularResultado(5.16)} 
            >
              <Text style={styles.buttonText}>Dólares -> Real</Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={styles.button}
              onPress={() => calcularResultado(5.42)} 
            >
              <Text style={styles.buttonText}>Euro -> Real</Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={styles.button}
              onPress={() => calcularResultado(6.26)} 
            >
              <Text style={styles.buttonText}>Libra -> Real</Text>
            </TouchableOpacity>
          </View>
  
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => calcularResultado(0.19)} 
            >
              <Text style={styles.buttonText}>Real -> Dólares</Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={styles.button}
              onPress={() => calcularResultado(0.23)} 
            >
              <Text style={styles.buttonText}>Real -> Euro</Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={styles.button}
              onPress={() => calcularResultado(0.16)} 
            >
              <Text style={styles.buttonText}>Real -> Libra</Text>
            </TouchableOpacity>
          </View>
        </View>
  
        {resultado !== null && (
          <Text style={styles.resultText}>
            Resultado: R${resultado}
          </Text>
        )}
  
        <StatusBar style="auto" />
      </View>
    );
  }
  
  
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#ffffff',
          padding: 16,
        },
        headerText: {
          fontSize: 24,
          fontWeight: 'bold',
        },
        input: {
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          paddingHorizontal: 10,
          marginBottom: 10,
        },
        buttonContainer: {
          flexDirection: 'row', // Arrange buttons in a row
          justifyContent: 'space-between', // Space evenly between buttons
          flex: 0.6, // Decreased the flex to make the button containers smaller
        },
        button: {
          backgroundColor: '#007AFF',
          padding: 16,
          borderRadius: 5,
          marginBottom: 10,
        },
        buttonText: {
          color: 'white',
          fontSize: 16,
          fontWeight: 'bold',
          textAlign: 'center',
        },
        resultText: {
          fontSize: 18,
          fontWeight: 'bold',
          marginTop: 10,
        },
        buttonTextInverse: {
          color: 'white',
          fontSize: 16,
          fontWeight: 'bold',
          textAlign: 'center',
        },
      });
      
export default CalculatorScreen;
