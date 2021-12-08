import { createContext } from 'react';

// This is our authentication context which uses localStorage to store our current session's data
// This is an MVP level solution for ensuring things persist past a hard refresh
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
