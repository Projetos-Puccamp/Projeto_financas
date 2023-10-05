import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function HomeScreen({ navigation, saldo }) {
    const handleCalculatorPress = () => {
      navigation.navigate('CalculatorScreen');
    };
  
    const handleTransferenciaPress = () => {
      navigation.navigate('TransferenciaScreen', { saldo });
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Meu Banco</Text>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Saldo Disponível</Text>
          <Text style={styles.balanceAmount}>${saldo}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleCalculatorPress}>
          <Text style={styles.buttonText}>Calculadora de Moedas</Text>
        </TouchableOpacity>
  
        <TouchableOpacity style={styles.button} onPress={handleTransferenciaPress}>
          <Text style={styles.buttonText}>Transferências</Text>
        </TouchableOpacity>
  
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
    balanceContainer: {
      marginTop: 20,
    },
    balanceLabel: {
      fontSize: 16,
      marginBottom: 10,
    },
    balanceAmount: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    button: {
      backgroundColor: '#007AFF',
      padding: 16,
      borderRadius: 5,
      marginTop: 20,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
  export default HomeScreen;