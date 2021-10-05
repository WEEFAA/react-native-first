import React, { useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types'
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import { iOSColors } from 'react-native-typography'

const sliderPropTypes = {
    onCurrentImagePressed: PropTypes.func,
    children: PropTypes.func,
}

export const Slider = function ({onCurrentImagePressed, children, ...props}) {
    const [index, setIndex] = useState(0)
    const dimension = useWindowDimensions()

    const height = useMemo(() => {
        return dimension.height / 2 ;
    }, [dimension]);

    const currentImageEmitter = useCallback(i => {
        setIndex(i)
    },[])

    const pressHandler = useCallback(() => {
        onCurrentImagePressed(index)
    },[index, onCurrentImagePressed])

    const renderProps = useMemo(() => {
        return { index, pressHandler }
    },[index, pressHandler])

    return (
        <View style={styles.container(height)}>
            <SliderBox
                autoplay
                circleLoop
                sliderBoxHeight={height}
                dotStyle={styles.dotStyle}
                currentImageEmitter={currentImageEmitter}
                onCurrentImagePressed={onCurrentImagePressed}
                {...props}
            />
            { children &&<View style={styles.extraStuff}>
                { children(renderProps) }
            </View> }
        </View>
    );
};

Slider.propTypes = sliderPropTypes
const styles = StyleSheet.create({
    container: minHeight => ({
        minHeight: minHeight,
        backgroundColor: iOSColors.black,
        position: 'relative',
    }),
    dotStyle: {
        display: 'none',
    },
    extraStuff: {
        width: '100%',
        height: 100,
        position: 'absolute',
        bottom: -50,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingHorizontal: 20
    }
});
