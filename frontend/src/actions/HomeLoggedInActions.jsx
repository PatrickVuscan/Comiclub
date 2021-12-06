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

export const Combined = async (email) => {
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

  const userResponse1 = await fetch(`${ENV.api_host}/api/users/${username}/likes`, {
    credentials: 'include',
  });

  if (!userResponse1.ok) {
    console.log('There was an error retrieving the user', userResponse1.error);
    return;
  }

  const userJSON1 = await userResponse1.json();

  console.log('The JSON');
  console.log(userJSON1);

  const { likes } = userJSON1;
  console.log(likes[0]);
  const IDcomic = likes[0];
  const path = `${ENV.api_host}/api/comics/${IDcomic}`;
  console.log(path);
  const userResponse2 = await fetch(`${ENV.api_host}/api/comics/${IDcomic}`, {
    credentials: 'include',
  });
  if (!userResponse2.ok) {
    console.log('There was an error retrieving the user', userResponse2.error);
    return;
  }
  const userJSON2 = await userResponse2.json();
  console.log(userJSON2.thumbImage.imageURL);
  return {
    name: userJSON2.name,
    imageURL: userJSON2.thumbImage.imageURL,
    username: userJSON.username,
    numComics: userJSON1.likes.length,
  };
  //   return {
  //     likes,
  //   };
};

export default {
  getUser,
  getLikedComicID,
  Combined,
};
