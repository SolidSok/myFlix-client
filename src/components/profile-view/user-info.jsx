import React from 'react';
import { Container, Card } from 'react-bootstrap';

export const UserInfo = props => {
  return (
    <Container>
      <h2>Profile</h2>
      <Card.Text>Username: {props.userInfo.Username}</Card.Text>
      <Card.Text>Email: {props.userInfo.Email}</Card.Text>
      <Card.Text>Birthday: {props.userInfo.Birthday}</Card.Text>
    </Container>
  );
};
