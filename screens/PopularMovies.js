import React, { useEffect, useState } from 'react'
import { Movies, Items } from './../components/Movies'

const PopularMovies = props => {
	const [endpoint, setEndpoint] = useState('/movie/popular')
    return (
        <Movies endpoint={endpoint}>
            <Items />
        </Movies>
    )
}

export default PopularMovies
