import React from 'react';
import { parse, format } from 'date-fns';
import { Movie } from '../../../types/movies-response';
import StarIcon from '../../assets/star.svg';
import StarFilledIcon from '../../assets/star-filled.svg';

import './movie-item.css';
import {
  useAddToFavourites,
  useRemoveFromFavourites,
} from '../../hooks/movies-hooks/movies-hooks';

const MovieItem: React.FC<{ movie: Movie; isFavourite?: boolean }> = ({
  movie,
  isFavourite,
}) => {
  const [addToFavourites, isAddToFavouritesLoading] = useAddToFavourites();
  const [removeFromFavourites, isRemoveFromFavouritesLoading] =
    useRemoveFromFavourites();
  return (
    <div className="MovieItem">
      <img src={movie.poster_path} className="MovieItem-poster" />
      <div className="MovieItem-titleAndOverview">
        <div className="MovieItem-title">{movie.title}</div>
        <div className="MovieItem-overview">{movie.overview}</div>
      </div>
      <div className="MovieItem-dateAndFavourite">
        <div>
          {format(
            parse(movie.release_date, 'yyyy-MM-dd', new Date()),
            'dd.MM.yyyy'
          )}
        </div>
        {isFavourite ? (
          <img
            src={StarFilledIcon}
            className="MovieItem-favourite"
            title="Remove from favourites"
            onClick={() => removeFromFavourites(movie)}
          />
        ) : (
          <img
            src={StarIcon}
            className="MovieItem-favourite"
            title="Add to favourites"
            onClick={() => addToFavourites(movie)}
          />
        )}
      </div>
    </div>
  );
};

export default MovieItem;
