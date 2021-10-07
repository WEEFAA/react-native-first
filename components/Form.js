import React from 'react'
import { TextInput, StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { human, iOSColors } from 'react-native-typography'

const titleFonts = [
    'largeTitle', 'title1', 'title2', 'title3', 'headline'
]

const bodyFonts = [
    'body', 'callout', 'subhead', 'footnote', 'caption1', 'caption2'
]

const inputPropTypes = {
    size: PropTypes.oneOf([...titleFonts, ...bodyFonts]),
    color: PropTypes.string.isRequired,
    style: PropTypes.object,
    wrapperStyle: PropTypes.object,
}

const inputDefaultProps = {
    size: 'headline',
    color: iOSColors.black
}

export const Input = function({ color, size, style, wrapperStyle, children, ...props }){
    const humanFont = human[size] 
    return <View style={styles.container(wrapperStyle)}>
        <TextInput style={styles.input(humanFont, color, style)} {...props}/>
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
    input: (font, color, style) => StyleSheet.flatten([
        font,
        {
            height: 'auto',
            borderWidth: 2,
            padding: 10,
            paddingRight: 20,
            borderRadius: 8,
            flexGrow: 1,
            flexShrink: 1,
            marginRight: 5,
            paddingVertical: 8,
            color: color
        },
        style
    ]),
    extra: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})

Input.propTypes = inputPropTypes
Input.defaultProps = inputDefaultProps