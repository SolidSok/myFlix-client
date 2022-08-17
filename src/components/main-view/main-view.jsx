import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import './main-view.scss';

import {
  setMovies,
  setUser,
  setFavorites,
  setDirectors,
  setGenres,
} from '../../actions/actions';

import MoviesList from '../movies-list/movies-list.jsx';

import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { Navbar } from '../navbar/navbar';

import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

class MainView extends React.Component {
  getFavorites(token, user) {
    axios
      .get(`https://sokflix.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        this.props.setFavorites(response.data.FavoriteMovies);
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
        this.props.setMovies(response.data);
      })
      .catch(error => {
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
    if (accessToken !== null) {
      this.props.setUser(localStorage.getItem('user'));
      this.getMovies(accessToken);
      this.getFavorites(accessToken, accessUser);
      this.getDirectors(accessToken);
      this.getGenres(accessToken);
    }
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
      favorites: authData.user.FavoriteMovies,
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    localStorage.setItem('email', authData.user.Email);
    localStorage.setItem('birthday', authData.user.Birthday);
    this.getMovies(authData.token);
  }

  render() {
    let { movies, user, favorites, genres, directors } = this.props;

    return (
      <Router>
        <Navbar user={user} directors={directors} genres={genres} />
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

              return <MoviesList movies={movies} />;
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
            path={`/users/${user}`}
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
                    onBackClick={() => history.goBack()}
                    favorites={favorites}
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
    favorites: state.favorites,
    genres: state.genres,
    directors: state.directors,
  };
};
export default connect(mapStateToProps, {
  setMovies,
  setUser,
  setFavorites,
  setDirectors,
  setGenres,
})(MainView);
