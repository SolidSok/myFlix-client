import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './movie-view.scss';

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;
    if (!movie) return <div></div>;
    return (
      <Card>
        <Stack gap={1}>
          <div className="movie-view">
            <Card.Img
              variant="top"
              crossOrigin="anonymous"
              src={movie.ImagePath}
            />

            <Card.Title className="movie-title">
              <span className="label">Title: </span>
              <span className="value">{movie.Title}</span>
            </Card.Title>
            <div className="movie-description">
              <span className="label">Description: </span>
            </div>
            <div>
              <span className="value">{movie.Description}</span>
            </div>
            <div className="movie-genre">
              <span className="label">Genre: </span>{' '}
              <Link to={`/genres/${movie.Genre.Name}`}>
                <Button variant="info">{movie.Genre.Name}</Button>
              </Link>
            </div>
            <div className="movie-director">
              <span className="label">Director: </span>
              <Link to={`/directors/${movie.Director.Name}`}>
                <Button variant="outline-info">{movie.Director.Name}</Button>
              </Link>
            </div>

            <Button
              variant="warning"
              onClick={() => {
                onBackClick(null);
              }}>
              Back
            </Button>
          </div>
        </Stack>
      </Card>
    );
  }
}
MovieView.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birthday: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
