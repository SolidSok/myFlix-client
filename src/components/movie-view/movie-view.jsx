import React from 'React';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './movie-view.scss';

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;
    return (
      <Row>
        <Col>
          <div className="movie-view">
            <div className="movie-poster">
              <img crossOrigin="anonymous" src={movie.ImagePath} />
            </div>
            <div className="movie-title">
              <span className="label">Title: </span>
              <span className="value">{movie.Title}</span>
            </div>
            <div className="movie-description">
              <span className="label">Description: </span>
              <span className="value">{movie.Description}</span>
            </div>
            <div className="movie-genre">
              <span className="label">Genre: </span>{' '}
              <Link to={`movies/genres/${movie.Genre.Name}`}>
                <Button variant="link">{movie.Genre.Name}</Button>
              </Link>
            </div>
            <div className="movie-director">
              <span className="label">Director: </span>
              <Link to={`movies/directors/${movie.Director.Name}`}>
                <Button variant="link">{movie.Director.Name}</Button>
              </Link>
            </div>

            <Button
              onClick={() => {
                onBackClick(null);
              }}
            >
              Back
            </Button>
          </div>
        </Col>
      </Row>
    );
  }
}
MovieView.propTypes = {
  movie: PropTypes.shape({
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
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
};
