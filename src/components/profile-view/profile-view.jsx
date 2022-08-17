import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  setMovies,
  setUser,
  setUserInfo,
  setDirectors,
  setGenres,
} from '../../actions/actions';
import { UpdateUserView } from './update-user';

import { Button, Card, Row, Container, Col } from 'react-bootstrap';

import { FavoriteMoviesCard } from './favorite-movies';
import { UserInfo } from './user-info';

export const ProfileView = props => {
  const { onBackClick, userInfo } = props;
  const user = localStorage.getItem('user');

  const token = localStorage.getItem('token');

  const favorites = props.userInfo.FavoriteMovies;
  const favoriteMovies = props.movies.filter(id => {
    return props.userInfo.FavoriteMovies.some(mID => {
      return mID === id._id;
    });
  });
  function deleteUser() {
    axios
      .delete(`https://sokflix.herokuapp.com/users/${user}`, {
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
              <UserInfo user={user} userInfo={props.userInfo} />
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
              <UpdateUserView user={user} userInfo={userInfo} />
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
                  <Col xs={12} md={6} lg={4} xl={3} key={m._id}>
                    {' '}
                    <FavoriteMoviesCard user={user} movie={m} token={token} />
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
let mapStateToProps = state => {
  return {
    movies: state.movies,
    user: state.user,
    userInfo: state.userInfo,
    genres: state.genres,
    directors: state.directors,
  };
};
export default connect(mapStateToProps, {
  setMovies,
  setUser,
  setUserInfo,
  setDirectors,
  setGenres,
})(ProfileView);
