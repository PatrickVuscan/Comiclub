import { Typography } from '@mui/material';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './AccountMenu.module.css';
import AuthContext, { fetchAuthState } from '../context';

const AccountMenu = ({ closeMenu }) => {
  const {
    authState: { user },
    setAuthState,
  } = useContext(AuthContext);

  const signOut = () => {
    closeMenu();
    localStorage.removeItem('LOGGED_IN_USERNAME');
    setAuthState(fetchAuthState());
  };

  return (
    <div className={styles.dropdown}>
      <Typography
        variant="h4"
        gutterBottom
        component="div"
        style={{ padding: '0.5rem', borderBottom: '1px solid white' }}
      >
        {user}
      </Typography>
      <div className={styles.item}>
        <Link to="/user">
          <Typography variant="h6" gutterBottom component="div">
            User Profile
          </Typography>
        </Link>
      </div>
      <div className={styles.item}>
        <Link to="/dashboard">
          <Typography variant="h6" gutterBottom component="div">
            Artist Dashboard
          </Typography>
        </Link>
      </div>
      <div className={styles.item}>
        <Link to="/settings">
          <Typography variant="h6" gutterBottom component="div">
            Settings
          </Typography>
        </Link>
      </div>
      <div className={styles.item}>
        <Typography variant="h6" gutterBottom component="div" onClick={signOut}>
          Sign Out
        </Typography>
      </div>
    </div>
  );
};

export default AccountMenu;
