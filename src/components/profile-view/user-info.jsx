import React from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardGroup,
  Form,
} from 'react-bootstrap';

export const UserInfo = props => {
  const username = localStorage.getItem('user');
  const email = localStorage.getItem('email');
  const birthday = localStorage.getItem('birthday');
  return (
    <Container>
      <h2>Profile</h2>
      <Card.Text>Username: {username}</Card.Text>
      <Card.Text>Email: {email}</Card.Text>
      <Card.Text>Birthday: {birthday}</Card.Text>
    </Container>
  );
};
