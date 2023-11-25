import React, { useState, useEffect } from 'react';
import { View, Text,Image, TouchableOpacity, StyleSheet, FlatList, StatusBar } from 'react-native';
import { useFocusEffect, useRoute, useNavigation } from '@react-navigation/native';


const HistScreen = ({ navigation }) => {
    const route = useRoute();
    const { cardData } = route.params;
    const [cards, setCards] = useState([]);
        useFocusEffect(
        React.useCallback(() => {
             var usuario = {
                cardData:cardData
             };
           const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuario),
                credentials: 'include'
            };
            fetch('http://192.168.15.32:3001/api/cartao/listHistD', requestOptions)
            .then(response => response.json())
            .then(data => {
              if (data) {
                setCards(data.reverse());
              } else {
                console.log('Sem dados');
              }
            })
            .catch(error => {
              console.error('Erro:', error);
            });
          }, [])
               );

               return (
                <FlatList
                  data={[{ key: 'header', text: 'Histórico:' }, ...cards]}
                  keyExtractor={(item) => item.key}
                  renderItem={({ item }) => {
                    if (item.key === 'header') {
                      return <Text style={styles.cardListHeader}>{item.text}</Text>;
                    }
              
                    return (
                      <View style={styles.cardItem}>
                        <View style={styles.textContainer}>
                          <Text style={styles.cardNumber}>Tipo: {item.Tipo}</Text>
                          <Text style={styles.cardNumber}>Valor: {item.Valor}</Text>
                          <Text style={styles.cardNumber}>Detalhe: {item.Detalhe}</Text>
                        </View>
                      </View>
                    );
                  }}
                />
              );
              
                } 
const styles = StyleSheet.create({
    cardListContainer: {
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 10,
      },
      cardListHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      cardItem: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        backgroundColor: '#F0F8FF',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
      },
      textContainer: {
        flex: 1,
      },
      cardNumber: {
        fontSize: 16,
        marginBottom: 5,
      },
      cardDetails: {
        fontSize: 14,
        color: '#888',
      },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardInfoContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    width: 150,
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
  },
});

export default HistScreen;
