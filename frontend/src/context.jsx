import { createContext } from 'react';

const AuthContext = createContext(null);

export default AuthContext;

export function fetchAuthState() {
  const user = localStorage.getItem('LOGGED_IN_USER');
  const username = localStorage.getItem('LOGGED_IN_USERNAME');
  const email = localStorage.getItem('LOGGED_IN_EMAIL');

  return {
    loggedIn: user !== null,
    user,
    username,
    email,
  };
}
