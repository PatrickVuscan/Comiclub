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

  const viewComic = (episode) => () => {
    const path = `${comicID}/${episode._id}`;
    history.push(path);
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(async () => {
    const comicResponse = await getComic(comicID);
    if (!comicResponse) {
      alert('This comic could not be found.');
      history.push('/home');
    }

    setComic(comicResponse);
    const comicLikedResponse = await userHasLiked(comicID);
    setIsLiked(comicLikedResponse);
  }, [comicID]);

  return (
    <div>
      <img className={styles.coverImage} src={comic.thumb ? comic.thumb : placeholderImage} alt="comicId cover" />
      <div className={styles.body}>
        <div className={styles.summary}>
          <div className={styles.comicSnapshot}>
            <div className={styles.metadata}>
              <div style={{ display: 'flex' }}>
                <h2 className={styles.headerMargin}>{comic.name ? comic.name.toUpperCase() : 'Comic'}</h2>
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
              <p style={{ marginTop: 0 }}>
                {formatMetric(comic.episodeCount, 'Episode')} <br />
                {formatMetric(comic.viewCount, 'View')} <br />
                {formatMetric(comic.likeCount, 'Like')}
              </p>
            </div>
          </div>
        </div>
        <h2 className={styles.headerMargin}>EPISODES</h2>
        <div className={styles.comicList}>
          {comic.episodes && comic.episodes.length ? (
            comic.episodes.map((episode, idx) => (
              <div onClick={viewComic(episode)} style={{ marginBottom: '2vh', cursor: 'pointer' }} key={uid(episode)}>
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
