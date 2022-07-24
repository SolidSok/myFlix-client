import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [
        {
          _id: 1,
          Title: 'Weathering with You',
          Description:
            'A young boy runs away to Tokyo and meets a girl who can control the weather.',
          ImagePath:
            'https://m.media-amazon.com/images/M/MV5BOTJlNTQ4OGUtODhlMy00NmNkLWI0NjctMWE0ZTc5N2EyZTA4XkEyXkFqcGdeQXVyMTM2ODk1OTQ@._V1_.jpg',
          Genre: 'Drama',
          Director: 'Makoto Shinkai',
        },
        {
          _id: 2,
          Title: 'Your Name.',
          Description:
            'Two strangers find themselves linked in a bizarre way. when a connection forms, will distance be the only thing to keep them apart?',
          ImagePath:
            'https://m.media-amazon.com/images/M/MV5BNGYyNmI3M2YtNzYzZS00OTViLTkxYjAtZDIyZmE1Y2U1ZmQ2XkEyXkFqcGdeQXVyMTA4NjE0NjEy._V1_.jpg',
          Genre: 'Drama',
          Director: 'Makoto Shinkai',
        },
        {
          _id: 3,
          Title: 'A Silent Voice',
          Description:
            'A young man is ostracized by his classmates after he bullies a deaf girl to the point where she moves away. Years later, he sets off on a path for redemption.',
          ImagePath:
            'https://m.media-amazon.com/images/M/MV5BZGRkOGMxYTUtZTBhYS00NzI3LWEzMDQtOWRhMmNjNjJjMzM4XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
          Genre: 'Drama',
          Director: 'Naoko Yamada',
        },
      ],
      selectedMovie: null,
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0)
      return <div className="main-view">The list is empty!</div>;

    return (
      <div className="main-view">
        {selectedMovie ? (
          <MovieView
            movie={selectedMovie}
            onBackClick={(newSelectedMovie) => {
              this.setSelectedMovie(newSelectedMovie);
            }}
          />
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onMovieClick={(movie) => {
                this.setSelectedMovie(movie);
              }}
            />
          ))
        )}
      </div>
    );
  }
}

export default MainView;
