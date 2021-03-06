import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { likeComic, unlikeComic } from '../../actions/ComicActions';
import { Combined } from '../../actions/HomeLoggedInActions';
import styles from './HomeLoggedIn.module.css';

// Images for Recommendations

const HomeLoggedIn = () => {
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

  const [currUser, setcurrUser] = React.useState({});
  const [comics, setComics] = React.useState({ likedComics: [], otherComics: [] });
  const [combinedComics, setCombinedComics] = React.useState([]);
  const [updates, setUpdates] = React.useState(0);

  React.useEffect(() => {
    const fetchData = async () => {
      const combinedResponse = await Combined();
      setcurrUser(combinedResponse.user);
      setComics({
        likedComics: combinedResponse.likedComics,
        otherComics: combinedResponse.otherComics,
      });
    };

    fetchData();
  }, [updates]);

  React.useEffect(() => {
    const tempCombinedComics = [];
    const keys = {};
    let remainingComics = cols * 2;

    if (comics.likedComics) {
      for (let i = 0; remainingComics > 1 && i < comics.likedComics.length; i += 1) {
        if (!(comics.likedComics[i]._id in keys)) {
          keys[comics.likedComics[i]._id] = true;
          comics.likedComics[i].isLiked = true;
          tempCombinedComics.push(comics.likedComics[i]);
          remainingComics -= 1;
        }
      }
    }

    if (comics.otherComics && remainingComics > 0) {
      for (let i = 0; remainingComics > 1 && i < comics.otherComics.length; i += 1) {
        if (!(comics.otherComics[i]._id in keys)) {
          keys[comics.otherComics[i]._id] = true;
          tempCombinedComics.push(comics.otherComics[i]);
          remainingComics -= 1;
        }
      }
    }

    setCombinedComics(tempCombinedComics);
  }, [comics, cols]);

  const submit = (e) => {
    e.preventDefault();

    const comicID = e.target.id;
    history.push(`/comics/${comicID}`);
  };

  const heartClicked = (comic) => {
    if (comic.isLiked) {
      unlikeComic(comic._id);
    } else {
      likeComic(comic._id);
    }
    setUpdates((updatesOldVal) => updatesOldVal + 1);
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
        >{`Welcome, ${currUser.username}!\nHere are some of your Subscriptions`}</p>

        <ImageList sx={{ width: '90vw' }} cols={cols} gap={50}>
          {combinedComics.map((comic) => (
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
              <ImageListItemBar
                title={comic.name}
                position="top"
                actionIcon={
                  <IconButton
                    sx={{ color: comic.isLiked ? 'red' : 'white' }}
                    aria-label={`heart ${comic.name}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      heartClicked(comic);
                    }}
                  >
                    <FavoriteIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
          {combinedComics.length % cols !== 0 && (
            <ImageListItem key="uniqueModifier">
              <img id="uniqueModifier" alt=" " style={{ width: '100%', height: '459px' }} />
            </ImageListItem>
          )}
        </ImageList>
      </div>
    </div>
  );
};

export default HomeLoggedIn;
