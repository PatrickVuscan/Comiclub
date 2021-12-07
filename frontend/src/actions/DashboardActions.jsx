import ENV from '../config';

export const getComicsByUser = async (comics) => {
  console.log("Getting this user's comics");

  const comicsResponse = await fetch(`${ENV.api_host}/api/comics/userID`, {
    credentials: 'include',
  });

  if (!comicsResponse.ok) {
    console.log('There was an error retrieving your comics', comicsResponse.error);
    return;
  }

  const comicsJSON = await comicsResponse.json();

  const mappedComics = comicsJSON.map(({ _id, name, description, genre, thumbImage, publishDate, episodes, meta }) => ({
    id: _id,
    name,
    description,
    genre,
    thumb: thumbImage ? thumbImage.imageURL : undefined,
    publishDate: new Date(publishDate).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    episodeCount: episodes ? episodes.length : 0,
    viewCount: meta ? meta.views : 0,
    likeCount: meta ? meta.likes : 0,
  }));

  comics.setState({
    comics: mappedComics,
  });
};

export const getUsername = async (userID) => {
  console.log(`Getting username by ID ${userID}`);
  const usernameResponse = await fetch(`${ENV.api_host}/api/users/userID/${userID}`, {
    credentials: 'include',
  });
  if (!usernameResponse.ok) {
    console.log('There was an error retrieving the username', usernameResponse.error);
    return;
  }

  const usernameJSON = await usernameResponse.json();
  const { username } = usernameJSON;
  console.log(`actions: getUserName: username: ${username}`);
  return username;
};

export const getComic = async (comicID) => {
  console.log(`Getting the comic by ID ${comicID}`);

  try {
    const comicResponse = await fetch(`${ENV.api_host}/api/comics/${comicID}`, {
      credentials: 'include',
    });

    if (!comicResponse.ok) {
      console.log('There was an error retrieving your comics', comicResponse.error);
      return;
    }

    const comicJSON = await comicResponse.json();

    const { _id, name, description, genre, thumbImage, publishDate, episodes, meta } = comicJSON;

    return {
      id: _id,
      name,
      description,
      genre,
      thumb: thumbImage ? thumbImage.imageURL : undefined,
      publishDate: new Date(publishDate).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      episodeCount: episodes ? episodes.length : 0,
      episodes: episodes || [],
      viewCount: meta ? meta.views : 0,
      likeCount: meta ? meta.likes : 0,
    };
  } catch (error) {
    console.log('Error retrieving the comic');
    console.error(error);
    return {};
  }
};

export const getEpisodesByComic = async (Comic) => {
  const { comicID } = Comic.state;

  console.log(`getEpisodesByComic:  ${comicID}`);

  const comicResponse = await fetch(`${ENV.api_host}/api/episodes/comicID/${comicID}`, {
    credentials: 'include',
  });

  if (!comicResponse.ok) {
    console.log('There was an error retrieving your comics', comicResponse.error);
    return;
  }

  const comicJSON = await comicResponse.json();

  const mappedEpisodes = comicJSON.map(
    ({ _id, name, description, thumbImage, publishDate, panels, meta, comments }) => ({
      id: _id,
      name,
      description,
      thumb: thumbImage ? thumbImage.imageURL : undefined,
      panels: panels ? panels.imageURL : undefined,
      publishDate: new Date(publishDate).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      viewCount: meta ? meta.views : 0,
      comments: comments || [],
    })
  );

  Comic.setState({
    comicID,
    episodes: mappedEpisodes,
  });
};

