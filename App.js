import React from 'react';
import {View, Text, StyleSheet } from 'react-native';
import { Push } from './components/FlatList'
import { Specifications } from './components/Platform'
import Todo, { TodoButton, TodoInput } from './components/Todo'

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingTop: 40
  }, 
  header: {
    fontSize: 48,
    fontFamily: "Verdana",
    margin: 2
  }
})

const Home = () => {
  const [name, setName] = React.useState('????');

  const onChange = text => {
    setName(text.toUpperCase());
  };

  return (
    <View style={styles.container}>
      <Todo>
        <Text style={styles.header}>Add your todos</Text>
        <TodoInput />
        <TodoButton />
      </Todo>
    </View>
  );
};

export default Home;
