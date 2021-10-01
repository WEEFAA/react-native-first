import React from 'react'
import { ActivityIndicator, StyleSheet, View, ImageBackground } from 'react-native'
import Theme, { BlackCoral } from './../styles'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const container = StyleSheet.compose(styles.container, Theme.bg_egg)
export const Loading = function(props){
    return <ImageBackground source={require('./../assets/background.jpeg')} style={container}>
        <ActivityIndicator size="large" color={BlackCoral} {...props}/>
    </ImageBackground>
}