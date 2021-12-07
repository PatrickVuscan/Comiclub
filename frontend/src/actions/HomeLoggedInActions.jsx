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

export const Combined = async () => {
  console.log(`Getting the combined comics`);
  try {
    const userResponse = await fetch(`${ENV.api_host}/api/users`, {
      credentials: 'include',
    });

    if (!userResponse.ok) {
      console.log('There was an error retrieving the user', userResponse.error);
      return;
    }

    const userJSON = await userResponse.json();

    const { username } = userJSON;

    const likesResponse = await fetch(`${ENV.api_host}/api/comics/user/likedComics`, {
      credentials: 'include',
    });

    if (!likesResponse.ok) {
      console.log('There was an error retrieving the user', likesResponse.error);
      return;
    }

    const likesJSON = await likesResponse.json();

    const otherComicsResponse = await fetch(`${ENV.api_host}/api/comics/retrieve/all-comics`, {
      credentials: 'include',
    });

    if (!otherComicsResponse.ok) {
      console.log('There was an error retrieving the user', otherComicsResponse.error);
      return;
    }

    const otherComicsJSON = await otherComicsResponse.json();

    console.log('Other Comics', otherComicsJSON);

    return {
      user: userJSON,
      username,
      likedComics: likesJSON,
      otherComics: otherComicsJSON,
    };
  } catch (error) {
    console.log('Error getting user information');
    console.error(error);
    return {};
  }
};

export const GetAllComics = async () => {
  console.log(`Getting all comics`);

  try {
    const comicsResponse = await fetch(`${ENV.api_host}/api/comics/retrieve/all-comics`, {
      credentials: 'include',
    });

    if (!comicsResponse.ok) {
      console.log('There was an error retrieving the user', comicsResponse.error);
      return;
    }

    const comics = await comicsResponse.json();

    return comics;
  } catch (error) {
    console.log('Error getting user information');
    console.error(error);
    return {};
  }
};

export const GetTopComics = async () => {
  console.log(`Getting all comics`);

  try {
    const comicsResponse = await fetch(`${ENV.api_host}/api/comics/retrieve/top-comics`, {
      credentials: 'include',
    });

    if (!comicsResponse.ok) {
      console.log('There was an error retrieving the user', comicsResponse.error);
      return;
    }

    const comics = await comicsResponse.json();

    return comics;
  } catch (error) {
    console.log('Error getting user information');
    console.error(error);
    return {};
  }
};

export default {
  getUser,
  getLikedComicID,
  Combined,
  GetAllComics,
  GetTopComics,
};
