import React from 'react'
import { StyleSheet, View } from 'react-native'
import Theme from './../styles'
import PropTypes from 'prop-types'


const styles = StyleSheet.create({
    container: { flex: 1, }
})

const elements = [
    PropTypes.node,
    PropTypes.element,
    PropTypes.elementType,
]
const containerPropTypes = {
    children: PropTypes.oneOfType(elements)
}

export const Container = props => { 
    const customColor = props.bgColor || Theme.bg_egg
    return <View style={StyleSheet.compose(styles.container, customColor)}>
        { props.children }
    </View>
}

Container.propTypes = containerPropTypes