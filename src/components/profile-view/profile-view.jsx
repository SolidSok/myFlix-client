import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

import './Profile-view.scss';
import axios from 'axios';
import UserInfo from './user-info';
import FavoriteMovies from './favorite-movies';
import UpdateUser from './update-user';

export function ProfileView({ movies, updateUserInfo }) {
  return (
    <div>
      <UserInfo name={user.Username} email={user.Email} />
      <FavoriteMovies favoriteMovieList={favoriteMovieList} />
      <UpdateUser handleSubmit={handleSubmit} handleUpdate={handleUpdate} />
    </div>
  );
}
