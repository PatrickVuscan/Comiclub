import React from 'react';
import { useParams } from 'react-router-dom';

import { getEpisode } from '../../actions/ComicActions';
import styles from './ComicsReader.module.css';

const ComicsReader = () => {
  const { comicID, episodeID } = useParams();
  const [panel, setPanel] = React.useState();
  const [commentsArr, setCommentsArr] = React.useState([]);

  React.useEffect(async () => {
    const episodeResponse = await getEpisode(episodeID);
    const {
      panels: { imageURL: panelPDF },
      comments,
    } = episodeResponse;
    setPanel(panelPDF);
    setCommentsArr(comments);
  }, [episodeID]);

  return (
    <div className={styles.container}>
      <iframe className={styles.comicPanel} src={panel} scrolling="no" title={`${comicID}/${episodeID}`} />
      <div className={styles.commentsContainer} />
    </div>
  );
};

export default ComicsReader;
