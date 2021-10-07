import React, { useState } from 'react'
import ErrorBoundary from '../components/Error'
import { Movies, Items } from './../components/Movies'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    errorBound: {
        flex: 1
    }
})
const PopularMovies = props => {
	const [endpoint] = useState('/movie/popular')
    return (
        <ErrorBoundary
            darkTheme
            bgColor="transparent"
            style={styles.errorBound}
            title="Sorry"
            description="Cannot render movies properly.">
            <Movies endpoint={endpoint}>
                <Items />
            </Movies>
        </ErrorBoundary>
    )
}

export default PopularMovies
