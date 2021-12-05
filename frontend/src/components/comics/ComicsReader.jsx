import React from 'react';
import { useParams } from 'react-router-dom';

import styles from './ComicsReader.module.css';

const ComicsReader = () => {
  const { comicId, episodeId } = useParams();
  return (
    <div className={styles.container}>
      <iframe
        className={styles.comicPanel}
        src="https://res.cloudinary.com/comiclub/image/upload/v1638668466/oruxxglzhqjxsqhwloho.pdf"
        scrolling="no"
        title={`${comicId}/${episodeId}`}
      />
      <div className={styles.commentsContainer} />
    </div>
  );
};

export default ComicsReader;
