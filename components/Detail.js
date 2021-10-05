import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import { iOSColors } from 'react-native-typography'

const detailDefaultProps = {
    style: {},
    borderStyle: 'dashed'
}

const detailPropTypes = {
    style: PropTypes.object,
    borderStyle: PropTypes.oneOf(['dashed','dotted', 'solid'])
}

export const Details = function({ borderStyle, style, children, ...props }){
    return <View style={styles.details(borderStyle,style)} {...props} >
        { children }
    </View>
}

const keyDefaultProps = {
    style: {}
}

const keyPropTypes = {
    style: PropTypes.object
}

export const Key = function({ style, children, ...props }){
    return <View style={styles.detailKey(style)} {...props} >
        { children }
    </View>
}

const valueDefaultProps = {
    style: {}
}

const valuePropTypes = {
    style: PropTypes.object
}

export const Value = function({ style, children, ...props }){
    return <View style={styles.detailValue(style)} {...props} >
        { children }
    </View>
}

const styles = StyleSheet.create({
    details: (borderStyle, extra) => {
        const style = {
            width: '100%',
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 9,
            borderWidth: 2,
            borderStyle: borderStyle,
            borderColor: iOSColors.white
        }
        return StyleSheet.flatten([style, extra])
    },
    detailKey: extra => {
        const style = {
            width: '50%',
            alignItems: 'flex-start',
            marginBottom: 2
        }
        return StyleSheet.flatten([style, extra])
    },
    detailValue: extra => {
        const style = {
            width: '50%',
            alignItems: 'flex-start',
            marginBottom: 2
        }
        return StyleSheet.flatten([style, extra])
    }
})

Details.defaultProps = detailDefaultProps
Key.defaultProps = keyDefaultProps
Value.defaultProps = valueDefaultProps

Details.propTypes = detailPropTypes
Key.propTypes = keyPropTypes
Value.propTypes = valuePropTypes