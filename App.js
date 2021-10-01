import React from 'react';
import {View, Text, StyleSheet } from 'react-native';
import { Push } from './components/FlatList'
import { Specifications } from './components/Platform'
import Todo, { TodoButton, TodoInput } from './components/Todo'
import Movies, { Items } from './components/Movies'

const styles = StyleSheet.create({
  container: {
    flex: 1
  }, 
  header: {
    fontSize: 48,
    fontFamily: "Verdana",
    margin: 2
  }
})

const Home = () => {
  return (
    <View style={styles.container}>
      <Movies>
        <Items />
      </Movies>
    </View>
  );
};

export default Home;
