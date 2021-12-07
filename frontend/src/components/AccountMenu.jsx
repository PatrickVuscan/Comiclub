import Typography from '@mui/material/Typography';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import ENV from '../config';
import AuthContext, { fetchAuthState } from '../context';
import styles from './AccountMenu.module.css';
import useComponentVisible from './useComponentVisible';

const AccountMenu = ({ callback }) => {
  const { ref, isComponentVisible } = useComponentVisible(true, callback);
  const {
    authState: { username },
    setAuthState,
  } = useContext(AuthContext);

  const signOut = () => {
    fetch(`${ENV.api_host}/api/users/logout`, {
      credentials: 'include',
    })
      .then(() => {
        localStorage.removeItem('LOGGED_IN_USER');
        localStorage.removeItem('LOGGED_IN_USERNAME');
        localStorage.removeItem('LOGGED_IN_EMAIL');
        setAuthState(fetchAuthState());
        callback();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div ref={ref}>
      {isComponentVisible && (
        <div className={styles.dropdown}>
          <Typography
            variant="h4"
            gutterBottom
            component="div"
            style={{ margin: '0.5rem', borderBottom: '1px solid gray', color: '#186ed1' }}
          >
            {username}
          </Typography>

          <div className={styles.item}>
            <Link to="/dashboard">
              <Typography variant="h6" gutterBottom component="div">
                Artist Dashboard
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