export const deleteComicById = async (comicID) => {
  console.log(`deleteComicById: ${comicID}`);

  try {
    const deleteRequest = new Request(`${ENV.api_host}/api/comics/${comicID}`, {
      credentials: 'include',
      method: 'delete',
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
  } catch (error) {
    console.log('Error in delete Comic by ID');
    console.log(error);
  }
};

export const deleteEpisodeById = async (episodeID) => {
  console.log(`deleteEpisodeById: ${episodeID}`);

  try {
    const deleteRequest = new Request(`${ENV.api_host}/api/episodes/${episodeID}`, {
      credentials: 'include',
      method: 'delete',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    });

    const deleteResponse = await fetch(deleteRequest);

    if (!deleteResponse.ok) {
      console.log('There was an error deleting this episode:', deleteResponse);
      const response = { msg: 'error' };
      return response;
    }

    const response = { msg: 'deleted' };
    return response;
  } catch (error) {
    console.log('Error in delete episode by ID');
    console.log(error);
  }
};

export const createComic = async (thumb, name, description, genre) => {
  console.log(`createComic: "${name}" : ${genre} : ${description}`);

  try {
    const comicRequest = new Request(`${ENV.api_host}/api/comics`, {
      credentials: 'include',
      method: 'post',
      body: JSON.stringify({ name, description, genre }),
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    });

    const comicResponse = await fetch(comicRequest);

    if (comicResponse.status !== 200) {
      console.log('Error creating the comic');
      return false;
    }

    const comicResponseJSON = await comicResponse.json();

    // The data we are going to send in our request
    const imageData = new FormData();
    // ! NOTE!!! IT HAS TO USE APPEND
    // ! Using imageData.image = thumb for some reason does *NOT* work
    imageData.append('image', thumb);

    // Create our request constructor with all the parameters we need
    const thumbnailRequest = new Request(`${ENV.api_host}/api/comics/thumbnail/${comicResponseJSON._id}`, {
      credentials: 'include',
      method: 'post',
      body: imageData,
    });

    const thumbnailResponse = await fetch(thumbnailRequest);

    if (thumbnailResponse.status !== 200) {
      console.log('Error uploading the thumbnail of the comic');
      return false;
    }

    const thumbnailResponseJSON = await thumbnailResponse.json();

    return thumbnailResponseJSON;
  } catch (error) {
    console.log('Error creating the comic');
    console.error(error);
  }
};

export const updateComic = async (id, thumb, name, description, genre) => {
  console.log(`updateComic: "${name}" : ${genre} : ${description}`);

  try {
    const comicRequest = new Request(`${ENV.api_host}/api/comics/update/${id}`, {
      credentials: 'include',
      method: 'post',
      body: JSON.stringify({ name, description, genre }),
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    });

    const comicResponse = await fetch(comicRequest);

    if (comicResponse.status !== 200) {
      console.log("Error updating the comic's values.");
      return false;
    }

    const comicResponseJSON = await comicResponse.json();

    if (typeof thumb !== 'object') {
      return;
    }

    // The data we are going to send in our request
    const imageData = new FormData();
    // ! NOTE!!! IT HAS TO USE APPEND
    // ! Using imageData.image = thumb for some reason does *NOT* work
    imageData.append('image', thumb);

    // Create our request constructor with all the parameters we need
    const thumbnailRequest = new Request(`${ENV.api_host}/api/comics/thumbnail/${comicResponseJSON._id}`, {
      credentials: 'include',
      method: 'post',
      body: imageData,
    });

    const thumbnailResponse = await fetch(thumbnailRequest);

    if (thumbnailResponse.status !== 200) {
      console.log('Error uploading the thumbnail of the comic');
      return false;
    }

    const thumbnailResponseJSON = await thumbnailResponse.json();

    return thumbnailResponseJSON;
  } catch (error) {
    console.log('Error creating the comic');
    console.error(error);
  }
};

export const createEpisode = async (comicID, thumb, name, description, panels) => {
  console.log(`createEpisode: comicID: ${comicID} : "${name}" : "${description}"`);

  try {
    const episodeRequest = new Request(`${ENV.api_host}/api/episodes/episode`, {
      credentials: 'include',
      method: 'put',
      body: JSON.stringify({ comicID, name, description }),
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    });

    const episodeResponse = await fetch(episodeRequest);

    if (episodeResponse.status !== 200) {
      console.log('Error creating the episode');
      return false;
    }

    const episodeResponseJSON = await episodeResponse.json();

    // ! Send Thumbnail Image
    if (thumb) {
      const thumbImageData = new FormData();
      // ! NOTE!!! IT HAS TO USE APPEND
      // ! Using imageData.image = thumb for some reason does *NOT* work
      thumbImageData.append('image', thumb);

      // Create our request constructor with all the parameters we need
      const thumbnailRequest = new Request(`${ENV.api_host}/api/episodes/thumbnail/${episodeResponseJSON._id}`, {
        credentials: 'include',
        method: 'post',
        body: thumbImageData,
      });

      const thumbnailResponse = await fetch(thumbnailRequest);

      if (thumbnailResponse.status !== 200) {
        console.log('Error uploading the thumbnail of the comic');
        return false;
      }

      await thumbnailResponse.json();
    }

    if (panels) {
      // ! Send Panels
      const panelsData = new FormData();
      // ! NOTE!!! IT HAS TO USE APPEND
      // ! Using imageData.image = thumb for some reason does *NOT* work
      panelsData.append('panels', panels);

      // Create our request constructor with all the parameters we need
      const panelsRequest = new Request(`${ENV.api_host}/api/episodes/panels/${episodeResponseJSON._id}`, {
        credentials: 'include',
        method: 'post',
        body: panelsData,
      });

      const panelsResponse = await fetch(panelsRequest);

      if (panelsResponse.status !== 200) {
        console.log('Error uploading the thumbnail of the comic');
        return false;
      }

      panelsResponse.json();
    }

    return;
  } catch (error) {
    console.log('Error creating the comic');
    console.error(error);
  }
};

export const updateEpisode = async (id, thumb, name, description, panels) => {
  console.log(`updateEpisode: "${name}" : ${description}`);

  try {
    const episodeRequest = new Request(`${ENV.api_host}/api/episodes/update/${id}`, {
      credentials: 'include',
      method: 'post',
      body: JSON.stringify({ name, description }),
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    });

    const episodeResponse = await fetch(episodeRequest);

    if (episodeResponse.status !== 200) {
      console.log("Error updating the episode's values.");
      return false;
    }

    const episodeResponseJSON = await episodeResponse.json();

    if (thumb && typeof thumb === 'object') {
      // The data we are going to send in our request
      const imageData = new FormData();
      // ! NOTE!!! IT HAS TO USE APPEND
      // ! Using imageData.image = thumb for some reason does *NOT* work
      imageData.append('image', thumb);

      // Create our request constructor with all the parameters we need
      const thumbnailRequest = new Request(`${ENV.api_host}/api/episodes/thumbnail/${episodeResponseJSON._id}`, {
        credentials: 'include',
        method: 'post',
        body: imageData,
      });

      const thumbnailResponse = await fetch(thumbnailRequest);

      if (thumbnailResponse.status !== 200) {
        console.log('Error uploading the thumbnail of the comic');
        return false;
      }

      await thumbnailResponse.json();
    }

    if (panels && typeof panels === 'object') {
      // ! Send Panels
      const panelsData = new FormData();
      // ! NOTE!!! IT HAS TO USE APPEND
      // ! Using imageData.image = thumb for some reason does *NOT* work
      panelsData.append('panels', panels);

      // Create our request constructor with all the parameters we need
      const panelsRequest = new Request(`${ENV.api_host}/api/episodes/panels/${episodeResponseJSON._id}`, {
        credentials: 'include',
        method: 'post',
        body: panelsData,
      });

      const panelsResponse = await fetch(panelsRequest);

      if (panelsResponse.status !== 200) {
        console.log('Error uploading the thumbnail of the comic');
        return false;
      }

      await panelsResponse.json();
    }

    return;
  } catch (error) {
    console.log('Error creating the comic');
    console.error(error);
  }
};

export default {
  getComicsByUser,
  getComic,
  getEpisodesByComic,
  deleteComicById,
  deleteEpisodeById,
  createComic,
  updateComic,
  getUsername,
};
