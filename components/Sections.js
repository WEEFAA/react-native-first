import React, { useMemo } from 'react'
import { View, StyleSheet, Text, FlatList } from 'react-native'
import Theme, { BlackCoral } from './../styles'
import { material, iOSColors } from 'react-native-typography'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
    container: {
        height: 'auto',
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 5,
        // corners
        borderRadius: 5,
        // shadow
        backgroundColor: iOSColors.black,
    },
    // header
    sectionHeaderContainer: {
        width: '100%',
        minHeight: 35,
        marginBottom: 3,
        justifyContent: 'center',
    },
})

const header = StyleSheet.flatten([material.titleWhite])
const container = StyleSheet.compose(
    styles.container,
    Theme.shadow1(BlackCoral),
)

const listSectionTypes = {
    wrapperStyle: PropTypes.object,
    title: PropTypes.string,
    renderItem: PropTypes.func.isRequired,
}

export const ListSection = function (props) {
    const renderItem = useMemo(() => {
        return ({ item }) => {
            return <Text>{item}</Text>
        }
    }, [])

    return (
        <View style={StyleSheet.compose(container, props.wrapperStyle)}>
            {props.title && (
                <View style={styles.sectionHeaderContainer}>
                    <Text numberOfLines={1} style={header}>
                        {props.title}
                    </Text>
                </View>
            )}
            <FlatList horizontal renderItem={renderItem} {...props} />
        </View>
    )
}

ListSection.propTypes = listSectionTypes
