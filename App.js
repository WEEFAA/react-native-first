import React from 'react';
import {View, Text, TextInput } from 'react-native';
import { Push } from './components/FlatList'
import { Specifications } from './components/Platform'
import Todo, { TodoButton, TodoInput } from './components/Todo'

const Home = () => {
  const [name, setName] = React.useState('????');

  const onChange = text => {
    setName(text.toUpperCase());
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 40}}>
      <Todo>
        <TodoInput />
        <TodoButton />
      </Todo>
    </View>
  );
};

export default Home;
