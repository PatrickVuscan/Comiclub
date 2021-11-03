import { Typography } from '@mui/material';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './AccountMenu.module.css';
import AuthContext, { fetchAuthState } from '../context';
import useComponentVisible from './useComponentVisible';

const AccountMenu = ({ callback }) => {
  const { ref, isComponentVisible } = useComponentVisible(true, callback);
  const {
    authState: { user },
    setAuthState,
  } = useContext(AuthContext);

  const signOut = () => {
    localStorage.removeItem('LOGGED_IN_USERNAME');
    setAuthState(fetchAuthState());
    callback();
  };

  return (
    <div ref={ref}>
      {isComponentVisible && (
        <div className={styles.dropdown}>
          <Typography
            variant="h4"
            gutterBottom
            component="div"
            style={{ margin: '0.5rem', borderBottom: '1px solid gray' }}
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
      )}
    </div>
  );
};

export default AccountMenu;
