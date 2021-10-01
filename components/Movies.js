import React from 'react'
import { movies as MoviesApi, MOVIE_POSTER_HOST } from './../utils/axios'
import { Push } from './FlatList'
import { Text, View, StyleSheet, Image, Button, Alert } from 'react-native'
import Theme, { ShadowBlue } from './../styles'
import { Loading } from './Loading'
import { Container } from './Container'
import NAVS from './../navigations'

const PopularMovieContext = React.createContext({})

const styles = StyleSheet.create({
    itemsContainer: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 10,
        flexDirection: 'column',
    },
    // item container
    itemsWrapper: {
        flex: 1,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 8
    },
    // image
    imageWrapper: {
        width: '30%',
        height: 180,
        marginRight: 3,
    },
    itemImage: {
        width: '100%',
        height: '100%'
    },
    // information
    information: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    title: {
        fontSize: 24,
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
    },
    description: {
        minHeight: 30,
        fontSize: 16,
        marginBottom: 5
    },
    learnMore: {
        marginTop: 7
    }
    
})

const title = StyleSheet.compose(styles.title, Theme.text_rich_black)
const description = StyleSheet.compose(styles.description, Theme.text_rich_black)
const button = StyleSheet.compose(styles.learnMore, Theme.bg_prussian_blue)

export const PopularMovies = function(props){
    const [movies, setMovies] = React.useState([])
    const [loading, toggleLoading] = React.useState(false)
    const getMovies = async function(){
        try{
            toggleLoading(true)
            const resp = await MoviesApi.get('/movie/popular')
            const { results } = resp.data 
            setMovies(results)
            toggleLoading(false)
        }catch(e){
            toggleLoading(false)
        }
    }
    
    

    React.useEffect(() => {
        getMovies()
    },[])

    const state = { movies, loading }
    return <PopularMovieContext.Provider value={state}>
        <Container>
            { props.children }
        </Container>
    </PopularMovieContext.Provider>
}

export const Items = function(props){
    const state = React.useContext(PopularMovieContext)

    const onPressLearnMore = function(id){
        // redirect to details page
        return e => {
            props.navigation.navigate(NAVS.MOVIE_DETAIL, { id: id })
        }
    }

    const renderItem = ({ item }) => {
        return <View style={styles.item} key={item.id}>
            <View style={styles.imageWrapper}>
                <Image source={{uri: `${MOVIE_POSTER_HOST}${item.poster_path}`}} style={styles.itemImage}/>
            </View>
            <View style={styles.information}>
                <Text numberOfLines={1} style={title}>{item.title}</Text>
                <Text numberOfLines={2} style={description}>{item.overview || "No Description"}</Text>
                <Text>Votes: {item.vote_count}</Text>
                <Text>Popularity: {Math.ceil(item.popularity)}</Text>
                <Button
                    onPress={onPressLearnMore(item.id)}
                    title="Learn More"
                    style={button}
                    accessibilityLabel="Learn more about this movie"
                />
            </View>
        </View>
    }
    
    if(state.loading) return <Loading />
    
    return <View style={styles.itemsContainer}>
        <Push data={state.movies} renderItem={renderItem} style={styles.itemsWrapper}/>
    </View>
}