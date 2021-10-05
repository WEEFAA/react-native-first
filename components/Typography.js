import React from 'react';
import PropTypes from 'prop-types'
import { Text, StyleSheet } from 'react-native';
import { human, systemWeights } from 'react-native-typography';

const titleFonts = [
    'largeTitle', 'title1', 'title2', 'title3', 'headline'
]

const bodyFonts = [
    'body', 'callout', 'subhead', 'footnote', 'caption1', 'caption2'
]

const titlePropTypes = {
    darkTheme: PropTypes.bool,
    font: PropTypes.oneOf(titleFonts).isRequired,
    weight: PropTypes.object.isRequired,
    color: PropTypes.string,
    style: PropTypes.object
}

const humanBodyPropTypes = {
    darkTheme: PropTypes.bool,
    font: PropTypes.oneOf(bodyFonts).isRequired,
    weight: PropTypes.object.isRequired,
    color: PropTypes.string,
    style: PropTypes.object
}

export const Title = function({ 
    darkTheme,
    font,
    weight,
    color,
    style,
    children,
    ...props 
}){    
    if(darkTheme && !color) font = human[`${font}White`]
    else font = human[font]

    return <Text style={styles.title(font, weight, color, style)} {...props}>
        { children }
    </Text>
}

export const HumanBody = function ({
    darkTheme,
    font,
    weight,
    color,
    children,
    style,
    ...props
}) {
    if(darkTheme && !color) font = human[`${font}White`]
    else font = human[font]
    return (
        <Text style={styles.humanBody(font, weight, color, style)} {...props}>
            {children}
        </Text>
    );
};

Title.defaultProps = {
    font: 'title1',
    weight: systemWeights.semibold,
    color: undefined,
    style: {},
    darkTheme: false
};

HumanBody.defaultProps = {
    font: 'body',
    weight: systemWeights.light,
    color: undefined,
    darkTheme: false,
    style: {}
};

Title.propTypes = titlePropTypes
HumanBody.propTypes = humanBodyPropTypes

const styles = StyleSheet.create({
    title: (font, weight, color, textStyle) => {
        let style = StyleSheet.flatten([font, weight, textStyle])
        if(color) style = StyleSheet.compose(style, { color })
        return style 
    },
    humanBody: (font, weight, color, textStyle) => {
        let style = StyleSheet.flatten([font, weight, textStyle])
        if(color) style = StyleSheet.compose(style, { color })
        return style 
    },
});
