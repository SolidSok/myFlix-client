import React from 'react';
import { Row, Card, Button } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import './genre-view.scss';

export function GenreView(props) {
  const { genre, genreMovies, onBackClick } = props;

  return (
    <Card>
      <Card.Header>
        <h2>{genre.Name}</h2>
      </Card.Header>
      <Card.Body>
        <Card.Text>{genre.Description}</Card.Text>
        <h3>Movies in this Genre:</h3>
        <Row>
          {genreMovies.map(movie => (
            <MovieCard key={movie._id} movie={movie}>
              {movie.title}
            </MovieCard>
          ))}
        </Row>
        <Button
          variant="warning"
          onClick={() => {
            onBackClick();
          }}>
          Back
        </Button>
      </Card.Body>
    </Card>
  );
}
