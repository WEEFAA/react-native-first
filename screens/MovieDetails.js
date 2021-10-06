import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Modal } from 'react-native';
import { Container } from './../components/Container';
import { Details, Key, Value } from './../components/Detail';
import { movies, MOVIE_POSTER_HOST } from './../utils/axios';
import { Loading } from './../components/Loading';
import { Slider } from './../components/Slider';
import { Button } from './../components/Button';
import StarRating from 'react-native-star-rating';
import RATING from './../utils/rating';
import { constrain } from './../utils';
import dateformat from 'dateformat'
import { Title, HumanBody } from './../components/Typography'
import { Video } from './../components/Video'
import {
    iOSColors,
    materialColors,
} from 'react-native-typography';

const MovieDetails = props => {
    const [showModal, setShowModal] = useState(false)
    const [data, setData] = useState({});
    const [loading, toggleLoading] = useState(true);
    const [rating, setRating] = useState(0);

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
            const data = response.data;
            const rating = constrain(
                data.vote_average,
                RATING.MIN_ENTRY,
                RATING.MAX_ENTRY,
            );
            setRating(rating);
            setData(data);
        } catch (e) {
            toggleLoading(false);
        }
    }, [information]);

	const onPlay = useCallback(index => {
        setShowModal(current => !current)
	},[])

    useEffect(() => {
        getInformation();
    }, [information]);

    if (loading) return <Loading noImage />;

    return (
        <Container bgColor={materialColors.blackPrimary}>
            <ScrollView>
                <Slider images={[`${MOVIE_POSTER_HOST}${data.poster_path}`]} onCurrentImagePressed={onPlay}>
                    {slider => (
                        <Button
                            name="play-circle"
                            onPress={slider.pressHandler}
                            iconProps={{ color: iOSColors.midGray }}
                        />
                    )}
                </Slider>
                <Container noDefaultColor>
                    <View style={styles.container}>
                        <View style={styles.titleContainer}>
                            <Title darkTheme font="title1" style={styles.titleText}>{data.title}</Title>
                        </View>
                        <View style={styles.genresContainer}>
                            {data.genres &&
                                data.genres.map(genre => (
                                    <HumanBody font="footnote"  style={styles.genreItem} key={genre.id}>
                                        {genre.name}
                                    </HumanBody >
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
						<View style={styles.bodyContainer}>
							<HumanBody darkTheme>{data.overview}</HumanBody>
						</View>
						<Container noDefaultColor style={{marginTop: 20, paddingHorizontal: 3}}>
							<Details borderStyle="dashed">
								<Key><HumanBody darkTheme>Release Date:</HumanBody></Key>
								<Value>
									<HumanBody darkTheme>{dateformat(data.release_date, 'mediumDate')}</HumanBody>
								</Value>
								<Key><HumanBody darkTheme>Status:</HumanBody></Key>
								<Value>
									<HumanBody darkTheme>{data.status}</HumanBody>
								</Value>
								<Key><HumanBody darkTheme>Revenue:</HumanBody></Key>
								<Value>
									<HumanBody darkTheme>{data.revenue}</HumanBody>
								</Value>
								<Key><HumanBody darkTheme>Runtime (in minutes):</HumanBody></Key>
								<Value>
									<HumanBody darkTheme>{data.runtime}</HumanBody>
								</Value>
								<Key><HumanBody darkTheme>18+:</HumanBody></Key>
								<Value>
									<HumanBody darkTheme>{data.adult ? "YES" : "NO"}</HumanBody>
								</Value>
								<Key><HumanBody darkTheme>Budget:</HumanBody></Key>
								<Value>
									<HumanBody darkTheme>{data.budget}</HumanBody>
								</Value>
							</Details>
						</Container>
                    </View>
                </Container>
            </ScrollView>
            <VideoModal visible={showModal} close={onPlay} onRequestClose={onPlay} />
        </Container>
    );
};

function VideoModal({ close, ...props}){
    return <Modal transparent animationType="fade" {...props}>
        <Video source={{uri: 'https://player.vimeo.com/external/434945712.sd.mp4?s=433fbe2cba95823e978d76d17ad03ec4f001bd55&profile_id=165&oauth2_token_id=57447761'}}/>
    </Modal>
}

const styles = StyleSheet.create({
    center: {
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    container: {
        alignItems: 'flex-start',
        marginTop: 20,
		paddingBottom: 40
    },
    titleContainer: {
        width: '100%',
        paddingHorizontal: 35,
		flexDirection: 'row',
    },
    titleText: {
		flex: 1,
        textAlign: 'center',
    },
    // genres
    genresContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '60%',
        alignSelf: 'center',
        justifyContent: 'space-evenly',
        marginTop: 9,
    },
    genreItem: {
        marginBottom: 4,
        color: materialColors.whitePrimary,
    },
	// body
	bodyContainer: {
		paddingLeft: 13,
		paddingRight: 5,
	}
});

export default MovieDetails;
