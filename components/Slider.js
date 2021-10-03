import React, { useMemo } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
const dimension = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        minHeight: dimension.height / 2.2,
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
        <View>
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
