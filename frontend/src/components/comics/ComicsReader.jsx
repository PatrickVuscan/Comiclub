import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { uid } from 'react-uid';

import { getEpisode, postComment, viewEpisode } from '../../actions/ComicActions';
import styles from './ComicsReader.module.css';

const CommentCard = ({ commentData }) => {
  return (
    <div className={styles.commentCard}>
      <p style={{ width: '40%' }}>{commentData.body}</p>
      <p>{new Date(commentData.publishDate).toDateString()}</p>
    </div>
  );
};

const ComicsReader = () => {
  const { comicID, episodeID } = useParams();
  const [panel, setPanel] = React.useState();
  const [commentsArr, setCommentsArr] = React.useState([]);
  const [newComment, setNewComment] = React.useState('');

  const finalDivRef = React.useRef();
  const history = useHistory();

  const navigateBack = () => {
    history.go(-2);
  };

  React.useEffect(async () => {
    const episodeResponse = await getEpisode(episodeID);
    if (!episodeResponse) {
      alert('This episode could not be found.');
      history.push('/home');
      return;
    }
    const {
      panels: { imageURL: panelPDF },
      comments,
    } = episodeResponse;
    setPanel(panelPDF);
    setCommentsArr(comments);
    viewEpisode(episodeID);
  }, [episodeID]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Button variant="contained" color="secondary" onClick={navigateBack}>
        Back!
      </Button>
      <div className={styles.container}>
        <iframe className={styles.comicPanel} src={panel} title={`${comicID}/${episodeID}`} />
        <div className={styles.commentsContainer}>
          <div className={styles.commentsBody}>
            {commentsArr && commentsArr.length ? (
              commentsArr.map((comment) => <CommentCard commentData={comment} key={uid(comment)} />)
            ) : (
              <p>No comments yet, be the first to comment!</p>
            )}
            <div ref={finalDivRef} />
          </div>
          <div className={styles.newCommentContainer}>
            <div className={styles.innerNewCommentContainer}>
              <OutlinedInput
                value={newComment}
                onChange={(e) => {
                  setNewComment(e.target.value);
                }}
              />
              <Button
                variant="outlined"
                color="primary"
                back
                size="large"
                type="submit"
                onClick={async (e) => {
                  if (newComment) {
                    const updatedComment = await postComment(episodeID, newComment);
                    if (updatedComment) {
                      setCommentsArr([...commentsArr, updatedComment]);
                    } else {
                      alert('Your comment could not be posted.');
                    }
                    setNewComment('');
                    console.log(finalDivRef.current);
                    finalDivRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                  }
                }}
              >
                Submit Comment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComicsReader;
