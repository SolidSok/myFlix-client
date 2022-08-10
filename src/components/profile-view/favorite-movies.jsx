import React from 'react';
import axios from 'axios';

import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class FavoriteMoviesView extends React.Component {
  render() {
    const { movie } = this.props;
    const username = localStorage.getItem('user');
    const favorites = [localStorage.getItem('favorites')];

    const removeMovie = () => {
      axios
        .delete(
          `https://sokflix.herokuapp.com/users/${username}/movies/${movie._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then(res => {
          alert('Movie has been added to favorites');
          window.open('/', '_self');
        })
        .catch(err => console.log(err));
    };
    if (favorites.length === 0) {
      return (
        <div className="favorite-view">
          <Card.Title>
            <h2>Favorite Movies:</h2>
          </Card.Title>
          No movies have been added to your Favorites
        </div>
      );
    }
    return (
      <Col md={6} lg={4} xl={3}>
        <Row>
          <h2>Favorite Movies:</h2>
        </Row>
        <Card>
          <Link to={`/movies/${movie._id}`}>
            <Card.Img
              className="moviecardPoster"
              variant="top"
              crossOrigin="anonymous"
              src={movie.ImagePath}
            />
          </Link>
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
            <Link to={`/movies/${movie._id}`}>
              <Button variant="link">Open</Button>
            </Link>
          </Card.Body>
          <Button
            variant="warning"
            onClick={() => {
              removeMovie();
            }}>
            Remove from Favorites
          </Button>
        </Card>
      </Col>
    );
  }
}
