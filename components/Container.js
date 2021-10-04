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

export const Container = ({ bgColor, wrapperStyle, noDefaultColor, ...props}) => { 
    const customColor = bgColor ? { backgroundColor: bgColor } : noDefaultColor ? {} : Theme.bg_egg
    return <View style={StyleSheet.flatten([styles.container, wrapperStyle, customColor ])}>
        { props.children }
    </View>
}

Container.propTypes = containerPropTypes