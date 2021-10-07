import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types'
import { useNavigation } from '@react-navigation/native'
import { Push } from './FlatList';
import { movies as MoviesApi, MOVIE_POSTER_HOST } from './../utils/axios';
import { View, StyleSheet, Image, useWindowDimensions, TouchableOpacity } from 'react-native';
import { Loading } from './Loading';
import { Container } from './Container';
import { Title, HumanBody } from './Typography'
import { Details, Key, Value } from './Detail'
import NAVS from './../navigations';
import { systemWeights } from 'react-native-typography';

const MoviesContext = React.createContext({});

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
        marginBottom: 8,
    },
    // image
    imageWrapper: {
        width: '30%',
        height: 180,
        marginRight: 3,
    },
    itemImage: {
        width: '100%',
        height: '100%',
    },
    // information
    informationWrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    information: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    title: {
        fontSize: 24,
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
    },
    description: {
        minHeight: 30,
        fontSize: 16,
        marginBottom: 5,
    },
    learnMoreWrapper: {
        width: '50%',
    },
    detailStyle: {
        borderWidth: 0, 
        width: '80%', 
        paddingLeft: 0
    }
});

const moviesPropTypes = {
    endpoint: PropTypes.string.isRequired
}

const moviesDefaultProps = {
    endpoint: "/movie/popular"
}

export const Movies = function ({endpoint, ...props}) {
    const [movies, setMovies] = React.useState([]);
    const [loading, toggleLoading] = React.useState(false);
    const [page, setPage] = React.useState(1)

    const getMovies = useCallback(async function (currentPage = 1, currentItems = []) {
        try {
            toggleLoading(true);
            const params = { page: currentPage }
            const resp = await MoviesApi.get(endpoint, { params });
            const { results } = resp.data;
            setMovies([...currentItems, ...results]);
            setPage(currentPage)
            toggleLoading(false);
        } catch (e) {
            toggleLoading(false);
        }
    },[endpoint])

    
    React.useEffect(() => {
        setPage(1)
        setMovies([]);
        toggleLoading(false)
        getMovies()
    }, [endpoint]);
    
    const state = React.useMemo(() => {
        return {
            movies,
            loading,
            getMovies,
            page,
            endpoint
        };
    }, [loading, movies, getMovies, page, endpoint]);

    return (
        <MoviesContext.Provider value={state}>
            <Container>{props.children}</Container>
        </MoviesContext.Provider>
    );
};

const itemPropTypes = {

}

export const Items = function (props) {
    const dimensions = useWindowDimensions()
    const navigation = useNavigation()
    const state = React.useContext(MoviesContext);

    const onPressLearnMore = useCallback(function (id, title) {
        // redirect to details page
        return e => {
            navigation.navigate(NAVS.MOVIE_DETAIL, { id, title });
        };
    },[navigation])
    
    const renderItem = React.useMemo(() => {
        return ({ item }) => {
            return (
                <View style={styles.item} key={item.id}>
                    <View style={styles.imageWrapper}>
                        <TouchableOpacity onPress={onPressLearnMore(item.id, item.title)}>
                            <Image
                                source={{
                                    uri: `${MOVIE_POSTER_HOST}${item.poster_path}`,
                                }}
                                style={styles.itemImage}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.informationWrapper}>
                        <View style={styles.information}>
                            <Title numberOfLines={1}>
                                {item.title}
                            </Title>
                            <HumanBody weight={systemWeights.regular} numberOfLines={2}>
                                {item.overview || 'No Description'}
                            </HumanBody>
                            <Details style={styles.detailStyle}>
                                <Key>
                                    <Title font="headline">Votes: </Title>
                                </Key>
                                <Value><HumanBody>{item.vote_count}</HumanBody></Value>
                                <Key>
                                    <Title font="headline">Popularity:</Title>
                                </Key>
                                <Value><HumanBody>{Math.ceil(item.popularity)}</HumanBody></Value>
                            </Details>
                        </View>
                    </View>
                </View>
            );
        };
    }, []);

    const getMoreData = useCallback(() => {
        // get more data if user is at the bottom
        // and not currently fetching any data
        if(!state.loading){
            const currentPage = state.page
            const nextPage = currentPage + 1 
            state.getMovies(nextPage, state.movies)
        }
    },[state.loading, state.getMovies, state.page, state.movies])

    const keyExtractor = useCallback((item, index) => `${item.id}-${index}`, [])

    const loadingWrapperStyle = { minHeight: dimensions.height / 2.2 }
    const loading = state.loading && <Loading noImage wrapperStyle={loadingWrapperStyle} />
    return (
        <View style={styles.itemsContainer}>
            <Push
                data={state.movies}
                renderItem={renderItem}
                style={styles.itemsWrapper}
                onEndReached={getMoreData}
                onEndReachedThreshold={1}
                keyExtractor={keyExtractor}
                ListFooterComponent={loading}
            />

        </View>
    );
};

Movies.propTypes = moviesPropTypes
Movies.defaultProps = moviesDefaultProps
Items.propTypes = itemPropTypes
