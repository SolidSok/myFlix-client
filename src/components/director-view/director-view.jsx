import React from 'react';

import { Card, Row, Button } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import './director-view.scss';

export function DirectorView(props) {
  const { director, directorMovies, onBackClick } = props;

  return (
    <Card>
      <Card.Header>
        <h2>{director.Name}</h2>
      </Card.Header>
      <Card.Body>
        <Card.Text>{director.Bio}</Card.Text>
        <h2>Movies by this director:</h2>

        <Row>
          {' '}
          {directorMovies.map(movie => (
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
