import { createContext } from 'react';

const AuthContext = createContext(null);

export default AuthContext;

export function fetchAuthState() {
  const email = localStorage.getItem('LOGGED_IN_USERNAME');
  return {
    loggedIn: email !== null,
    user: email, // Might need to replace eventually with a userID
  };
}
