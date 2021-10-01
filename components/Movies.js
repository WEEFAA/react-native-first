import React from 'react'
import { movies as MoviesApi, MOVIE_POSTER_HOST } from './../utils/axios'
import { Push } from './FlatList'
import { Text, View, StyleSheet, Image } from 'react-native'
import { EggShell, RichBlack } from './../styles'

const MoviesContext = React.createContext({})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: EggShell
    },
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
        color: RichBlack
    },
    description: {
        minHeight: 30,
        fontSize: 16,
        marginBottom: 5
    }
    
})

const Movies = function(props){
    const [movies, setMovies] = React.useState([])
    
    const getMovies = async function(){
        try{
            const resp = await MoviesApi.get('/movie/popular')
            const { results } = resp.data 
            setMovies(results)
        }catch(e){
            console.log(e.message)
        }
    }
    
    

    React.useEffect(() => {
        getMovies()
    },[])

    const state = { movies }
    return <MoviesContext.Provider value={state}>
        <View style={styles.container}>
            { props.children }
        </View>
    </MoviesContext.Provider>
}

export const Items = function(props){
    const state = React.useContext(MoviesContext)
    
    const renderItem = ({ item }) => {
        return <View style={styles.item}>
            <View style={styles.imageWrapper}>
                <Image source={{uri: `${MOVIE_POSTER_HOST}${item.poster_path}`}} style={styles.itemImage}/>
            </View>
            <View style={styles.information}>
                <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
                <Text numberOfLines={2} style={styles.description}>{item.overview || "No Description"}</Text>
                <Text>Votes: {item.vote_count}</Text>
                <Text>Popularity: {Math.ceil(item.popularity)}</Text>
            </View>
        </View>
    }

    return <View style={styles.itemsContainer}>
        <Push data={state.movies} renderItem={renderItem} style={styles.itemsWrapper}/>
    </View>
}

export default Movies