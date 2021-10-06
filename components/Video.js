import React from 'react'
import NativeVideo from 'react-native-video'
import { StyleSheet } from 'react-native'

export const Video = ({ ...props }) => {
    return <NativeVideo
        style={styles.backgroundVideo} 
        resizeMode="cover"
        fullscreen
        {...props} 
    />
}

const styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: '100%',
        height: '100%',
    },
})
