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
              <h2>
                <span className="label">Title: </span>
                <span className="value">{movie.Title}</span>
              </h2>
            </Card.Title>
            <div className="movie-description">
              <h5>
                <span className="label">Description: </span>
              </h5>
            </div>
            <div>
              <span className="value">{movie.Description}</span>
            </div>
            <div className="movie-genre">
              <h5>
                <span className="label">Genre: </span>
              </h5>
              <Link to={`/genres/${movie.Genre.Name}`}>
                <Button variant="dark">{movie.Genre.Name}</Button>
              </Link>
            </div>
            <div className="movie-director">
              <h5>
                <span className="label">Director: </span>
              </h5>
              <Link to={`/directors/${movie.Director.Name}`}>
                <Button variant="dark">{movie.Director.Name}</Button>
              </Link>
            </div>
            <br />
            <div>
              <Button
                variant="warning"
                onClick={() => {
                  onBackClick(null);
                }}>
                Back
              </Button>
            </div>
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
