import React from 'react';
import { View, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/MaterialIcons';
import PopularMovies from './screens/PopularMovies';
import MovieDetails from './screens/MovieDetails';
import NAVS from './navigations'
import Theme, { EggShell } from './styles'
// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

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
  const tabBarIcon = () => <Ionicons name="star" size={30} color={EggShell} />
  return (
    <NavigationContainer>
      <Tabs.Navigator screenOptions={options}>
        <Tabs.Screen 
          name="Popular" 
          component={PopularMoviesStack} 
          options={{tabBarIcon}}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default App;
