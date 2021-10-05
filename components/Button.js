import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Pressable, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const buttonPropTypes = {
    name: PropTypes.string,
    onPress: PropTypes.func,
    iconProps: PropTypes.object,
};

export const Button = function ({ name, iconProps = {}, onPress, ...props }) {
    return (
        <Pressable onPress={onPress} style={styles.button} {...props}>
            <Ionicons name={name} size={50} {...iconProps} />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: state => ({ opacity: state.pressed ? 0.7 : 1 }),
});

Button.propTypes = buttonPropTypes;
