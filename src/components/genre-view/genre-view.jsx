import React from 'react';
import PropTypes from 'prop-types';

import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import './genre-view.scss';

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;

    return (
      <Card>
        <Card.Header>{genre.Genre.Name}</Card.Header>
        <Card.Body>
          <Card.Text>{genre.Genre.Description}</Card.Text>
          <Card.Text>{genre.Genre.ImagePath}</Card.Text>
          <Button
            variant="warning"
            onClick={() => {
              onBackClick();
            }}
          >
            Back
          </Button>
        </Card.Body>
      </Card>
    );
  }
}
