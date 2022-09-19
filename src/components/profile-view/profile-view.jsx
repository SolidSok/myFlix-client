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

import { Button, Card, Row, Container, Col, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { FavoriteMoviesCard } from './favorite-movies';
import { UserInfo } from './user-info';

export const ProfileView = props => {
  const { onBackClick, userInfo } = props;
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const favoriteMovies = props.movies.filter(id => {
    return props.userInfo.FavoriteMovies.some(mID => {
      return mID == id._id;
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
      <div className="d-grid gap-2">
        <Button
          variant="warning"
          size="lg"
          onClick={() => {
            onBackClick();
          }}>
          Back
        </Button>
      </div>
      <Row>
        <Col xs={12} sm={10} md={6}>
          <Card>
            <Card.Body>
              <UserInfo user={user} userInfo={props.userInfo} />
            </Card.Body>
            <Button variant="danger" onClick={handleShow}>
              Delete your account
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header>
                <Modal.Title>Delete your account?</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to delete your account?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={deleteUser}>
                  Yes, delete my acount
                </Button>
              </Modal.Footer>
            </Modal>
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
