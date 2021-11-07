import IconButton from '@mui/material/IconButton';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from '../../context';
import styles from './HomeLoggedIn.module.css';
// Images for Subscriptions
import aotImage from './images/aot.png';
import batmanImage from './images/batman.png';
import gohImage from './images/goh.png';
import ironmanImage from './images/ironman.png';
import marvelImage from './images/marvel.png';
import narutoImage from './images/naruto.png';
import opImage from './images/op.png';
import togImage from './images/tog.png';

const HomeNotLoggedIn = () => {
  const {
    authState: { user },
  } = useContext(AuthContext);
  const history = useHistory();
  const muiTheme = useTheme();
  const mediaQueries = [
    useMediaQuery(muiTheme.breakpoints.up('xs')),
    useMediaQuery(muiTheme.breakpoints.up('sm')),
    useMediaQuery(muiTheme.breakpoints.up('md')),
    useMediaQuery(muiTheme.breakpoints.up('lg')),
    useMediaQuery(muiTheme.breakpoints.up('xl')),
  ];
  const cols = mediaQueries.reduce((prev, curr) => {
    return curr ? prev + 1 : prev;
  }, 0);
  const submit = (e) => {
    e.preventDefault();
    // Find image name and redirect accordingly
    history.push('/login');
  };
  const comicId = {
    'Batman Origins': '/comics/batman',
    'One Piece': '/comics/op',
    'Naruto ': '/comics/naruto',
    'Attack on Titan': '/comics/aot',
    'Tower of God': '/comics/tog',
    'Marvel ': '/comics/marvel',
    'Iron Man: The First Edition': '/comics/ironman1',
    'God of High School': '/comics/goh',
  };
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
      title: 'Naruto ',
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
      title: 'Marvel ',
    },
    {
      img: ironmanImage,
      title: 'Iron Man: The First Edition',
    },
    {
      img: gohImage,
      title: 'God of High School',
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
            textAlign: 'center',
            // These following things are used for it to ensure that the \n is converted into an actual newline
            wordWrap: 'break-word',
            whiteSpace: 'pre-wrap',
          }}
        >{`Welcome, to COMICLUB!\nHere are some of our currently trending comics`}</p>
        <ImageList sx={{ width: '90vw', mb: '1rem' }} cols={cols} gap={50}>
          {itemData.map((item) => (
            <ImageListItem key={item.img} onClick={submit}>
              <img
                src={`${item.img}?w=350&h=400&fit=crop&auto=format`}
                srcSet={`${item.img}?w=350&h=400&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
                style={{ cursor: 'pointer' }}
              />
              <ImageListItemBar
                title={item.title}
                position="top"
                actionIcon={<IconButton sx={{ color: 'white' }} aria-label={`heart ${item.title}`} />}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    </div>
  );
};
export default HomeNotLoggedIn;
