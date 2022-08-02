import React from 'react';
import { Row, Card, Button } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import './genre-view.scss';

export class GenreView extends React.Component {
  constructor() {
    super();
    this.state;
  }
  render() {
    const { genre, genreMovies, onBackClick } = this.props;

    return (
      <Card>
        <Card.Header>{genre.Name}</Card.Header>
        <Card.Body>
          <Card.Text>{genre.Description}</Card.Text>
          <Row>
            {genreMovies.map(movie => (
              <MovieCard key={movie._id} movie={movie}>
                {movie.Title}
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
}
