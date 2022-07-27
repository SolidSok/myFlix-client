import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardGroup,
  Form,
} from 'react-bootstrap';

import './registration-view.scss';

import PropTypes from 'prop-types';
import axios from 'axios';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('https://sokflix.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self');
      })
      .catch((e) => {
        console.log('error registering the user');
        alert("Something wasn't entered correctly");
      });
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Register below</Card.Title>
                <Form>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      placeholder="Enter a username"
                    />
                  </Form.Group>

                  <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Enter a password with 8 or more characters"
                    />
                  </Form.Group>

                  <Form.Group controlId="formEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter an email address"
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

RegistrationView.propTypes = {
  onRegistration: PropTypes.func.isRequired,
};
