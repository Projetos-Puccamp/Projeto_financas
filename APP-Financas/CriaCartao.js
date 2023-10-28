import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity,TextInput, StyleSheet, StatusBar } from 'react-native';
import { useFocusEffect, useRoute } from '@react-navigation/native';
function CriaCartao({ navigation }) {
  const [cartaoNome, setCartaoNome] = useState('');
  const [cartaoTipo, setCartaoTipo] = useState('Crédito'); // Valor padrão
  const route = useRoute();
  const userID = route.params.userID;
  // Função para alternar entre "Crédito" e "Débito"
  const alternarTipo = () => {
    if (cartaoTipo === 'Crédito') {
      setCartaoTipo('Débito');
    } else {
      setCartaoTipo('Crédito');
    }
  };
  // Função para cadastrar um novo cartão
  const cadastrarCartao = () => {
    const novoCartao = {
      nome: cartaoNome,
      userID: userID // Você já possui o userID disponível
    };
    console.log(userID)
    // Faça uma requisição para a API para cadastrar o novo cartão
    fetch('http://192.168.0.104:3001/api/cartao/criacartaoD', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(novoCartao),
    })
    .then((response) => {
        if (!response.ok) {
        throw new Error('A resposta da API não foi bem-sucedida');
        }
        return response.json();
    })
    .then((data) => {
        // Processar a resposta da API (por exemplo, atualizar a interface do usuário)
        console.log('Cartão cadastrado com sucesso!');
        // Você pode atualizar a interface ou realizar outras ações aqui
    })
    .catch((error) => {
        // Tratar erros
    console.error('Erro:', error);
  });

  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Meu Banco</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Cartão"
        value={cartaoNome}
        onChangeText={(text) => setCartaoNome(text)}
      />
      <Text style={styles.label}>Tipo de Cartão: {cartaoTipo}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={alternarTipo}
      >
        <Text style={styles.buttonText}>
          {cartaoTipo === 'Crédito' ? 'Selecionar Débito' : 'Selecionar Crédito'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={cadastrarCartao}
      >
        <Text style={styles.buttonText}>Cadastrar Cartão</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 5,
    marginBottom: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default CriaCartao;
