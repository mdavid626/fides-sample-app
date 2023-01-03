import React from 'react';
import { parse, format } from 'date-fns';
import { Movie } from '../../../types/movies-response';

import './movie-item.css';

const MovieItem: React.FC<{ movie: Movie }> = ({ movie }) => (
  <div className="MovieItem">
    <img src={movie.poster_path} width={200} />
    <div className="MovieItem-titleAndOverview">
      <div className="MovieItem-title">{movie.title}</div>
      <div className="MovieItem-overview">{movie.overview}</div>
    </div>
    <div>
      {format(
        parse(movie.release_date, 'yyyy-MM-dd', new Date()),
        'dd.MM.yyyy'
      )}
    </div>
  </div>
);

export default MovieItem;
