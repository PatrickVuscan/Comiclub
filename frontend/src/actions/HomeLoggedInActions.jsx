import ENV from '../config';

export const getUser = async (email) => {
  console.log(`Getting the User by email ${email}`);

  const userResponse = await fetch(`${ENV.api_host}/api/users/email/${email}`, {
    credentials: 'include',
  });

  if (!userResponse.ok) {
    console.log('There was an error retrieving the user', userResponse.error);
    return;
  }

  const userJSON = await userResponse.json();

  const { _id, username } = userJSON;

  return {
    id: _id,
    username,
  };
};

export const getLikedComicID = async (username) => {
  console.log(`Getting the User by email ${username}`);

  const userResponse = await fetch(`${ENV.api_host}/api/users/${username}/likes`, {
    credentials: 'include',
  });

  if (!userResponse.ok) {
    console.log('There was an error retrieving the user', userResponse.error);
    return;
  }

  const userJSON = await userResponse.json();

  console.log('The JSON');
  console.log(userJSON);

  const { likes } = userJSON;

  return {
    likes,
  };
};

export default {
  getUser,
  getLikedComicID,
};
