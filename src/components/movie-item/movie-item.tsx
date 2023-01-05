import React from 'react';
import classnames from 'classnames';
import { parse, format } from 'date-fns';
import {
  useAddToFavourites,
  useRemoveFromFavourites,
} from '../../hooks/movies-hooks/movies-hooks';
import { Movie } from '../../types/movies-response';
import StarIcon from '../../assets/star.svg';
import StarFilledIcon from '../../assets/star-filled.svg';

import './movie-item.css';

const MovieItem: React.FC<{
  movie: Movie;
  isFavourite?: boolean;
  className?: string;
}> = ({ movie, isFavourite, className }) => {
  const [addToFavourites, isAddToFavouritesLoading] = useAddToFavourites();
  const [removeFromFavourites, isRemoveFromFavouritesLoading] =
    useRemoveFromFavourites();
  return (
    <div
      className={classnames('MovieItem', className)}
      data-testid={`MovieItem-${movie.id}`}
    >
      <img
        src={movie.poster_path}
        className="MovieItem-poster"
        alt="movie poster"
      />
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
            onClick={
              isRemoveFromFavouritesLoading
                ? undefined
                : () => removeFromFavourites(movie)
            }
            alt="Remove from favourites"
          />
        ) : (
          <img
            src={StarIcon}
            className="MovieItem-favourite"
            title="Add to favourites"
            onClick={
              isAddToFavouritesLoading
                ? undefined
                : () => addToFavourites(movie)
            }
            alt="Add to favourites"
          />
        )}
      </div>
    </div>
  );
};

export default MovieItem;
