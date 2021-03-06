import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import ENV from '../config';
import AuthContext, { fetchAuthState } from '../context';
import styles from './Footer.module.css';

const Footer = () => {
  const {
    authState: { loggedIn, username },
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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const history = useHistory();

  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        {/* Account */}
        <div className={styles.column}>
          <Typography variant="h6" gutterBottom>
            Account
          </Typography>
          <Typography
            variant="body"
            sx={{ cursor: 'pointer' }}
            gutterBottom
            onClick={() => {
              history.push('/dashboard');
            }}
          >
            Artist Dashboard
          </Typography>
          {loggedIn ? (
            <Typography variant="body" sx={{ cursor: 'pointer' }} gutterBottom onClick={signOut}>
              Sign Out
            </Typography>
          ) : (
            <Typography
              variant="body"
              sx={{ cursor: 'pointer' }}
              gutterBottom
              onClick={() => {
                history.push('/login');
              }}
            >
              Log In
            </Typography>
          )}
        </div>

        {/* Favourites and Subscriptions */}
        <div className={styles.column}>
          <Typography variant="h6" gutterBottom>
            Comics
          </Typography>
          <Typography
            variant="body"
            sx={{ cursor: 'pointer' }}
            gutterBottom
            onClick={() => {
              history.push('/home');
            }}
          >
            Favourites
          </Typography>
          <Typography
            variant="body"
            sx={{ cursor: 'pointer' }}
            gutterBottom
            onClick={() => {
              history.push('/subscriptions');
            }}
          >
            Subscriptions
          </Typography>
        </div>

        {/* Administrative Panels */}
        {username === 'admin' && (
          <div className={styles.column}>
            <Typography variant="h6" gutterBottom>
              Admin
            </Typography>
            <Typography
              variant="body"
              sx={{ cursor: 'pointer' }}
              gutterBottom
              onClick={() => {
                history.push('/admin');
              }}
            >
              Users Panel
            </Typography>
          </div>
        )}
        <div className={styles.column}>
          <Typography variant="h6" gutterBottom>
            Project By
          </Typography>
          <Typography variant="body" gutterBottom>
            Dionysus Cho
          </Typography>
          <Typography variant="body" gutterBottom>
            Patrick Vuscan
          </Typography>
          <Typography variant="body" gutterBottom>
            Raag Kashyap
          </Typography>
          <Typography variant="body" gutterBottom>
            Salman Shahid
          </Typography>
        </div>
      </div>
      <div className={styles.copyright}>
        <Typography>Comiclub ?? 2021</Typography>
      </div>
    </div>
  );
};
export default Footer;
