import React, { useCallback } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import NAVS from './../navigations'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: '100%',
        height: 'auto',
        minWidth: 100,
        minHeight: 100,
    }
});

const cardTypes = {
    item: PropTypes.object.isRequired,
    wrapperStyle: PropTypes.object,
    children: PropTypes.element
}

export const Card = function ({ style, children, item, wrapperStyle, ...props }) {
    const navigation = useNavigation()

    const onPress = useCallback(function(){
        navigation.navigate(NAVS.MOVIE_DETAIL, { title: item.title, id: item.id })
    },[item])
    
    return (
        <TouchableOpacity onPress={onPress} style={StyleSheet.compose(styles.container, wrapperStyle)}>
            <Image style={StyleSheet.flatten([styles.image, style])} {...props} />
            {children}
        </TouchableOpacity>
    );
};

Card.propTypes = cardTypes
