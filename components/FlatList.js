import React from 'react'
import { FlatList, Text, View, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex:1,
        marginVertical: 10
    },
    item: {
        fontSize: 24, 
        width: '100%', 
        textAlign: 'center',
        paddingHorizontal: 5,
        paddingVertical: 8,
        borderWidth: 1.5,
        borderColor: "#9AC2C5"
    }
})
export const Push = function ({data = [], ...props}) {
  const renderItem = ({item}) => {
    return (
      <Text style={styles.item}>{item}</Text>
    );
  };
  return <FlatList style={styles.container} {...props} data={data} renderItem={renderItem} />;
};
