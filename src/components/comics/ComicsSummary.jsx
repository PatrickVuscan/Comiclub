import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import formatMetric from '../../utilities';
import aotImage from '../home/images/aot.png';
import batmanImage from '../home/images/batman.png';
import gohImage from '../home/images/goh.png';
import ironman1Image from '../home/images/ironman.png';
import marvelImage from '../home/images/marvel.png';
import narutoImage from '../home/images/naruto.png';
import opImage from '../home/images/op.png';
import togImage from '../home/images/tog.png';
import ComicEpisodeCard from './ComicEpisodeCard';
import styles from './ComicsSummary.module.css';

function fetchComicFromDB(comicId) {
  const comicDB = {
    ironman1: 'Ironman: The First Edition',
    aot: 'Attack on Titan',
    batman: 'Batman Origins',
    marvel: 'Marvel',
    naruto: 'Naruto',
    op: 'One Piece',
    tog: 'Tower of God',
    goh: 'God of High School',
  };

  const comicPhotoDB = {
    ironman1: ironman1Image,
    aot: aotImage,
    batman: batmanImage,
    marvel: marvelImage,
    naruto: narutoImage,
    op: opImage,
    tog: togImage,
    goh: gohImage,
  };

  const episodes = ['a', 'b', 'c', 'd', 'a', 'b', 'c', 'd', 'a', 'b', 'c', 'd'];
  return {
    comicName: comicDB[comicId],
    comicCover: comicPhotoDB[comicId],
    episodes,
    numEpisodes: episodes.length,
    views: 100364,
    subs: 42124,
    likes: 10,
    description: window.smallLorem,
  };
}

const ComicsSummary = () => {
  const { comicId } = useParams();
  const { comicName, comicCover, episodes, numEpisodes, views, subs, likes, description } = fetchComicFromDB(comicId);

  const [isLiked, setIsLiked] = useState(false);

  return (
    <div>
      <img className={styles.coverImage} src={comicCover} alt="comicId cover" />
      <div className={styles.body}>
        <div className={styles.summary}>
          <div className={styles.comicSnapshot}>
            <div className={styles.metadata}>
              <h2 className={styles.headerMargin}>{comicName.toUpperCase()}</h2>
              <p>
                {formatMetric(numEpisodes, 'Episode')} <br />
                {formatMetric(views, 'View')} <br />
                {formatMetric(subs, 'Subscriber')} <br />
                {formatMetric(isLiked ? likes + 1 : likes, 'Like')}
              </p>
            </div>
            <IconButton
              sx={{ color: 'black' }}
              aria-label={`heart ${comicName}`}
              onClick={() => {
                setIsLiked(!isLiked);
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
            <p>{description}</p>
          </div>
        </div>
        <h2 className={styles.headerMargin}>EPISODES</h2>
        <div className={styles.comicList}>{episodes && episodes.map((i) => <ComicEpisodeCard episode={i} />)}</div>
      </div>
    </div>
  );
};

export default ComicsSummary;
