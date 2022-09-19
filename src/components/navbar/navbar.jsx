import React from 'react';
import {
  Navbar,
  Container,
  Nav,
  Button,
  NavDropdown,
  Dropdown,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function Navbar({ user, genres, directors }) {
  const onLoggedOut = () => {
    localStorage.clear();
    window.open('/', '_self');
  };
  const isAuth = () => {
    if (typeof window == 'undefined') {
      return false;
    }
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
    } else {
      return false;
    }
  };
  const topButton = () => {
    document.documentElement.scrollTop = 0;
  };
  return (
    <Navbar
      className="main-nav"
      sticky="top"
      bg="dark"
      expand="lg"
      variant="dark">
      <Container fluid>
        <Navbar.Brand className="navbar-logo" href="/">
          sokFlixCinema
        </Navbar.Brand>
        <Button onClick={topButton} variant="outline-secondary">
          Top
        </Button>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <NavDropdown title="Genres" className="genres">
              {genres.map(genre => {
                return (
                  <NavDropdown.Item className="genre-items" key={genre.Name}>
                    <Link to={`/genres/${genre.Name}`}>
                      <Button variant="secondary">{genre.Name}</Button>
                    </Link>
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown>
            <Dropdown.Divider />
            <NavDropdown title="Directors" className="directors">
              {directors.map(director => {
                return (
                  <NavDropdown.Item
                    className="director-items"
                    key={director.Name}>
                    <Link to={`/directors/${director.Name}`}>
                      <Button variant="secondary">{director.Name}</Button>
                    </Link>
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown>
            <Dropdown.Divider />
            {isAuth() && (
              <Nav.Link href={`/users/${user}`}>
                <b>{user}</b>
              </Nav.Link>
            )}

            {isAuth() && (
              <Button variant="link" onClick={onLoggedOut}>
                Logout
              </Button>
            )}

            {!isAuth() && <Nav.Link href="/">Sign-in</Nav.Link>}
            {!isAuth() && <Nav.Link href="/register">Sign-up</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
