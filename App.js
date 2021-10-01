import React from 'react';
import { View, StyleSheet } from 'react-native';
import PopularMovies from './screens/PopularMovies';

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
      <PopularMovies />
    </View>
  );
};

export default Home;
