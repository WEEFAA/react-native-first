import React from 'react';
import PropTypes from 'prop-types'
import { Text, StyleSheet } from 'react-native';
import {
    human,
    iOSColors,
    systemWeights,
} from 'react-native-typography';

const bodyFonts = [
    'body', 'callout', 'subhead', 'footnote', 'caption1', 'caption2'
]

const humanBodyPropTypes = {
    darkTheme: PropTypes.bool,
    font: PropTypes.oneOf(bodyFonts).isRequired,
    weight: PropTypes.object.isRequired,
    color: PropTypes.string
}

export const HumanBody = function ({
    darkTheme,
    font,
    weight,
    color,
    children,
    ...props
}) {
    if(darkTheme && !color) font = human[`${font}White`]
    else font = human[font]
    return (
        <Text style={styles.humanBody(font, weight, color)} {...props}>
            {children}
        </Text>
    );
};

HumanBody.defaultProps = {
    font: 'body',
    weight: systemWeights.light,
    color: undefined,
    darkTheme: false
};

HumanBody.propTypes = humanBodyPropTypes

const styles = StyleSheet.create({
    humanBody: (font, weight, color) => {
        let style = StyleSheet.flatten(font, weight)
        if(color) style = StyleSheet.flatten(style, { color })
        return style 
    },
});
