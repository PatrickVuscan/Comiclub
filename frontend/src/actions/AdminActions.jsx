import ENV from '../config';

export const getAllUsers = async (users) => {
  console.log('getAllUsers');

  try {
    const allUsers = await fetch(`${ENV.api_host}/api/users/all-users`, {
      credentials: 'include',
    });
    const allUsersJSON = await allUsers.json();

    // id, name, joinDate, comicsCount, episodeCount, viewCount, likeCount, commentCount
    const mappedAllUsers = allUsersJSON.map(
      ({ _id, username, email, comicsCount, joinDate, likes, commentsCount, episodeCount }) => ({
        id: _id,
        name: username,
        email,
        joinDate,
        comicsCount,
        episodeCount,
        commentsCount,
        likeCount: likes.length,
      })
    );

    users.setState({
      users: mappedAllUsers,
    });
  } catch (error) {
    console.log('Error Getting users');
    console.error(error);
  }
};

export const getUserCommentRowData = async (Row) => {
  const { episodeID } = Row.state;

  try {
    // get Episode Name
    const episode = await fetch(`${ENV.api_host}/api/episodes/${episodeID}`, {
      credentials: 'include',
    });
    const episodeJSON = await episode.json();

    const { comicID, name: episodeName } = episodeJSON;

    const comic = await fetch(`${ENV.api_host}/api/comics/${comicID}`, {
      credentials: 'include',
    });
    const comicJSON = await comic.json();
    const comicName = comicJSON.name;
    console.log(comicName);

    Row.setState({
      comicName,
      episodeName,
    });
  } catch (error) {
    console.log('Error Getting User Row Data');
    console.error(error);
  }
};

export const getCommentsByUserID = async (User, creatorID) => {
  console.log(`getCommentsByUserID: ${creatorID}`);
  console.log(User);

  const userComments = await fetch(`${ENV.api_host}/api/comments/userID/${creatorID}`, {
    credentials: 'include',
  });
  const userCommentsJSON = await userComments.json();
  console.log(userCommentsJSON);

  // commentID, comicName, episodeNumber, panelNumber, publishDate, commentContent
  const comments = userCommentsJSON.map(({ _id, episodeID, userID, body, publishDate }) => ({
    commentID: _id,
    userID,
    episodeID,
    publishDate,
    commentContent: body,
  }));

  User.setState({
    userID: User.userID,
    comments,
  });
};

export const deleteCommentByID = async (comment) => {
  console.log(comment);
  const { episodeID, userID, commentID } = comment.comment;
  console.log(`deleteCommentByID: ${userID} / ${episodeID} / ${commentID}`);

  const deleteRequest = new Request(`${ENV.api_host}/api/comments/comment`, {
    credentials: 'include',
    method: 'delete',
    body: JSON.stringify({
      userID,
      episodeID,
      commentID,
    }),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  });

  const deleteResponse = await fetch(deleteRequest);

  if (!deleteResponse.ok) {
    console.log('There was an error deleting this comic:', deleteResponse);
    const response = { msg: 'error' };
    return response;
  }

  const response = { msg: 'deleted' };
  return response;
};

export const deleteUserByID = (userID) => {
  console.log(`deleteUserByID: ${userID}`);
};

export default { getAllUsers, getCommentsByUserID, deleteCommentByID, deleteUserByID, getUserCommentRowData };
