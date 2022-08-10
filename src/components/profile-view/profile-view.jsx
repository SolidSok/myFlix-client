import React from 'react';
import axios from 'axios';
import { UpdateUserView } from './update-user';

import { Button, Card } from 'react-bootstrap';
import { FavoriteMoviesView } from './favorite-movies';

export const ProfileView = props => {
  const { onBackClick, movie } = props;
  const username = localStorage.getItem('user');
  const email = localStorage.getItem('email');
  const birthday = localStorage.getItem('birthday');
  const token = localStorage.getItem('token');
  const favorites = localStorage.getItem('favorites');

  function deleteUser() {
    axios
      .delete(`https://sokflix.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        alert('Your account has been deleted');
        localStorage.clear();
        window.open('/', '_self');
      })
      .catch(err => console.log(err));
  }

  return (
    <Card>
      <Button
        variant="warning"
        onClick={() => {
          onBackClick();
        }}>
        Back
      </Button>
      <Card.Body>
        <h2>Profile</h2>
        <Card.Text>Username: {username}</Card.Text>
        <Card.Text>Email: {email}</Card.Text>
        <Card.Text>Birthday: {birthday}</Card.Text>
      </Card.Body>
      <Card.Body>
        <UpdateUserView />
      </Card.Body>
      <Card.Body>
        <FavoriteMoviesView />
      </Card.Body>

      <Button
        variant="danger"
        onClick={() => {
          deleteUser();
        }}>
        Delete your account
      </Button>
    </Card>
  );
};
