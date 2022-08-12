import React from 'react';
import axios from 'axios';
import { UpdateUserView } from './update-user';

import { Button, Card, Row, Container, Col } from 'react-bootstrap';

import { FavoriteMoviesCard } from './favorite-movies';
import { UserInfo } from './user-info';

export const ProfileView = props => {
  const { onBackClick, movies, favorites } = props;
  const username = localStorage.getItem('user');
  const email = localStorage.getItem('email');
  const birthday = localStorage.getItem('birthday');
  const token = localStorage.getItem('token');

  const favoriteMovies = props.movies.filter(id => {
    return props.favorites.some(mID => {
      return mID === id._id;
    });
  });

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
    <Container>
      <Button
        variant="warning"
        onClick={() => {
          onBackClick();
        }}>
        Back
      </Button>
      <Row>
        <Col xs={12} sm={10} md={6}>
          <Card>
            <Card.Body>
              <UserInfo />
            </Card.Body>
            <Button
              variant="danger"
              onClick={() => {
                deleteUser();
              }}>
              Delete your account
            </Button>
          </Card>
        </Col>
        <Col xs={12} sm={10} md={6}>
          <Card>
            <Card.Body>
              <UpdateUserView />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Card>
        <Card.Body>
          <Row>
            <Col xs={12}>
              <h2>Favorite Movies:</h2>
            </Col>
          </Row>
          <Row>
            {favoriteMovies.length === 0 ? (
              <p>No movies have been added to your Favorites</p>
            ) : (
              favoriteMovies.map(m => {
                return (
                  <Col xs={12} md={6} lg={4} xl={3}>
                    {' '}
                    <FavoriteMoviesCard
                      username={username}
                      key={m._id}
                      movie={m}
                      token={token}
                    />
                  </Col>
                );
              })
            )}
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};
