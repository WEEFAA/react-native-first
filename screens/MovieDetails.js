import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Container } from './../components/Container';
import { movies, MOVIE_POSTER_HOST } from './../utils/axios';
import { Loading } from './../components/Loading';
import { Slider } from './../components/Slider';
import StarRating from 'react-native-star-rating'
import RATING from './../utils/rating'
import { constrain } from './../utils'
import {
    systemWeights,
    human,
    iOSColors,
    materialColors,
} from 'react-native-typography';

const styles = StyleSheet.create({
	center:{
		alignSelf: 'center',
		marginTop: 20,
		marginBottom: 10
	},
    container: {
        alignItems: 'flex-start',
        marginTop: 20,
    },
    titleContainer: {
        width: '100%',
        alignItems: 'flex-start',
        paddingHorizontal: 35,
    },
    titleText: {
        color: iOSColors.white,
        fontFamily: 'sans-serif',
        textAlign: 'center',
        width: '100%',
    },
    // genres
    genresContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '60%',
		alignSelf: 'center',
        justifyContent: 'space-evenly',
		marginTop: 9
    },
    genreItem: {
        marginBottom: 4,
        color: materialColors.whitePrimary,
    },
});

const TitleStyle = StyleSheet.flatten([
    human.title2,
    systemWeights.bold,
    styles.titleText,
    materialColors.whitePrimary,
]);

const genreStyle = StyleSheet.flatten([
	human.subhead,
	systemWeights.semibold,
	styles.genreItem
])

const MovieDetails = props => {
    const [data, setData] = useState({});
    const [loading, toggleLoading] = useState(true);
	const [rating, setRating] = useState(0)

    const information = useMemo(() => {
        const params = props.route.params;
        return params;
    }, [props.route]);

    const getInformation = useCallback(async () => {
        try {
            toggleLoading(true);
            const { id } = information || {};
            if (!id) {
                toggleLoading(false);
                return null;
            }
            const url = `/movie/${id}`;
            const response = await movies.get(url);
            toggleLoading(false);
			const data = response.data
			const rating = constrain(data.vote_count, RATING.MIN_ENTRY, RATING.MAX_ENTRY)
			setRating(rating)
            setData(data);
        } catch (e) {
            toggleLoading(false);
        }
    }, [information]);


    useEffect(() => {
        getInformation();
    }, [information]);

    if (loading) return <Loading noImage />;

    return (
        <Container bgColor={materialColors.blackPrimary}>
            <ScrollView>
                <Slider images={[`${MOVIE_POSTER_HOST}${data.poster_path}`]} />
                <Container noDefaultColor>
                    <View style={styles.container}>
                        <View style={styles.titleContainer}>
                            <Text style={TitleStyle}>{data.title}</Text>
                        </View>
                        <View style={styles.genresContainer}>
                            {data.genres && data.genres.map(genre => (
                                <Text style={genreStyle} key={genre.id}>
                                    {genre.name}
                                </Text>
                            ))}
                        </View>
						<StarRating
							containerStyle={styles.center}
							disabled={false}
							maxStars={5}
							rating={rating}
							halfStarColor={iOSColors.yellow}
							fullStarColor={iOSColors.yellow}
						/>
                    </View>
                </Container>
            </ScrollView>
        </Container>
    );
};

export default MovieDetails;
