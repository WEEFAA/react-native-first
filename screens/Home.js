import React, { useState, useEffect, useCallback } from 'react'
import { Container } from './../components/Container'
import { movies, MOVIE_POSTER_HOST } from './../utils/axios'
import { Slider } from "./../components/Slider";
import Theme from './../styles'


const Home = function(props){
    const [popular, setPopular] = useState([])

    const fetchPopular = useCallback(async () => {
        try {
            const resp = await movies.get('/movie/popular',{ params: { page: 1 }});
            const { results } = resp.data;
            setPopular(results);
        } catch (e) {}
    },[])

    useEffect(() => {
        fetchPopular()
    },[])
    
    return <Container bgColor={Theme.bg_rich_black}>
        <Slider images={popular.map(item => `${MOVIE_POSTER_HOST}${item.poster_path}`)}/>
    </Container> 
}

export default Home