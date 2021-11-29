export const getAllUsers = (users) => {
  console.log('getAllUsers');

  function createUserData(num) {
    return {
      id: `userID_${num}`,
      name: `User Name ${num}th`,
      joinDate: `${Math.floor(Math.random() * 12)}/${Math.floor(Math.random() * 30)}/20${Math.floor(
        Math.random() * 21
      )}`,
      comicsCount: Math.floor(Math.random() * 100),
      episodeCount: Math.floor(Math.random() * 100),
      viewCount: Math.floor(Math.random() * 1000),
      likeCount: Math.floor(Math.random() * 1000),
      commentCount: Math.floor(Math.random() * 1000),
    };
  }

  const tempUsers = [];

  for (let i = 1; i < 10; i += 1) {
    tempUsers.push(createUserData(i));
  }

  users.setState({
    users: tempUsers,
  });
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
