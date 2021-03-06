import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { uid } from 'react-uid';

import { getEpisode, postComment, viewEpisode } from '../../actions/ComicActions';
import { getUsername } from '../../actions/DashboardActions';
import styles from './ComicsReader.module.css';

const CommentCard = ({ commentData }) => {
  const [username, setUsername] = React.useState('');

  React.useEffect(() => {
    const fetchData = async () => {
      const usernameResponse = await getUsername(commentData.userID);
      setUsername(usernameResponse);
    };
    fetchData();
  }, [commentData]);

  return (
    <div className={styles.commentCard}>
      <Typography variant="subtitle2">{new Date(commentData.publishDate).toDateString()}</Typography>
      <Typography variant="h6" style={{ color: '#186ed1', marginBottom: 0 }}>
        {username}
      </Typography>
      <p>{commentData.body}</p>
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
    history.push(`/comics/${comicID}`);
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(async () => {
    const episodeResponse = await getEpisode(episodeID);
    if (!episodeResponse) {
      alert('This episode could not be found.');
      history.push('/home');
      return;
    }

    const { panels, comments } = episodeResponse;
    const { imageURL: panelPDF } = panels || {};
    setPanel(panelPDF);
    setCommentsArr(comments);
    viewEpisode(episodeID);
  }, [episodeID]);

  console.log(commentsArr);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Button variant="contained" color="secondary" onClick={navigateBack}>
        Back!
      </Button>
      <div className={styles.container}>
        {panel ? (
          <iframe className={styles.comicPanel} src={panel} title={`${comicID}/${episodeID}`} />
        ) : (
          <iframe className={styles.comicPanel} src="/imageNotFound.webp" title={`${comicID}/${episodeID}`} />
        )}
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
