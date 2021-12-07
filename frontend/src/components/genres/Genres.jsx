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
import { createRef, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { GetGenreComics } from '../../actions/HomeLoggedInActions';
import styles from './Genres.module.css';

const Genres = () => {
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

  const [genres, setGenres] = useState({});

  const genreRefs = {};
  Object.keys(genres).forEach((genre) => {
    genreRefs[genre] = createRef();
    return createRef();
  });

  useEffect(() => {
    const fetchData = async () => {
      const genreComics = await GetGenreComics();
      setGenres(genreComics);
    };

    fetchData();
  }, []);

  function scrollTo(ref) {
    if (!ref.current) return;
    ref.current.scrollIntoView({ behavior: 'smooth' });
  }

  const submit = (e) => {
    e.preventDefault();

    const comicID = e.target.id;
    history.push(`/comics/${comicID}`);
  };

  const commonStyles = {
    bgcolor: 'background.paper',
    m: 1,
    borderColor: 'text.primary',
  };

  return (
    <div className={styles.container}>
      <div className={styles.subscriptions}>
        <p
          style={{
            fontSize: '30px',
            color: 'var(--blue)',
            fontWeight: 'bold',
            margin: '0 0 30px 0',
            // These following things are used for it to ensure that the \n is converted into an actual newline
            wordWrap: 'break-word',
            whiteSpace: 'pre-wrap',
          }}
        >
          Genres
        </p>
        <Box sx={{ bgcolor: 'background.paper', ...commonStyles, margin: '0 0 30px 0', border: 1 }}>
          <List style={{ display: 'flex', flexDirection: 'row', padding: 0 }}>
            {Object.keys(genres).map((genre) => (
              <>
                <ListItem disablePadding key={genre}>
                  <ListItemButton onClick={() => scrollTo(genreRefs[genre])}>
                    <ListItemText primary={genre} />
                  </ListItemButton>
                </ListItem>
                <Divider orientation="vertical" flexItem />
              </>
            ))}
          </List>
        </Box>
        {Object.entries(genres).map(([genre, comics]) => (
          <>
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
              ref={genreRefs[genre]}
            >
              {genre}
            </p>

            <ImageList sx={{ width: '90vw', mb: '100px' }} cols={cols} gap={50}>
              {comics.map((comic) => (
                <ImageListItem key={comic._id} onClick={submit}>
                  <img
                    id={comic._id}
                    src={`${comic.thumbImage?.imageURL}?w=350&h=400&fit=crop&auto=format`}
                    srcSet={`${comic.thumbImage?.imageURL}?w=350&h=400&fit=crop&auto=format&dpr=2 2x`}
                    alt={comic.name}
                    onError={(e) => {
                      e.target.src = 'imageNotFound.webp?w=350&h=400&fit=crop&auto=format';
                      e.target.srcSet = 'imageNotFound.webp?w=350&h=400&fit=crop&auto=format&dpr=2 2x';
                    }}
                    loading="lazy"
                    style={{ cursor: 'pointer' }}
                  />
                  <ImageListItemBar title={comic.name} position="top" />
                </ImageListItem>
              ))}
              {comics.length % cols !== 0 && (
                <ImageListItem key="uniqueModifier">
                  <img id="uniqueModifier" alt=" " style={{ width: '100%', height: '459px' }} />
                </ImageListItem>
              )}
            </ImageList>
          </>
        ))}
      </div>
    </div>
  );
};

export default Genres;
