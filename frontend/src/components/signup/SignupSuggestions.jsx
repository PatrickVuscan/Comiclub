import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from '../../context';
import actionImage from './images/action.png';
import comedyImage from './images/comedy.png';
import dramaImage from './images/drama.png';
import fantasyImage from './images/fantasy.png';
import mysteryImage from './images/mystery.png';
import scifiImage from './images/scifi.png';
import SignupContext from './SignupContext';
import styles from './SignupSuggestions.module.css';

const SignupSuggestions = () => {
  const { signupState, setSignupState } = useContext(SignupContext);
  const { setAuthState, fetchAuthState } = useContext(AuthContext);

  const history = useHistory();

  const submit = (e) => {
    e.preventDefault();

    // Push this data and the completed profile to the server

    localStorage.setItem('LOGGED_IN_USERNAME', signupState.username);
    setAuthState(fetchAuthState());

    history.push('/');
  };

  // Update the status of favourited or not
  const updateFavourite = (category) => (e) => {
    e.preventDefault();

    setSignupState((prevState) => ({
      ...prevState,
      favourites: {
        ...prevState.favourites,
        [category]: !prevState.favourites[category],
      },
    }));
  };

  const itemData = [
    {
      img: actionImage,
      title: 'Action',
    },
    {
      img: comedyImage,
      title: 'Comedy',
    },
    {
      img: dramaImage,
      title: 'Drama',
    },
    {
      img: fantasyImage,
      title: 'Fantasy',
    },
    {
      img: mysteryImage,
      title: 'Mystery',
    },
    {
      img: scifiImage,
      title: 'Sci-Fi',
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.suggestions}>
        <p
          style={{
            fontSize: '20px',
            color: 'var(--blue)',
            fontWeight: 'bold',
            margin: '0',
          }}
        >{`Welcome, ${signupState.name}!`}</p>
        <p style={{ fontSize: '16px', margin: '0.25rem' }}>What're your favourite types of comics?</p>

        <ImageList sx={{ width: 600, height: 550 }} cols={3} rowHeight={200}>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=190&h=190&fit=crop&auto=format`}
                srcSet={`${item.img}?w=190&h=190&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.title}
                position="top"
                actionIcon={
                  <IconButton
                    sx={{ color: 'white' }}
                    aria-label={`star ${item.title}`}
                    onClick={updateFavourite(item.title.toLowerCase())}
                  >
                    {signupState.favourites[item.title.toLowerCase()] ? <StarIcon /> : <StarBorderIcon />}
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          className={styles.input}
          onClick={submit}
          sx={{ width: '400px' }}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default SignupSuggestions;
