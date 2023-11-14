import React, { useState } from 'react';
import { View, Text, StatusBar,TextInput, TouchableOpacity,FlatList, StyleSheet, Alert } from 'react-native';
import { useFocusEffect, useRoute, useNavigation } from '@react-navigation/native';

const FinanciamentoScreen = ({ navigation }) => {

  const route = useRoute();
  const userID = route.params.userID;
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Área de Financiamentos</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CriaFinan',{ userID: userID })}
      >
        <Text style={styles.buttonText}>Criar Novo Financiamento</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CalcFinan', { userID: userID })}
      >
        <Text style={styles.buttonText}>Calculadora de Financiamento</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
      <ListFinan userID={userID} />
    </View>
  );
}

function ListFinan({userID}) {
    const [cards, setCards] = useState([]);
    const route = useRoute();
    const navigation = useNavigation();
    useFocusEffect(
    React.useCallback(() => {
        var usuario = {
            userID: userID
        };
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify(usuario),
        credentials: 'include'
    };
      fetch('http://192.168.15.32:3001/api/financiamento/listfinanciamento', requestOptions)
        .then(response => response.json())
        .then(data => {
            if(data){
                setCards(data);
                console.log('Dados definidos:', data);
            } else {
                console.log("Sem data");
            }
        })
        .catch(error => {
        console.error('Erro:', error);
        });
  }, [])
       );

       return (
        <FlatList
          data={[{ key: 'header', text: 'Meus Financiamentos:' }, ...cards]}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => {
            if (item.key === 'header') {
              return (
                <Text style={styles.cardListHeader}>{item.text}</Text>
              );
            }
            return (
              <View style={styles.cardItem}>
                <View style={styles.textContainer}>
                <Text style={styles.cardNumber}>ID: {item.FinanciamentoID}</Text>
                  <Text style={styles.cardNumber}>Nome: {item.Nomefinan}</Text>
                  <Text style={styles.cardNumber}>Valor Pego: {item.ValorTotal}</Text>
                  <Text style={styles.cardNumber}>Total de Parcelas: {item.QuantidadeParcelas}</Text>
                  <Text style={styles.cardNumber}>Parcelas Pagas: {item.ParcelasPagas}</Text>
                  <Text style={styles.cardNumber}>Valor Parcela: {item.ValorParcela}</Text>
                  <Text style={styles.cardNumber}>Juros Anual: {(item.Juros * 12 * 100).toFixed(2)}%</Text>

                </View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate('AcompanhaFinanciamento', { cardData: item })}
                >
                  <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
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
    marginTop: 20,
  },
  cardListContainer: {
    marginTop: 20,
  },
  cardListHeader: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardItem: {
      backgroundColor: '#f0f0f0',
      padding: 10,
      borderRadius: 5,
      marginVertical: 5,
    },

});

export default FinanciamentoScreen;
