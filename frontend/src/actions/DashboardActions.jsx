import comicThumb from '../assets/comicCover.jpg';
import episodeThumb from '../assets/episodeCover.png';
import ENV from '../config';

export const getComicsByUser = (comics) => {
  console.log('getComicsByUser');
  function createComicData(number) {
    return {
      id: `ComicID_${number}`,
      name: `Comic Title ${number}`,
      description: window.smallLorem,
      thumb: comicThumb,
      publishDate: `${Math.floor(Math.random() * 12)}/${Math.floor(Math.random() * 30)}/20${Math.floor(
        Math.random() * 21
      )}`,
      episodeCount: number,
      panelCount: Math.floor(Math.random() * 100),
      viewCount: Math.floor(Math.random() * 1000),
      likeCount: Math.floor(Math.random() * 1000),
      commentCount: Math.floor(Math.random() * 1000),
    };
  }

  const tempComics = [];

  for (let i = 1; i < 10; i += 1) {
    tempComics.push(createComicData(i));
  }

  comics.setState({
    comics: tempComics,
  });
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
      method: 'post',
      body: JSON.stringify({ name, description, genre }),
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    });

    const comicResponse = await fetch(comicRequest);
    const comicResponseJSON = await comicResponse.json();

    if (comicResponse.status !== 200) {
      console.log('Error creating the comic');
      return false;
    }

    console.log('comicResponse', comicResponseJSON);

    console.log('Thumb', thumb);

    // The data we are going to send in our request
    const imageData = new FormData();
    // ! NOTE!!! IT HAS TO USE APPEND
    // ! Using imageData.image = thumb for some reason does *NOT* work
    imageData.append('image', thumb);

    console.log('imageData', imageData);

    // Create our request constructor with all the parameters we need
    const thumbnailRequest = new Request(`${ENV.api_host}/api/comics/thumbnail/${comicResponseJSON._id}`, {
      method: 'post',
      body: imageData,
    });

    const thumbnailResponse = await fetch(thumbnailRequest);
    console.log('thumbnailResponse', thumbnailResponse);

    const thumbnailResponseJSON = await thumbnailResponse.json();

    console.log('thumbnailResponseJSON', thumbnailResponseJSON);

    if (thumbnailResponse.status !== 200) {
      console.log('Error uploading the thumbnail of the comic');
      return false;
    }

    return thumbnailResponseJSON;
  } catch (error) {
    console.log('Error creating the comic');
    console.error(error);
  }
};

export const createEpisode = (comicID, thumb, name, description) => {
  console.log(`createEpisode: comicID: ${comicID} : "${name}" : "${description}"`);
};

export default { getComicsByUser, getEpisodesByComic, deleteComicById, deleteEpisodeById, createComic };
