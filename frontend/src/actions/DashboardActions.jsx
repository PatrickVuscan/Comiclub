import episodeThumb from '../assets/episodeCover.png';
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

export const getComic = async (comicID) => {
  console.log(`Getting the comic by ID ${comicID}`);

  const comicResponse = await fetch(`${ENV.api_host}/api/comics/${comicID}`, {
    credentials: 'include',
  });

  if (!comicResponse.ok) {
    console.log('There was an error retrieving your comics', comicResponse.error);
    return;
  }

  const comicJSON = await comicResponse.json();
  console.log(comicJSON);

  const { _id, name, description, genre, thumbImage, publishDate, episodes, meta } = comicJSON;

  return {
    id: _id,
    name,
    description,
    genre,
    thumb: thumbImage ? thumbImage.imageURL : undefined,
    publishDate: new Date(publishDate).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    episodeCount: episodes ? episodes.length : 0,
    viewCount: meta ? meta.views : 0,
    likeCount: meta ? meta.likes : 0,
  };
};

export const getEpisodesByComic = (Comic) => {
  const { comicID } = Comic.state;
  console.log(`getEpisodesByComic:  ${comicID}`);

  function createEpisodeData(num) {
    return {
      id: `episodeID_${num}`,
      name: `Episode Title ${num}`,
      description: window.smallLorem,
      thumb: episodeThumb,
      publishDate: `${Math.floor(Math.random() * 12)}/${Math.floor(Math.random() * 30)}/20${Math.floor(
        Math.random() * 21
      )}`,
      number: num,
      panelCount: Math.floor(Math.random() * 100),
      viewCount: Math.floor(Math.random() * 1000),
      likeCount: Math.floor(Math.random() * 1000),
      commentCount: Math.floor(Math.random() * 1000),
    };
  }

  const tempEpisodes = [];

  for (let i = 1; i < 10; i += 1) {
    tempEpisodes.push(createEpisodeData(i));
  }

  Comic.setState({
    comicID: Comic.comicID,
    episodes: tempEpisodes,
  });
};

export const deleteComicById = (comicID) => {
  console.log(`deleteComicById: ${comicID}`);
};

export const deleteEpisodeById = (episodeID) => {
  console.log(`deleteEpisodeById: ${episodeID}`);
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

export const createEpisode = (comicID, thumb, name, description) => {
  console.log(`createEpisode: comicID: ${comicID} : "${name}" : "${description}"`);
};

export default { getComicsByUser, getComic, getEpisodesByComic, deleteComicById, deleteEpisodeById, createComic };
