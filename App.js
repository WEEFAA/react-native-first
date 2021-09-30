import React from 'react';
import { View, Text, TextInput } from 'react-native';

const Home = () => {
  const [name, setName] = React.useState("????")

  const onChange = text => {
    setName(text)
  }
  
  return (
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 24}}>Hello {name}, let's do React Native!!!</Text>
      <TextInput  
        style={{textAlign: 'center', fontSize: 18}}
        placeholder="What is your name" 
        onChangeText={onChange}
      />
    </View>
  );
}

export default Home;