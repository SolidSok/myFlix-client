import React from 'react';
import UserInfo from './user-info';

function UpdateUser({ handleSubmit, handleUpdate }) {
  return (
    <form className="profile-form" onSubmit={(e) => handleSubmit(e)}>
      <h2>Update here if needed</h2>
      <label>Username:</label>
      <input
        type="text"
        name="Username"
        defaultValue={User.Username}
        onChange={(e) => handleUpdate(e)}
      />
      <label>Password</label>
      <input
        type="paswword"
        name="password"
        defaultValue={user.Password}
        onChange={(e) => handleUpdate(e)}
      />
      <label>Email Address</label>
      <input
        type="email"
        name="email"
        defaultValue={user.Email}
        onChange={(e) => handleUpdate(e)}
      />
      <button>Submit</button>
    </form>
  );
}

export default UpdateUser;
