import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,StatusBar} from 'react-native';

function HomeScreen({ navigation, saldo, setSaldo }) {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Meu Banco</Text>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Saldo Disponível</Text>
          <Text style={styles.balanceAmount}>${saldo}</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('CalculatorScreen')}
        >
          <Text style={styles.buttonText}>Calculadora de Moedas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('TransferenciaScreen', {
              saldo: saldo, // Pass the saldo prop
              setSaldo: setSaldo, // Pass the setSaldo prop
            })
          }
        >
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
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#333',
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
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
