import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { GetAllComics } from '../../actions/HomeLoggedInActions';
import styles from './HomeLoggedIn.module.css';

const HomeNotLoggedIn = () => {
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

  const [comics, setComics] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const allComics = await GetAllComics();
      console.log('Get All comics', allComics);
      if (comics.length > cols * 2) {
        setComics(allComics.slice(cols * 2 - 1));
      } else {
        setComics(allComics);
      }
    };

    fetchData();
  }, []);

  const submit = (e) => {
    e.preventDefault();

    history.push(`/login`);
  };

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

        <ImageList sx={{ width: '90vw' }} cols={cols} gap={50}>
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
          {comics.length % 3 === 1 && (
            <ImageListItem key="uniqueModifier">
              <img id="uniqueModifier" alt=" " style={{ width: '100%', height: '459px' }} />
            </ImageListItem>
          )}
        </ImageList>
      </div>
    </div>
  );
};

export default HomeNotLoggedIn;
