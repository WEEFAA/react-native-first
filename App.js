import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import PopularMovies from './screens/PopularMovies';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 48,
    fontFamily: 'Verdana',
    margin: 2,
  },
});

const Home = () => {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen name="Popular Movies" component={PopularMovies} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
};

export default Home;
