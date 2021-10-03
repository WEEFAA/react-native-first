import React from 'react'
import { StyleSheet, View } from 'react-native'
import Theme from './../styles'

const styles = StyleSheet.create({
    container: { flex: 1, }
})

export const Container = props => { 
    const customColor = props.bgColor || Theme.bg_egg
    return <View style={StyleSheet.compose(styles.container, customColor)}>
        { props.children }
    </View>
}