import { useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context';
import styles from './HomeLoggedIn.module.css';

// Images for Subscriptions
import batmanImage from './images/batman.png';
import opImage from './images/op.png';
import narutoImage from './images/naruto.png';
import aotImage from './images/aot.png';
import togImage from './images/tog.png';
import marvelImage from './images/marvel.png';

// Images for Recommendations

const HomeLoggedIn = () => {
  const {
    authState: { user },
  } = useContext(AuthContext);
  const history = useHistory();

  const itemData = [
    {
      img: batmanImage,
      title: 'Batman Origins',
    },
    {
      img: opImage,
      title: 'One Piece',
    },
    {
      img: narutoImage,
      title: 'Naruto',
    },
    {
      img: aotImage,
      title: 'Attack on Titan',
    },
    {
      img: togImage,
      title: 'Tower of God',
    },
    {
      img: marvelImage,
      title: 'Marvel',
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.subscriptions}>
        <p
          style={{
            fontSize: '20px',
            color: 'var(--blue)',
            fontWeight: 'bold',
            margin: '0',
          }}
        >{`Welcome, ${user}! Here are some of your Subscriptions`}</p>

        <ImageList sx={{ width: 800, height: 900 }} cols={3} rowHeight={400}>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=350&h=400&fit=crop&auto=format`}
                srcSet={`${item.img}?w=350&h=400&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.title}
                position="top"
                actionIcon={
                  <IconButton sx={{ color: 'white' }} aria-label={`heart ${item.title}`}>
                    <FavoriteIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    </div>
  );
};

export default HomeLoggedIn;
