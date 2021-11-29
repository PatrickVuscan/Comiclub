import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from '../../context';
// Images
import aotImage from '../home/images/aot.png';
import batmanImage from '../home/images/batman.png';
import gohImage from '../home/images/goh.png';
import ironmanImage from '../home/images/ironman.png';
import marvelImage from '../home/images/marvel.png';
import narutoImage from '../home/images/naruto.png';
import opImage from '../home/images/op.png';
import togImage from '../home/images/tog.png';
import styles from './Genres.module.css';

const Genres = () => {
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

  const action = useRef();
  const adventure = useRef();
  const mystery = useRef();
  const superhero = useRef();

  function scrollTo(ref) {
    if (!ref.current) return;
    ref.current.scrollIntoView({ behavior: 'smooth' });
  }
  const submit = (e) => {
    e.preventDefault();

    // Find image name and redirect accordingly
    const path = comicId[e.target.alt];
    history.push(path);
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

  const actionData = [
    {
      img: aotImage,
      title: 'Attack on Titan',
    },
    {
      img: batmanImage,
      title: 'Batman Origins',
    },
    {
      img: gohImage,
      title: 'God of High School',
    },
    {
      img: marvelImage,
      title: 'Marvel ',
    },
  ];

  const adventureData = [
    {
      img: ironmanImage,
      title: 'Iron Man: The First Edition',
    },
    {
      img: narutoImage,
      title: 'Naruto ',
    },
    {
      img: opImage,
      title: 'One Piece',
    },
    {
      img: togImage,
      title: 'Tower of God',
    },
  ];

  const mysteryData = [
    {
      img: aotImage,
      title: 'Attack on Titan',
    },
    {
      img: batmanImage,
      title: 'Batman Origins',
    },
    {
      img: gohImage,
      title: 'God of High School',
    },
    {
      img: togImage,
      title: 'Tower of God',
    },
  ];

  const superheroData = [
    {
      img: batmanImage,
      title: 'Batman Origins',
    },
    {
      img: ironmanImage,
      title: 'Iron Man: The First Edition',
    },
    {
      img: marvelImage,
      title: 'Marvel ',
    },
    {
      img: narutoImage,
      title: 'Naruto ',
    },
  ];

  const commonStyles = {
    bgcolor: 'background.paper',
    m: 1,
    borderColor: 'text.primary',
  };

  return (
    <div className={styles.container}>
      <div className={styles.subscriptions}>
        <Box
          sx={{ width: '100%', maxWidth: 700, bgcolor: 'background.paper', mb: '100px', ...commonStyles, border: 1 }}
        >
          <List style={{ display: 'flex', flexDirection: 'row', padding: 0 }}>
            <Divider orientation="vertical" flexItem />
            <ListItem disablePadding>
              <ListItemButton onClick={() => scrollTo(action)}>
                <ListItemText primary="Action" />
              </ListItemButton>
            </ListItem>
            <Divider orientation="vertical" flexItem />
            <ListItem disablePadding>
              <ListItemButton onClick={() => scrollTo(adventure)}>
                <ListItemText primary="Adventure" />
              </ListItemButton>
            </ListItem>
            <Divider orientation="vertical" flexItem />
            <ListItem disablePadding>
              <ListItemButton onClick={() => scrollTo(mystery)}>
                <ListItemText primary="Mystery" />
              </ListItemButton>
            </ListItem>
            <Divider orientation="vertical" flexItem />
            <ListItem disablePadding>
              <ListItemButton onClick={() => scrollTo(superhero)}>
                <ListItemText primary="Superhero" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
        <p
          style={{
            fontSize: '20px',
            color: 'var(--blue)',
            fontWeight: 'bold',
            margin: '0',
            textAlign: 'left',
            // These following things are used for it to ensure that the \n is converted into an actual newline
            wordWrap: 'break-word',
            whiteSpace: 'pre-wrap',
          }}
          ref={action}
        >
          Action
        </p>

        <ImageList sx={{ width: '90vw', mb: '100px' }} cols={cols} gap={50}>
          {actionData.map((item) => (
            <ImageListItem key={item.img} onClick={submit}>
              <img
                src={`${item.img}?w=350&h=400&fit=crop&auto=format`}
                srcSet={`${item.img}?w=350&h=400&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
                style={{ cursor: 'pointer' }}
              />
              <ImageListItemBar title={item.title} position="top" />
            </ImageListItem>
          ))}
        </ImageList>
        <p
          style={{
            fontSize: '20px',
            color: 'var(--blue)',
            fontWeight: 'bold',
            margin: '0',
            textAlign: 'left',
            // These following things are used for it to ensure that the \n is converted into an actual newline
            wordWrap: 'break-word',
            whiteSpace: 'pre-wrap',
          }}
          ref={adventure}
        >
          Adventure
        </p>

        <ImageList sx={{ width: '90vw', mb: '100px' }} cols={cols} gap={50}>
          {adventureData.map((item) => (
            <ImageListItem key={item.img} onClick={submit}>
              <img
                src={`${item.img}?w=350&h=400&fit=crop&auto=format`}
                srcSet={`${item.img}?w=350&h=400&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
                style={{ cursor: 'pointer' }}
              />
              <ImageListItemBar title={item.title} position="top" />
            </ImageListItem>
          ))}
        </ImageList>
        <p
          style={{
            fontSize: '20px',
            color: 'var(--blue)',
            fontWeight: 'bold',
            margin: '0',
            textAlign: 'left',
            // These following things are used for it to ensure that the \n is converted into an actual newline
            wordWrap: 'break-word',
            whiteSpace: 'pre-wrap',
          }}
          ref={mystery}
        >
          Mystery
        </p>

        <ImageList sx={{ width: '90vw', mb: '100px' }} cols={cols} gap={50}>
          {mysteryData.map((item) => (
            <ImageListItem key={item.img} onClick={submit}>
              <img
                src={`${item.img}?w=350&h=400&fit=crop&auto=format`}
                srcSet={`${item.img}?w=350&h=400&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
                style={{ cursor: 'pointer' }}
              />
              <ImageListItemBar title={item.title} position="top" />
            </ImageListItem>
          ))}
        </ImageList>
        <p
          style={{
            fontSize: '20px',
            color: 'var(--blue)',
            fontWeight: 'bold',
            margin: '0',
            textAlign: 'left',
            // These following things are used for it to ensure that the \n is converted into an actual newline
            wordWrap: 'break-word',
            whiteSpace: 'pre-wrap',
          }}
          ref={superhero}
        >
          Superhero
        </p>

        <ImageList sx={{ width: '90vw', mb: '100px' }} cols={cols} gap={50}>
          {superheroData.map((item) => (
            <ImageListItem key={item.img} onClick={submit}>
              <img
                src={`${item.img}?w=350&h=400&fit=crop&auto=format`}
                srcSet={`${item.img}?w=350&h=400&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
                style={{ cursor: 'pointer' }}
              />
              <ImageListItemBar title={item.title} position="top" />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    </div>
  );
};

export default Genres;
