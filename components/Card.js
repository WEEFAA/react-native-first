import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: 100,
        height: 100,
    }
});

export const Card = function ({ children, wrapperStyle, ...props }) {
    return (
        <View style={StyleSheet.compose(styles.container, wrapperStyle)}>
            <Image style={styles.image} {...props} />
            {children}
        </View>
    );
};
