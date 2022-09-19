import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import './main-view.scss';

import {
  setMovies,
  setUser,
  setUserInfo,
  setDirectors,
  setGenres,
} from '../../actions/actions';

import MoviesList from '../movies-list/movies-list.jsx';

import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieNav } from '../navbar/navbar';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

class MainView extends React.Component {
  getUserInfo(token, user) {
    axios
      .get(`https://sokflix.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        this.props.setUserInfo(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  getMovies(token) {
    axios
      .get('https://sokflix.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        console.log(response, 'response');
        this.props.setMovies(response.data);
      })
      .catch(error => {
        this.props.setMovies([]);
        console.log(error);
      });
  }
  getGenres(token) {
    axios
      .get('https://sokflix.herokuapp.com/genres', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        this.props.setGenres(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }
  getDirectors(token) {
    axios
      .get('https://sokflix.herokuapp.com/directors', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        this.props.setDirectors(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    let accessUser = localStorage.getItem('user');

    this.props.setUser(localStorage.getItem('user'));
    this.getMovies(accessToken);
    this.getUserInfo(accessToken, accessUser);
    this.getDirectors(accessToken);
    this.getGenres(accessToken);
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.props.setUser(authData.user);

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);

    this.getMovies(authData.token);
  }

  render() {
    let { movies, user, userInfo, genres, directors } = this.props;

    return (
      <Router>
        <MovieNav user={user} directors={directors} genres={genres} />
        <Row className="main-view justify-content-md-center">
          <Route
            exact
            path="/"
            render={() => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0)
                return <div className="main-view">Loading information...</div>;

              return <MoviesList userInfo={userInfo} movies={movies} />;
            }}
          />

          <Route
            path="/movies/:movieId"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView
                      movies={movies}
                      onLoggedIn={user => this.onLoggedIn(user)}
                    />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;

              return (
                <Col md={8}>
                  <MovieView
                    movie={movies.find(m => m._id === match.params.movieId)}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
          <Route
            path="/directors/:name"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView
                      movies={movies}
                      onLoggedIn={user => this.onLoggedIn(user)}
                    />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <DirectorView
                    director={
                      movies.find(m => m.Director.Name === match.params.name)
                        .Director
                    }
                    directorMovies={movies.filter(
                      m => m.Director.Name === match.params.name
                    )}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
          <Route
            path="/genres/:name"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView
                      movies={movies}
                      onLoggedIn={user => this.onLoggedIn(user)}
                    />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <GenreView
                    genre={
                      movies.find(
                        movie => movie.Genre.Name === match.params.name
                      ).Genre
                    }
                    genreMovies={movies.filter(
                      m => m.Genre.Name === match.params.name
                    )}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            path={`/users/${userInfo.Username}`}
            render={({ history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView
                      movies={movies}
                      onLoggedIn={user => this.onLoggedIn(user)}
                    />
                  </Col>
                );
              return (
                <Col>
                  <ProfileView
                    movies={movies}
                    user={user}
                    userInfo={userInfo}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
          <Route
            path="/register"
            render={() => {
              if (user) return <Redirect to="/" />;
              return (
                <Col lg={8} md={8}>
                  <RegistrationView />
                </Col>
              );
            }}
          />
        </Row>
      </Router>
    );
  }
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
})(MainView);
