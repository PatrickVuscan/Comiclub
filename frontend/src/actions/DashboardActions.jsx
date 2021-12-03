import comicThumb from '../assets/comicCover.jpg';
import episodeThumb from '../assets/episodeCover.png';

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

export const createComic = (thumb, name, description) => {
  console.log(`createComic: "${name}" : "${description}"`);
};
export const createEpisode = (comicID, thumb, name, description) => {
  console.log(`createEpisode: comicID: ${comicID} : "${name}" : "${description}"`);
};

export default { getComicsByUser, getEpisodesByComic, deleteComicById, deleteEpisodeById, createComic };
