import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { uid } from 'react-uid';

import { likeComic, unlikeComic, userHasLiked } from '../../actions/ComicActions';
import { getComic } from '../../actions/DashboardActions';
import formatMetric from '../../utilities';
import placeholderImage from '../home/images/naruto.png';
import ComicEpisodeCard from './ComicEpisodeCard';
import styles from './ComicsSummary.module.css';

const ComicsSummary = () => {
  const { comicID } = useParams();
  const [comic, setComic] = React.useState({});
  const [isLiked, setIsLiked] = React.useState(false);
  const history = useHistory();

  React.useEffect(async () => {
    const comicResponse = await getComic(comicID);
    if (!comicResponse) {
      alert('This comic could not be found.');
      history.push('/home');
    }
    const comicLikedResponse = await userHasLiked(comicID);
    setComic(comicResponse);
    setIsLiked(comicLikedResponse);
  }, [comicID]);

  return (
    <div>
      <img className={styles.coverImage} src={comic.thumb ? comic.thumb : placeholderImage} alt="comicId cover" />
      <div className={styles.body}>
        <div className={styles.summary}>
          <div className={styles.comicSnapshot}>
            <div className={styles.metadata}>
              <h2 className={styles.headerMargin}>{comic.name ? comic.name.toUpperCase() : 'Comic'}</h2>
              <p>
                {formatMetric(comic.episodeCount, 'Episode')} <br />
                {formatMetric(comic.viewCount, 'View')} <br />
                {formatMetric(comic.likeCount, 'Like')}
              </p>
            </div>
            <IconButton
              sx={{ color: 'black' }}
              aria-label={`heart ${comic.name}`}
              onClick={() => {
                setIsLiked(!isLiked);
                const func = isLiked ? unlikeComic : likeComic;
                const prefix = isLiked ? '' : 'un';
                func(comicID)
                  .then((res) => {
                    if (res) {
                      setComic(res);
                    } else {
                      alert(`This comic could not be ${prefix}liked.`);
                    }
                  })
                  .catch((err) => console.log(err));
              }}
            >
              {isLiked ? (
                <FavoriteIcon style={{ fontSize: '50px', color: 'red' }} />
              ) : (
                <FavoriteBorderIcon style={{ fontSize: '50px' }} />
              )}
            </IconButton>
          </div>
          <div className={styles.description}>
            <p>{comic.description}</p>
          </div>
        </div>
        <h2 className={styles.headerMargin}>EPISODES</h2>
        <div className={styles.comicList}>
          {comic.episodes && comic.episodes.length ? (
            comic.episodes.map((episode, idx) => (
              <div
                onClick={() => {
                  const path = `${comicID}/${episode._id}`;
                  history.push(path);
                }}
                style={{ marginBottom: '2vh' }}
                key={uid(episode)}
              >
                <ComicEpisodeCard episode={episode} number={idx + 1} />
              </div>
            ))
          ) : (
            <p>
              Sorry, there are no episodes available for <b>{comic.name}</b>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComicsSummary;
