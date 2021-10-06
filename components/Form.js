import React from 'react'
import { TextInput, StyleSheet, View } from 'react-native'

export const Input = function({ style, wrapperStyle, children, ...props }){
    return <View style={styles.container(wrapperStyle)}>
        <TextInput style={styles.input(style)} {...props}/>
        <View style={styles.extra}>
            { children }
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: (style) => StyleSheet.flatten([
        {
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 12,
            paddingHorizontal: 12
        },
        style
    ]),
    input: (style) => StyleSheet.flatten([
        {
            height: 40,
            borderWidth: 2,
            padding: 10,
            paddingRight: 20,
            borderRadius: 8,
            flexGrow: 1,
            flexShrink: 1,
            marginRight: 5
        },
        style
    ]),
    extra: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})