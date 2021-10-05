import React from 'react'
import PropTypes from 'prop-types'
import {
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    Image,
    View,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { iOSColors } from 'react-native-typography'
import { Title } from './Typography'
import Theme from './../styles'
import { isMain } from './../navigations'
const logo = require('./../assets/esom_adaptive_fore.png')

const propTypes = {
    navigation: PropTypes.object.isRequired,
    options: PropTypes.object.isRequired,
}

const Navigation = ({ navigation, route, options }) => {
    const canGoBack = navigation.canGoBack()
    const { title } = options
    const main = React.useMemo(() => {
        return isMain(route.name)
    }, [route])

    const displayText = title || route.name
    if (!canGoBack || main) {
        return (
            <SafeAreaView style={styles.header}>
                <Image source={logo} style={styles.logo} />
                <View style={styles.brand}>
                    <Title
                        numberOfLine={1}
                        darkTheme
                        font="title1"
                        style={{ textAlign: 'center' }}>
                        {displayText}
                    </Title>
                </View>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={styles.header}>
            <TouchableOpacity style={styles.goBack} onPress={navigation.goBack}>
                <Ionicons
                    name="chevron-back"
                    size={30}
                    color={iOSColors.white}
                />
                <Title darkTheme font="headline">
                    Back
                </Title>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

Navigation.propTypes = propTypes
const styles = StyleSheet.create({
    header: {
        position: 'relative',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        ...Theme.bg_rich_black,
    },
    brand: {
        flex: 1,
    },
    logo: {
        position: 'absolute',
        left: 0,
        top: 0,
        height: 60,
        width: 60,
        resizeMode: 'cover',
    },
    goBack: {
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
    },
})

export default Navigation
