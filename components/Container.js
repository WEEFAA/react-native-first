import React from 'react'
import { StyleSheet, View } from 'react-native'
import Theme from './../styles'

const styles = StyleSheet.create({
    container: { flex: 1, }
})

const container = StyleSheet.compose(styles.container, Theme.bg_egg)

export const Container = props => <View style={container}>
    { props.children }
</View>