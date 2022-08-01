import React from 'react';

import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import './director-view.scss';

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;

    return (
      <Card>
        <Card.Header>{director.Name}</Card.Header>
        <Card.Body>
          <Card.Text>{director.Bio}</Card.Text>
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
