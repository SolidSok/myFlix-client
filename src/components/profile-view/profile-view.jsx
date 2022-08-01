import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Form, Button, Card, Container } from 'react-bootstrap';

import './Profile-view.scss';

import UserInfo from './user-info';
import FavoriteMovies from './favorite-movies';
import UpdateUser from './update-user';

export function ProfileView(props) {
  const [user, setUser] = useState(props.user);
  const [favoriteMovieList, setFavoriteMovieList] = useState([]);
  const currentUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  const deleteUser = () => {
    axios
      .delete(`https://sokflix.herokuapp.com/users/${currentUser}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        alert(`Your user account has been deleted.`);
        localStorage.clear();
        window.open('/', '_self');
      })
      .catch((err) => console.log(err));
  };

  const getUser = () => {
    axios
      .get(`https://sokflix.herokuapp.com/users/${currentUser}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data);
        setFavoriteMovieList(response.data.FavouriteMovies);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Container>
      <Row>
        <UserInfo name={user.Username} email={user.Email} />
      </Row>
      <Row>
        <FavoriteMovies favoriteMovieList={favoriteMovieList} />
      </Row>
      <Row>
        <UpdateUser handleSubmit={handleSubmit} handleUpdate={handleUpdate} />
      </Row>

      <Button className="d-block mt-5" variant="danger" onClick={deleteUser}>
        Delete Account
      </Button>
    </Container>
  );
}
