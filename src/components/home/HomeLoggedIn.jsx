import { useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { useHistory } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
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
            textAlign: 'center',
            // These following things are used for it to ensure that the \n is converted into an actual newline
            wordWrap: 'break-word',
            whiteSpace: 'pre-wrap',
          }}
        >{`Welcome, ${user}!\nHere are some of your Subscriptions`}</p>

        <ImageList sx={{ width: '90vw' }} cols={cols} gap={50}>
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
