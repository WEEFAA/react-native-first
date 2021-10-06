import 'allsettled-polyfill'
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Container } from './../components/Container'
import { movies, MOVIE_POSTER_HOST } from './../utils/axios'
import { Slider } from './../components/Slider'
import { ListSection } from './../components/Sections'
import { Text, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native'
import { Card } from './../components/Card'
import { Loading } from './../components/Loading'
import { RichBlack } from './../styles'

const styles = StyleSheet.create({
    others: {
        marginTop: 15,
        alignItems: 'center',
        paddingHorizontal: 7,
    },
})

const Home = function (props) {
    // loading
    const dimensions = useWindowDimensions()
    const [sliderLoading, toggleSliderLoading] = useState(true)
    const [othersLoading, toggleOthersLoading] = useState(true)
    // data
    const [topRated, setTopRated] = useState([])
    const [popular, setPopular] = useState([])
    const [nowPlaying, setNowPlaying] = useState([])
    const [upcoming, setUpcoming] = useState([])

    const fetchTopRated = useCallback(async () => {
        try {
            toggleSliderLoading(true)
            const resp = await movies.get('/movie/top_rated', {
                params: { page: 1 },
            })
            const { results } = resp.data
            toggleSliderLoading(false)
            setTopRated(results)
        } catch (e) {
            toggleSliderLoading(false)
        }
    }, [])

    const fetchOthers = useCallback(async () => {
        try {
            toggleOthersLoading(true)
            const promises = []
            // fetch other data
            const urls = {
                upcoming: '/movie/upcoming',
                now_playing: '/movie/now_playing',
                popular: '/movie/popular',
            }
            const setter = {
                [urls.upcoming]: setUpcoming,
                [urls.now_playing]: setNowPlaying,
                [urls.popular]: setPopular,
            }
            promises.push(movies.get(urls.upcoming, { params: { page: 1 } }))
            promises.push(movies.get(urls.now_playing, { params: { page: 1 } }))
            promises.push(movies.get(urls.popular, { params: { page: 1 } }))
            // handle
            const responses = await Promise.allSettled(promises)
            responses.forEach((response, index) => {
                if (response.status === 'fulfilled') {
                    const resp = response.value
                    const url = resp.config.url
                    const { results } = resp.data
                    if (setter[url]) {
                        setter[url](results)
                    }
                }
            })
            toggleOthersLoading(false)
        } catch (e) {
            console.error(e)
            toggleOthersLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchTopRated()
        fetchOthers()
    }, [])

    const renderCards = useMemo(() => {
        return ({ item }) => {
            const uri = `${MOVIE_POSTER_HOST}${item.poster_path}`
            const style = { marginRight: 10 }
            return (
                <Card item={item} source={{ uri }} wrapperStyle={style}>
                    <Text>Hello</Text>
                </Card>
            )
        }
    }, [])

    const wrapperStyle = { marginBottom: 20 }
    const loadingComponentHeight = { height: dimensions.height / 1.5 }
    const sliderMinHeight = useMemo(() => dimensions.height / 1.5, [dimensions])
    return (
        <Container bgColor={RichBlack}>
            <ScrollView>
                {sliderLoading ? (
                    <Loading wrapperStyle={loadingComponentHeight} />
                ) : (
                    <Slider
                        minHeight={sliderMinHeight}
                        images={topRated.map(
                            item => `${MOVIE_POSTER_HOST}${item.poster_path}`,
                        )}
                    />
                )}
                {othersLoading ? (
                    <Loading noImage wrapperStyle={loadingComponentHeight} />
                ) : (
                    <View style={styles.others}>
                        <ListSection
                            wrapperStyle={wrapperStyle}
                            title="Popular"
                            renderItem={renderCards}
                            data={popular}
                        />
                        <ListSection
                            wrapperStyle={wrapperStyle}
                            title="Now Playing"
                            renderItem={renderCards}
                            data={nowPlaying}
                        />
                        <ListSection
                            wrapperStyle={wrapperStyle}
                            title="Upcoming Movies"
                            renderItem={renderCards}
                            data={upcoming}
                        />
                    </View>
                )}
            </ScrollView>
        </Container>
    )
}

export default Home
