import React from 'react';
import {PopularMovies, Items} from './../components/Movies';

export default props => {
  return (
    <PopularMovies {...props}>
      <Items />
    </PopularMovies>
  );
};
