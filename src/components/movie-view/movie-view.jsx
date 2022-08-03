import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './movie-view.scss';

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;
    if (!movie) return <div></div>;
    return (
      <Card>
        <div className="movie-view">
          <Card.Img
            variant="top"
            crossOrigin="anonymous"
            src={movie.ImagePath}
          />
          <div className="movie-title">
            <span className="label">Title: </span>
            <span className="value">{movie.Title}</span>
          </div>
          <div className="movie-description">
            <span className="label">Description: </span>
          </div>
          <div>
            <span className="value">{movie.Description}</span>
          </div>
          <div className="movie-genre">
            <span className="label">Genre: </span>{' '}
            <Link to={`genres/${movie.Genre.Name}`}>
              <Button variant="link">{movie.Genre.Name}</Button>
            </Link>
          </div>
          <div className="movie-director">
            <span className="label">Director: </span>
            <Link to={`directors/${movie.Director.Name}`}>
              <Button variant="link">{movie.Director.Name}</Button>
            </Link>
          </div>

          <Button
            onClick={() => {
              onBackClick(null);
            }}>
            Back
          </Button>
        </div>
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
