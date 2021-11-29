import { createContext } from 'react';

const AuthContext = createContext(null);

export default AuthContext;

export function fetchAuthState() {
  const username = localStorage.getItem('LOGGED_IN_USERNAME');
  return {
    loggedIn: username !== null,
    user: username, // Might need to replace eventually with a userID
  };
}
