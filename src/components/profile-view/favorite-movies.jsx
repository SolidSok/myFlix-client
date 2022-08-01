import React from 'react';
import { Link } from 'react-router-dom';

export function FavoriteMovies({ favoriteMovieList }) {
  if (favoriteMovieList.length === 0) {
    return <p>You have no favorite movies added yet</p>;
  }
  return (
    <div>
      <h2>Favorite Movies</h2>
      {favoriteMovieList.map((movies) => {
        return (
          <div key={movies._id}>
            <img crossOrigin="anonymous" src={movies.ImagePath} />
            <Link to={`/movies/${movies._id}`}>
              <h4>{movies.Title}</h4>
            </Link>
            <button variant="secondary" onClick={() => removeFav(movies._id)}>
              Remove from list
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default FavoriteMovies;
