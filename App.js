import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import PopularMovies from './screens/PopularMovies';
import MovieDetails from './screens/MovieDetails';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NAVS from './navigations'
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
  const detailOptions =  props => ({ 
    title: props.route.params.title
  })
          
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Stack.Navigator initialRouteName={NAVS.POPULAR_MOVIES}>
          <Stack.Screen name={NAVS.POPULAR_MOVIES} component={PopularMovies} />
          <Stack.Screen name={NAVS.MOVIE_DETAIL} component={MovieDetails} options={detailOptions} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
};

export default Home;
