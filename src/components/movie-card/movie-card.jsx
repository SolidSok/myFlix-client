import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Button, Card, Col } from 'react-bootstrap';

import { Link } from 'react-router-dom';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    const addFavorite = () => {
      axios
        .post(
          `https://sokflix.herokuapp.com/users/${username}/movies/${movie._id}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then(res => {
          alert(`${movie.Title} has been added to your favorites`);
        })
        .catch(err => console.log(err));
    };

    return (
      <Col md={6} lg={4} xl={3}>
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
            <Button
              variant="info"
              onClick={() => {
                addFavorite();
              }}>
              Add to favorites
            </Button>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birthday: PropTypes.string.isRequired,
    }).isRequired,
  }),
};
