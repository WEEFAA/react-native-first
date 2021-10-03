import React, { useMemo } from 'react'
import { FlatList, Text, View, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex:1,
        marginVertical: 10
    },
    item: {
        fontSize: 24, 
        width: '100%', 
        textAlign: 'left',
        paddingHorizontal: 5,
        paddingVertical: 8,
        borderWidth: 1.5,
        borderColor: "#9AC2C5"
    }
})
export const Push = function ({data = [], ...props}) {

  const renderItem = useMemo(() => {
    return ({item}) => {
      return (
        <Text style={styles.item}>{item}</Text>
      );
    }
  },[data])
  
  return <FlatList style={styles.container} renderItem={renderItem} {...props} data={data}  />;
};
