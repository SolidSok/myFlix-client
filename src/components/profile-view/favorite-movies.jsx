import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Container, Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const FavoriteMoviesCard = props => {
  const { username, token } = props;
  const removeMovie = () => {
    axios
      .delete(
        `https://sokflix.herokuapp.com/users/${username}/movies/${props.movie._id}`,

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(res => {
        console.log('Movie has been removed from favorites');
        window.open(`/users/${username}`, '_self');
      })
      .catch(err => console.log(err));
  };
  return (
    <Container>
      <Card>
        <Link to={`/movies/${props.movie._id}`}>
          <Card.Img
            className="moviecardPoster"
            variant="top"
            crossOrigin="anonymous"
            src={props.movie.ImagePath}
          />
        </Link>
        <Card.Body>
          <Card.Title>{props.movie.Title}</Card.Title>
          <Card.Text>{props.movie.Description}</Card.Text>
          <Link to={`/movies/${props.movie._id}`}>
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
    </Container>
  );
};
FavoriteMoviesCard.propTypes = {
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
