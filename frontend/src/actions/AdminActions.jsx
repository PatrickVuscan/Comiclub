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

export const getCommentsByUserID = (User) => {
  const { userID } = User.state;
  console.log(`getCommentsByUserID: ${userID}`);

  function createCommentData(num) {
    return {
      commentID: `commentID_${num}`,
      comicName: 'Comic A',
      episodeNumber: num,
      panelNumber: Math.floor(Math.random() * 10),
      publishDate: `${Math.floor(Math.random() * 12)}/${Math.floor(Math.random() * 30)}/20${Math.floor(
        Math.random() * 21
      )}`,
      commentContent: `comment ${num} here by ${userID}`,
    };
  }

  const tempComments = [];

  for (let i = 1; i < 10; i += 1) {
    tempComments.push(createCommentData(i));
  }

  User.setState({
    userID: User.userID,
    comments: tempComments,
  });
};

export const deleteCommentByID = (commentID) => {
  console.log(`deleteCommentByID: ${commentID}`);
};

export const deleteUserByID = (userID) => {
  console.log(`deleteUserByID: ${userID}`);
};

export default { getAllUsers, getCommentsByUserID, deleteCommentByID, deleteUserByID };
