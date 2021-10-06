import React, { useState, useMemo, useCallback } from 'react'
import { StyleSheet, useWindowDimensions } from 'react-native'
import { Container } from '../components/Container'
import { Button } from './../components/Button'
import { Input } from '../components/Form'
import { movies, MOVIE_POSTER_HOST } from './../utils/axios'
import { ListSection } from './../components/Sections'
import { Card } from '../components/Card'
import { Loading } from './../components/Loading'

const Search = function (props) {
    const dimensions = useWindowDimensions()
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [isLoading, toggleLoading] = useState(false)
    const [text, setText] = useState('')
    const [items, setItems] = useState([])
    const [lastQuery, setLastQuery] = useState(null)

    const getData = useCallback(async function(query, currentPage = 1){
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
            setItems([...items, ...results])
            setPage(currentPage)
            setLastQuery(query)
            toggleLoading(false)
        } catch (e) {
            toggleLoading(false)
        }
    },[setTotal, setItems, setPage, setLastQuery, toggleLoading, items])
    
    const onSubmit = useCallback(async () => {
        getData(text)
    }, [text])

    const onEnter = useCallback(() => {
        getData(text)
    }, [text])

    const onChange = useCallback(
        ({ nativeEvent }) => {
            setText(nativeEvent.text)
        },
        [setText],
    )

    const renderCards = useMemo(() => {
        return ({ item }) => {
            const uri = `${MOVIE_POSTER_HOST}${item.poster_path}`
            return (
                <Card
                    resizeMode="stretch"
                    style={styles.imageStyle}
                    item={item}
                    source={{ uri }}
                    wrapperStyle={styles.cardStyle}
                />
            )
        }
    }, [])

    const cleanText = useCallback(() => {
        setItems([])
        setText('')
    }, [])

    const getMoreData = useCallback(() => {
        // get more data if user is at the bottom
        // and not currently fetching any data
        if(!isLoading){
            const currentPage = page
            const nextPage = currentPage + 1 
            onSubmit(lastQuery, nextPage)
        }
    },[isLoading, onSubmit, page, lastQuery])

    const keyExtractor = useCallback((item, index) => `${item.id}-${index}`, [])
    const loadingWrapperStyle = { minHeight: dimensions.height / 2.2 }
    const loading = isLoading && <Loading noImage wrapperStyle={loadingWrapperStyle} />
    return (
        <Container>
            <Input
                onChange={onChange}
                onSubmitEditing={onEnter}
                value={text}
                autoFocus
                blurOnSubmit
                placeholder="Discover Movies or TV Shows">
                <Button
                    name="search"
                    onPress={onSubmit}
                    iconProps={{ size: 32 }}
                />
                { text !== '' && <Button
                    name="close"
                    onPress={cleanText}
                    iconProps={{ size: 32 }}
                /> }
            </Input>
            {!isLoading && items.length > 0 && (
                <ListSection
                    wrapperStyle={styles.wrapperStyle}
                    renderItem={renderCards}
                    data={items}
                    numColumns={3}
                    horizontal={false}
                    keyExtractor={keyExtractor}
                    ListFooterComponent={loading}
                    onEndReached={getMoreData}
                    onEndReachedThreshold={0.2}
                />
            )}
        </Container>
    )
}

const styles = StyleSheet.create({
    wrapperStyle: {
        backgroundColor: 'transparent',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        elevation: 0,
        flex: 1,
    },
    cardStyle: { 
        marginBottom: 10,
        marginHorizontal: 5,
        padding: 0,
        flexBasis: "30%"
    },  
    imageStyle: {
        borderRadius: 32
    }
})

export default Search
