import React from 'react'
import { ActivityIndicator, StyleSheet, View, ImageBackground } from 'react-native'
import Theme, { BlackCoral } from './../styles'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    }
})

const container = StyleSheet.compose(styles.container)
export const Loading = function({noImage, ...props}){
    const containerStyle = StyleSheet.flatten([container, props.wrapperStyle])
    if(noImage){
        return <View style={containerStyle}>
            <ActivityIndicator size="large" color={BlackCoral} {...props}/>
        </View>
    }
    return <ImageBackground 
        source={require('./../assets/background.jpeg')} 
        style={containerStyle}
    >
        <ActivityIndicator size="large" color={BlackCoral} {...props}/>
    </ImageBackground>
}