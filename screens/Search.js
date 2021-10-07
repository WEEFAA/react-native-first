import React, { useState, useMemo, useCallback } from 'react'
import ErrorBoundary from '../components/Error'
import { StyleSheet, useWindowDimensions, FlatList } from 'react-native'
import { Container } from '../components/Container'
import { Button } from './../components/Button'
import { Input } from '../components/Form'
import { movies, MOVIE_POSTER_HOST } from './../utils/axios'
import { Card } from '../components/Card'
import { Loading } from './../components/Loading'
import { RichBlack, EggShell } from './../styles'
import { iOSColors } from 'react-native-typography'

const Search = function (props) {
    const dimensions = useWindowDimensions()
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [isLoading, toggleLoading] = useState(false)
    const [text, setText] = useState('')
    const [items, setItems] = useState([])
    const [lastQuery, setLastQuery] = useState(null)

    const getData = useCallback(
        async function (query, currentPage = 1) {
            try {
                toggleLoading(true)
                const url = `/search/movie`
                const response = await movies.get(url, {
                    params: {
                        query: query,
                        page: currentPage,
                    },
                })
                const data = response.data
                const { results, total_results } = data
                setTotal(total_results)
                setItems(currentItems => [...currentItems, ...results])
                setPage(currentPage)
                setLastQuery(query)
                toggleLoading(false)
            } catch (e) {
                toggleLoading(false)
            }
        },
        [setTotal, setItems, setPage, setLastQuery, toggleLoading, items],
    )

    const onSubmit = useCallback(async () => {
        let currentQuery = text
        if(lastQuery !== currentQuery) setItems([])
        getData(currentQuery, 1)
    }, [text, lastQuery])

    const onChange = useCallback(
        ({ nativeEvent }) => {
            setText(nativeEvent.text)
        },
        [setText],
    )

    const renderCards = useMemo(() => {
        return ({ item }) => {
            const poster = 'poster_path' in item && item.poster_path
            const uri = `${MOVIE_POSTER_HOST}${item.poster_path}`
            const source = poster
                ? { uri }
                : require('./../assets/esom_adaptive_fore.png')
            return (
                <Card
                    resizeMode="cover"
                    style={styles.imageStyle}
                    item={item}
                    source={source}
                    wrapperStyle={styles.cardStyle}
                />
            )
        }
    }, [])

    const cleanText = useCallback(() => {
        setItems([])
        setText('')
        setPage(1)
        toggleLoading(false)
    }, [])

    const getMoreData = useCallback(() => {
        // get more data if user is at the bottom
        // and not currently fetching any data
        if (!isLoading) {
            if (items.length >= total) return
            const currentPage = page
            const nextPage = currentPage + 1
            getData(lastQuery, nextPage)
        }
    }, [isLoading, onSubmit, page, lastQuery, total, items])

    const keyExtractor = useCallback((item, index) => `${item.id}-${index}`, [])
    const loadingWrapperStyle = { minHeight: dimensions.height / 2 }
    const initialLoad = items.length === 0 && isLoading
    const loading = isLoading && (
        <Loading noImage wrapperStyle={loadingWrapperStyle} />
    )

    const iconProps = useMemo(() => ({ size: 32, color: iOSColors.white }), [])
    return (
        <Container bgColor={RichBlack}>
            <Input
                onChange={onChange}
                onSubmitEditing={onSubmit}
                value={text}
                autoFocus
                blurOnSubmit
                color={iOSColors.white}
                placeholderTextColor={iOSColors.white}
                style={styles.input}
                placeholder="Discover Movies">
                <Button
                    name="search"
                    onPress={onSubmit}
                    iconProps={iconProps}
                />
                {text !== '' && (
                    <Button
                        name="close"
                        onPress={cleanText}
                        iconProps={iconProps}
                    />
                )}
            </Input>
            <ErrorBoundary
                darkTheme
                bgColor="transparent"
                style={styles.errorBound}
                title="Sorry"
                description="Cannot render search results properly.">
                <React.Fragment>
                    { initialLoad && loading }
                    {items.length > 0 && (
                        <FlatList
                            renderItem={renderCards}
                            data={items}
                            numColumns={3}
                            horizontal={false}
                            keyExtractor={keyExtractor}
                            ListFooterComponent={loading}
                            onEndReached={getMoreData}
                            onEndReachedThreshold={0.1}
                            contentContainerStyle={styles.resultsContainer}
                        />
                    )}
                </React.Fragment>
            </ErrorBoundary>
        </Container>
    )
}

const styles = StyleSheet.create({
    errorBound: {
        flex: 1,
    },
    cardStyle: {
        marginBottom: 10,
        marginHorizontal: 5,
        padding: 0,
        flexBasis: '30%',
        flex: 0,
    },
    imageStyle: {
        borderRadius: 32,
        height: 180,
    },
    resultsContainer: {
        alignItems: 'center',
    },
    input: {
        borderColor: EggShell
    }
})

export default Search
