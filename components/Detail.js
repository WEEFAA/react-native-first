import React from 'react'
import { View, StyleSheet } from 'react-native'

export const Details = function({ children, ...props }){
    return <View style={styles.details} {...props} >
        { children }
    </View>
}

export const Key = function({ children, ...props }){
    return <View style={styles.detailKey} {...props} >
        { children }
    </View>
}

export const Value = function({ children, ...props }){
    return <View style={styles.detailValue} {...props} >
        { children }
    </View>
}

const styles = StyleSheet.create({
    details: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 9,
        borderWidth: 2,
        borderStyle: "dashed",
        borderColor: 'white'
    },
    detailKey: {
        width: '50%',
        alignItems: 'flex-start',
        marginBottom: 2
    },
    detailValue: {
        width: '50%',
        alignItems: 'flex-start',
        marginBottom: 2
    }
})