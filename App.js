import 'react-native-gesture-handler'
import React from 'react';
import { View, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PopularMovies from './screens/PopularMovies';
import MovieDetails from './screens/MovieDetails';
import Home from './screens/Home'
import NAVS from './navigations'
import Theme, { EggShell } from './styles'
// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const HomeStack = createNativeStackNavigator()
const PopularStack = createNativeStackNavigator()
const TabsStack = createBottomTabNavigator()

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

const HomeScreenStack = () => {
  const options = {headerShown: false}

  return <HomeStack.Navigator screenOptions={options}>
    <HomeStack.Screen name={NAVS.HOME} component={Home}/>
    <HomeStack.Screen name={NAVS.MOVIE_DETAIL} component={MovieDetails}/>
  </HomeStack.Navigator>  
}

const PopularMoviesStack = () => {
  const detailOptions =  props => ({ 
    title: props.route.params.title
  })

  const options = { 
    headerStyle: Theme.bg_rich_black, 
    headerTitleStyle: Theme.text_egg
  }

  return <View style={styles.container}>
    <PopularStack.Navigator initialRouteName={NAVS.POPULAR_MOVIES} screenOptions={options}>
      <PopularStack.Screen name={NAVS.POPULAR_MOVIES} component={PopularMovies} />
      <PopularStack.Screen name={NAVS.MOVIE_DETAIL} component={MovieDetails} options={detailOptions} />
    </PopularStack.Navigator>
  </View>
}

const App = () => {        
  const options = {
    headerShown: false, 
    tabBarStyle: Theme.bg_rich_black, 
    tabBarLabelStyle: Theme.text_egg 
  }
  
  const tabBarIcon = () => <MaterialIcons name="star" size={30} color={EggShell} />
  const homeBarIcon = () => <MaterialIcons name="home" size={30} color={EggShell} />
  
  return (
    <NavigationContainer>
      <TabsStack.Navigator screenOptions={options} initialRouteName={NAVS.TAB_HOME}>
        <TabsStack.Screen 
          name={NAVS.TAB_HOME} 
          component={HomeScreenStack} 
          options={{tabBarIcon: homeBarIcon, title: "Home" }}
        />
        <TabsStack.Screen 
          name={NAVS.TAB_POPULAR} 
          component={PopularMoviesStack} 
          options={{tabBarIcon, title: "Popular" }}
        />
      </TabsStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
