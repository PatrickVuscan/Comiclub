import React from 'react';
import { useParams } from 'react-router-dom';

import styles from './ComicsSummary.module.css';
import comicCoverImg from '../../assets/comicCover.jpg';
import formatMetric from '../../utilities';

function fetchComicFromDB(comicId) {
  const comicDB = {
    ironman1: 'Ironman: The First Edition',
    ironman2: 'Ironman: The Second Edition',
    tokyo: 'Tokyo Ghoul',
    deathnote: 'Death Note',
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
              <h2>{comicName}</h2>
              <p>{formatMetric(numEpisodes, 'Episode')}</p>
              <p>{formatMetric(views, 'View')}</p>
              <p>{formatMetric(subs, 'Subscriber')}</p>
            </div>
            <h2>
              Like
              <br />
              Button
            </h2>
          </div>
          <div className={styles.description}>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComicsSummary;
