import React, { useMemo } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import { iOSColors } from 'react-native-typography'
const dimension = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        minHeight: dimension.height / 2.2,
        backgroundColor: iOSColors.black
    },
    dotStyle: {
        display: 'none',
    },
});

export const Slider = function (props) {
    const height = useMemo(() => {
        return dimension.height / 2.2;
    }, [dimension]);

    return (
        <View style={styles.container}>
            <SliderBox
                autoplay
                circleLoop
                sliderBoxHeight={height}
                dotStyle={styles.dotStyle}
                {...props}
            />
        </View>
    );
};
