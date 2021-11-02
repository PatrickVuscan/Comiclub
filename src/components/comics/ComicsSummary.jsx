import React from 'react';
import { useParams } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import styles from './ComicsSummary.module.css';
import comicCoverImg from '../../assets/comicCover.jpg';
import formatMetric from '../../utilities';
import ComicEpisodeCard from './ComicEpisodeCard';

function fetchComicFromDB(comicId) {
  const comicDB = {
    ironman1: 'Ironman: The First Edition',
    ironman2: 'Ironman: The Second Edition',
    tokyo: 'Tokyo Ghoul',
    deathnote: 'Death Note',
    aot: 'Attack on Titan',
    batman: 'Batman Origins',
    marvel: 'Marvel',
    naruto: 'Naruto',
    op: 'One Piece',
    tog: 'Tower of God',
    goh: 'God of High School',
  };

  const episodes = ['a', 'b', 'c', 'd', 'a', 'b', 'c', 'd', 'a', 'b', 'c', 'd'];
  return {
    comicName: comicDB[comicId],
    comicCover: comicCoverImg,
    episodes,
    numEpisodes: episodes.length,
    views: 100364,
    subs: 42124,
    description: window.smallLorem,
  };
}

const ComicsSummary = () => {
  const { comicId } = useParams();
  const { comicName, comicCover, episodes, numEpisodes, views, subs, description } = fetchComicFromDB(comicId);

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
                {formatMetric(subs, 'Subscriber')}
              </p>
            </div>
            <IconButton sx={{ color: 'black' }} aria-label={`heart ${comicName}`}>
              <FavoriteBorderIcon style={{ fontSize: '50px' }} />
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
