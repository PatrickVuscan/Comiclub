import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TextField from '@mui/material/TextField';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';

import { styled } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { inputLabelClasses } from '@mui/material/InputLabel';
import { svgIconClasses } from '@mui/material/SvgIcon';

import styles from './Navbar.module.css';
import AuthContext from '../context';

const SearchOptions = [
  {
    title: 'Batman Origins',
    id: 1,
  },
  {
    title: 'One Piece',
    id: 2,
  },
  {
    title: 'Naruto',
    id: 3,
  },
  {
    title: 'Jacksaw Rip',
    id: 4,
  },
  {
    title: 'Marvel',
    id: 5,
  },
];

// The way I achieved a white autocomplete field
// From https://stackoverflow.com/a/58963947
const StyledTextField = styled(TextField)({
  [`& .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]: {
    borderColor: 'white',
  },
  [`&:hover .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]: {
    borderColor: 'white',
  },
  [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]: {
    borderColor: 'white',
  },
  [`& .${outlinedInputClasses.input}`]: {
    color: 'white',
  },
  [`&:hover .${outlinedInputClasses.input}`]: {
    color: 'white',
  },
  [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.input}`]: {
    color: 'white',
  },
  [`& .${inputLabelClasses.outlined}`]: {
    color: 'white',
  },
  [`&:hover .${inputLabelClasses.outlined}`]: {
    color: 'white',
  },
  [`& .${inputLabelClasses.outlined}.${inputLabelClasses.focused}`]: {
    color: 'white',
  },
  [`& .${svgIconClasses.root}`]: {
    color: 'white',
  },
});

const Navbar = () => {
  const {
    authState: { loggedIn },
  } = useContext(AuthContext);

  const [searchValue, setSearchValue] = useState('');
  const [searchOption, setSearchOption] = useState(null);
  const [notificationsOpened, setNotificationsOpened] = useState(false);
  const [newNotification, setNewNotification] = useState(true);

  const onNotificationIconClick = () => {
    setNotificationsOpened((prevOpened) => !prevOpened);

    // For now this is to show the new notifications icon,
    // but normally once viewed, we do not set back to true
    setNewNotification((prevNew) => !prevNew);
  };

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
              sx={{ width: '100%', maxWidth: '400px', margin: 'auto', color: 'white', borderColor: 'white' }}
              value={searchOption}
              onChange={(e, newOption) => {
                // This happens on selecting an option or pressing enter
                setSearchOption(newOption);
                // Call the search functionality, basically
              }}
              inputValue={searchValue}
              onInputChange={(e, newInputValue) => {
                // Happens on each input change (but not enter), or option select
                setSearchValue(newInputValue);
              }}
              // The below must be uncommented, once we start doing our own filtering.
              // filterOptions={(x) => x}
              freeSolo
              selectOnFocus
              autoHighlight
              options={SearchOptions}
              getOptionLabel={(option) => (typeof option === 'string' ? option : option.title)}
              renderInput={(params) => (
                <StyledTextField
                  {...params}
                  label="Search"
                  size="small"
                  variant="outlined"
                  InputProps={{ ...params.InputProps, type: 'search' }}
                  color="secondary"
                />
              )}
            />
          </li>

          {/* Profile and Notifications */}
          {loggedIn && (
            <>
              <li className={styles.navbarItem} style={{ display: 'flex', alignItems: 'center' }}>
                <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center' }}>
                  <AddCircleOutlineIcon fontSize="large" style={{ margin: '2px 1rem 0 0' }} />
                </Link>
                <Link to="/home" style={{ display: 'flex', alignItems: 'center' }}>
                  <FavoriteBorderIcon fontSize="large" style={{ margin: '2px 1rem 0 0' }} />
                </Link>
                {newNotification ? (
                  <NotificationsActiveOutlinedIcon
                    onClick={onNotificationIconClick}
                    fontSize="large"
                    style={{ margin: '2px 1rem 0 0', cursor: 'pointer' }}
                  />
                ) : (
                  <NotificationsNoneOutlinedIcon
                    onClick={onNotificationIconClick}
                    fontSize="large"
                    style={{ margin: '2px 1rem 0 0', cursor: 'pointer' }}
                  />
                )}
                <Link to="/xyz" style={{ display: 'flex', alignItems: 'center' }}>
                  <AccountCircleIcon fontSize="large" style={{ margin: '2px 5px 0 0' }} />
                  Account
                </Link>
              </li>
            </>
          )}

          {/* Not signed in - Login / Signup Buttons */}
          {!loggedIn && (
            <>
              <li className={styles.navbarItem}>
                <Link to="/signup">
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    sx={{ marginRight: '1rem', fontSize: '1.2rem', lineHeight: '2rem' }}
                  >
                    Sign Up
                  </Button>
                </Link>

                <Link to="/login">
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    sx={{ fontSize: '1.2rem', lineHeight: '2rem' }}
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
