import React from 'react';
import { Link } from 'react-router-dom';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import styles from './Navbar.module.css';

const Navbar = () => {
  const loggedIn = false;
  return (
    <>
      <nav className={styles.navbar}>
        <ul className={styles.navbarNav}>
          {/* Logo */}
          <li className={styles.navbarItem}>
            <Link to="/" className={styles.logo}>
              COMICLUB
            </Link>
          </li>

          <li className={styles.navbarItem}>
            <Link to="/xyz">XXXXXX</Link>
          </li>
          <li className={styles.navbarItem}>
            <Link to="/xyz">YYYYYY</Link>
          </li>

          {/* Search Bar */}
          <li className={`${styles.navbarItem} ${styles.searchbar}`}>
            <Autocomplete
              filterOptions={(x) => x}
              sx={{ width: 300 }}
              getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
              renderInput={(params) => <TextField {...params} label="Add a location" fullWidth />}
            />
          </li>

          {/* Profile and Notifications */}
          {loggedIn && (
            <>
              <li className={styles.navbarItem}>
                <Link to="/xyz">SIGN UP</Link>
              </li>
              <li className={styles.navbarItem}>
                <Link to="/xyz">
                  <AccountCircleIcon />
                  SIGN UP
                </Link>
              </li>
            </>
          )}

          {/* Not signed in - Login / Signup Buttons */}
          {!loggedIn && (
            <>
              <li className={styles.navbarItem}>
                <Link to="/xyz">
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    sx={{ marginRight: '1rem', fontSize: '1.2rem', lineHeight: '2rem' }}
                  >
                    Sign Up
                  </Button>
                </Link>

                <Link to="/xyz">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ marginRight: '1rem', fontSize: '1.2rem', lineHeight: '2rem' }}
                  >
                    Log In
                  </Button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <div className={styles.navbarDisplacement} />
    </>
  );
};

export default Navbar;
