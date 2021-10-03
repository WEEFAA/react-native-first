import React, { useMemo } from 'react'
import { StyleSheet, Dimensions } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";

const styles = StyleSheet.create({
    dotStyle: {
        display: 'none'
    }
})

const dimension = Dimensions.get("screen")

export const Slider = function(props){
    
    const height = useMemo(() => {
        return dimension.height / 2.2
    }, [dimension])
    
    return <SliderBox  
        autoplay
        circleLoop
        sliderBoxHeight={height} 
        dotStyle={styles.dotStyle}
        {...props}
    />
}