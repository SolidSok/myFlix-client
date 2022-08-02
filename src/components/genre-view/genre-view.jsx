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
