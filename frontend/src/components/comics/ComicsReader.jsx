import Button from '@mui/material/Button';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { getEpisode } from '../../actions/ComicActions';
import styles from './ComicsReader.module.css';

const ComicsReader = () => {
  const { comicID, episodeID } = useParams();
  const [panel, setPanel] = React.useState();
  const [commentsArr, setCommentsArr] = React.useState([]);
  const history = useHistory();

  const navigateBack = () => {
    history.go(-2);
  };

  React.useEffect(async () => {
    const episodeResponse = await getEpisode(episodeID);
    if (!episodeResponse) {
      alert('This episode could not be found.');
      history.push('/home');
    }

    const {
      panels: { imageURL: panelPDF },
      comments,
    } = episodeResponse;
    setPanel(panelPDF);
    setCommentsArr(comments);
  }, [episodeID]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Button variant="contained" color="secondary" onClick={navigateBack}>
        Back!
      </Button>
      <div className={styles.container}>
        <iframe
          key={episodeID}
          className={styles.comicPanel}
          src={panel}
          scrolling="no"
          title={`${comicID}/${episodeID}`}
        />
        <div className={styles.commentsContainer} />
      </div>
    </div>
  );
};

export default ComicsReader;
