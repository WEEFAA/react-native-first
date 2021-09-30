import React from 'react';
import {View, Text, TextInput } from 'react-native';
import { Push } from './components/FlatList'

const Home = () => {
  const [name, setName] = React.useState('????');

  const onChange = text => {
    setName(text.toUpperCase());
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 24}}>Hello {name}, let's do React Native!!!</Text>
      <TextInput
        style={{textAlign: 'center', fontSize: 18}}
        placeholder="What is your name"
        clearTextOnFocus
        onChangeText={onChange}
      />
      <Push count={100} style={{width: '100%'}}/>
    </View>
  );
};

export default Home;
