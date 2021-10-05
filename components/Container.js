import React from 'react'
import { StyleSheet, View } from 'react-native'
import Theme from './../styles'
import PropTypes from 'prop-types'

const elements = [PropTypes.node, PropTypes.element, PropTypes.elementType]

const containerPropTypes = {
    children: PropTypes.oneOfType(elements),
}

export const Container = ({
    bgColor,
    wrapperStyle,
    noDefaultColor,
    ...props
}) => {
    const customColor = bgColor
        ? { backgroundColor: bgColor }
        : noDefaultColor
        ? {}
        : Theme.bg_egg
    return (
        <View
            style={StyleSheet.flatten([
                styles.container,
                wrapperStyle,
                customColor,
            ])}>
            {props.children}
        </View>
    )
}

const justifyContentValues = [
    'center',
    'flex-end',
    'flex-start',
    'space-between',
    'space-evenly',
    'space-around',
]
const rowPropTypes = {
    children: PropTypes.oneOfType(elements),
    justifyContent: PropTypes.oneOf(justifyContentValues),
    style: PropTypes.object
}

const rowDefaultProps = {
    justifyContent: 'space-around',
    style: {},
}

export const Row = function ({ style, justifyContent, children, ...props }) {
    return (
        <View style={tableStyles.row(justifyContent, style)} {...props}>
            {children}
        </View>
    )
}

const colPropTypes = {
    children: PropTypes.oneOfType(elements),
}


export const Col = function ({ children, ...props }) {
    return <View {...props}>{children}</View>
}

const styles = StyleSheet.create({
    container: { flex: 1, width: '100%' },
})

const tableStyles = StyleSheet.create({
    row: (justifyContent, textStyle) => ({
        flexDirection: 'row',
        justifyContent: justifyContent,
        ...textStyle
    }),
})


Container.propTypes = containerPropTypes
Row.propTypes = rowPropTypes
Row.defaultProps = rowDefaultProps
Col.propTypes = colPropTypes
