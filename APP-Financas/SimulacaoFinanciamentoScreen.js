import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';

const SimulacaoFinanciamentoScreen = () => {
  const [valorTotal, setValorTotal] = useState('');
  const [parcelasTotais, setParcelasTotais] = useState('');
  const [valorParcela, setValorParcela] = useState('');
  const [taxaJuros, setTaxaJuros] = useState('');
  const [dataInicio, setDataInicio] = useState('');

  const salvarFinanciamento = () => {
    fetch('http://192.168.0.110:3001/api/salvarFinanciamento', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        valorTotal: parseFloat(valorTotal),
        parcelasTotais: parseInt(parcelasTotais),
        valorParcela: parseFloat(valorParcela),
        taxaJuros: parseFloat(taxaJuros),
        dataInicio,
        // ... outros dados da simulação, se houver
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Financiamento salvo:', data);
        // Aqui, pode-se redirecionar o usuário ou dar algum feedback sobre a operação feita
      })
      .catch(error => {
        console.error('Erro ao salvar o financiamento:', error);
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Simulação de Financiamento</Text>
      <TextInput
        placeholder="Valor Total"
        value={valorTotal}
        onChangeText={text => setValorTotal(text)}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Parcelas Totais"
        value={parcelasTotais}
        onChangeText={text => setParcelasTotais(text)}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Valor da Parcela"
        value={valorParcela}
        onChangeText={text => setValorParcela(text)}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Taxa de Juros"
        value={taxaJuros}
        onChangeText={text => setTaxaJuros(text)}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Data de Início (YYYY-MM-DD)"
        value={dataInicio}
        onChangeText={text => setDataInicio(text)}
      />
      {/* Aqui ficariam os outros campos da simulação de financiamento */}
      <Button title="Salvar Financiamento" onPress={salvarFinanciamento} />
    </View>
  );
};

export default SimulacaoFinanciamentoScreen;