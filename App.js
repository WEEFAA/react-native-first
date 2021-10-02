import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import PopularMovies from './screens/PopularMovies';
import MovieDetails from './screens/MovieDetails';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import NAVS from './navigations'
import Theme from './styles'

const Stack = createNativeStackNavigator()
const Tabs = createBottomTabNavigator()

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

const PopularMoviesStack = () => {
  const detailOptions =  props => ({ 
    title: props.route.params.title
  })

  const options = { 
    headerStyle: Theme.bg_rich_black, 
    headerTitleStyle: Theme.text_egg
  }
  
  return <View style={styles.container}>
    <Stack.Navigator initialRouteName={NAVS.POPULAR_MOVIES} screenOptions={options}>
      <Stack.Screen name={NAVS.POPULAR_MOVIES} component={PopularMovies} />
      <Stack.Screen name={NAVS.MOVIE_DETAIL} component={MovieDetails} options={detailOptions} />
    </Stack.Navigator>
  </View>
}

const App = () => {        
  const options = {
    headerShown: false, 
    tabBarStyle: Theme.bg_rich_black, 
    tabBarLabelStyle: Theme.text_egg 
  }
  return (
    <NavigationContainer>
      <Tabs.Navigator screenOptions={options}>
        <Tabs.Screen name="Popular" component={PopularMoviesStack}/>
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default App;
