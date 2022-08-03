import React from 'react';

import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import './director-view.scss';

export class DirectorView extends React.Component {
  constructor() {
    super();
    this.state;
  }
  render() {
    const { director, directorMovies, onBackClick } = this.props;

    return (
      <Card>
        <Card.Header>{director.Name}</Card.Header>
        <Card.Body>
          <Card.Text>{director.Bio}</Card.Text>

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
}
