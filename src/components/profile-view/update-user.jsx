import axios from 'axios';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Container, Button, Card, Form } from 'react-bootstrap';
import {
  setMovies,
  setUser,
  setUserInfo,
  setDirectors,
  setGenres,
} from '../../actions/actions';

export function UpdateUserView(props) {
  const { user, userInfo } = props;
  const [username, updateUsername] = useState('');
  const [password, updatePassword] = useState('');
  const [email, updateEmail] = useState('');
  const [birthday, updateBirthday] = useState('');
  const [values, setValues] = useState({
    usernameErr: '',
    passwordErr: '',
    emailErr: '',
  });

  const updateValidate = () => {
    let isReq = true;
    if (!username) {
      setValues({ ...values, usernameErr: 'Username is required' });
      isReq = false;
    } else if (username.length < 4) {
      setValues({
        ...values,
        usernameErr: 'Username must be at least 4 characters long',
      });
      isReq = false;
    }
    if (!password) {
      setValues({ ...values, passwordErr: 'Password is required' });
      isReq = false;
    } else if (password.length < 6) {
      setValues({
        ...values,
        passwordErr: 'Password must be at least 6 characters long',
      });
      isReq = false;
    }
    if (!email) {
      setValues({ ...values, emailErr: 'Email is required' });
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setValues({ ...values, emailErr: 'Email is invalid' });
      isReq = false;
    }
    return isReq;
  };

  const update = e => {
    e.preventDefault();
    const isReq = updateValidate();
    if (isReq) {
      const token = localStorage.getItem('token');
      axios
        .put(
          `https://sokflix.herokuapp.com/users/${props.user}`,
          {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then(response => {
          const data = response.data;
          console.log(data);
          alert('update succesful!');
          localStorage.setItem('user', username);
          window.open(`/users/${username}`, '_self');
        })
        .catch(response => {
          console.error(response);
          alert('unable to update!');
        });
    }
  };

  return (
    <Container>
      <Card.Title>
        <h3>Want to update your info? Fill out the forms below!</h3>
      </Card.Title>
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            onChange={e => updateUsername(e.target.value)}
            required
            placeholder="Enter a username"
          />
          {values.usernameErr && <p>{values.usernameErr}</p>}
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            onChange={e => updatePassword(e.target.value)}
            required
            placeholder="Enter a password with 8 or more characters"
          />
          {values.passwordErr && <p>{values.passwordErr}</p>}
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            onChange={e => updateEmail(e.target.value)}
            required
            placeholder="Enter an email address"
          />
          {values.emailErr && <p>{values.emailErr}</p>}
        </Form.Group>

        <Form.Group controlId="formBirthday">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            type="date"
            onChange={e => updateBirthday(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={update}>
          Submit
        </Button>
      </Form>
    </Container>
  );
}

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
})(UpdateUserView);
