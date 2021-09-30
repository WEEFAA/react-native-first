import React from 'react'
import { Platform, Text, View, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 'auto',
        textAlign: 'left',
        marginBottom: 10
    },
    text: {
        width: '100%',
        fontSize: 18
    }
})

export const Specifications = function(props){
    return <View style={styles.container}>
        <Text style={styles.text}>You are running on version {Platform.Version}</Text>
        <Text style={styles.text}>Device:{Platform.select({
            ios: "Exotic",
            android: "Typical",
            default: "Hey"
        })}</Text>
    </View>
}