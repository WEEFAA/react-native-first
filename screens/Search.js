import React, { useState, useMemo, useCallback } from 'react'
import { StyleSheet, useWindowDimensions, FlatList, View } from 'react-native'
import { Container } from '../components/Container'
import { Button } from './../components/Button'
import { Input } from '../components/Form'
import { movies, MOVIE_POSTER_HOST } from './../utils/axios'
import { Card } from '../components/Card'
import { Loading } from './../components/Loading'
import { Title } from './../components/Typography'

const Search = function (props) {
    const dimensions = useWindowDimensions()
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [isLoading, toggleLoading] = useState(false)
    const [text, setText] = useState('love sick')
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
        getData(text, 1)
    }, [text])

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
            const source = poster ? { uri } : require('./../assets/esom_adaptive_fore.png')
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
    const loading = isLoading && (
        <Loading noImage wrapperStyle={loadingWrapperStyle} />
    )
    return (
        <Container>
            <Input
                onChange={onChange}
                onSubmitEditing={onSubmit}
                value={text}
                autoFocus
                blurOnSubmit
                placeholder="Discover Movies">
                <Button
                    name="search"
                    onPress={onSubmit}
                    iconProps={{ size: 32 }}
                />
                {text !== '' && (
                    <Button
                        name="close"
                        onPress={cleanText}
                        iconProps={{ size: 32 }}
                    />
                )}
            </Input>
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
        </Container>
    )
}

const styles = StyleSheet.create({
    cardStyle: {
        marginBottom: 10,
        marginHorizontal: 5,
        padding: 0,
        flexBasis: '30%',
        flex: 0,
    },
    imageStyle: {
        borderRadius: 32,
        height: 180
    },
    resultsContainer: {
        alignItems: 'center'
    }
})

export default Search
