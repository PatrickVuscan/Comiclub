import comicThumb from '../assets/comicCover.jpg';
import episodeThumb from '../assets/episodeCover.png';

export const getComicsByUser = (comics) => {
  console.log('getComicsByUser');
  function createComicData(
    id,
    name,
    description,
    thumb,
    publishDate,
    episodeCount,
    panelCount,
    viewCount,
    likeCount,
    commentCount
  ) {
    return {
      id,
      name,
      description,
      thumb,
      publishDate,
      episodeCount,
      panelCount,
      viewCount,
      likeCount,
      commentCount,
    };
  }

  const tempComics = [];

  tempComics.push(
    createComicData('comicA', 'Comic Title A', window.smallLorem, comicThumb, '01/01/01', 123, 12, 123, 798, 83)
  );
  tempComics.push(
    createComicData('comicB', 'Comic Title B', window.smallLorem, comicThumb, '02/02/02', 87, 872, 21, 107, 82)
  );
  tempComics.push(
    createComicData('comicC', 'Comic Title C', window.smallLorem, comicThumb, '03/03/03', 123, 12, 123, 798, 83)
  );
  tempComics.push(
    createComicData('comicD', 'Comic Title D', window.smallLorem, comicThumb, '04/04/04', 87, 872, 21, 107, 82)
  );
  tempComics.push(
    createComicData('comicE', 'Comic Title E', window.smallLorem, comicThumb, '05/05/05', 123, 12, 123, 798, 83)
  );

  comics.setState({
    comics: tempComics,
  });
};

export const getEpisodesByComic = (Comic) => {
  const { comicID } = Comic.state;
  console.log(`getEpisodesByComic:  ${comicID}`);

  function createEpisodeData(
    id,
    name,
    description,
    thumb,
    publishDate,
    number,
    panelCount,
    viewCount,
    likeCount,
    commentCount
  ) {
    return {
      id,
      name,
      description,
      thumb,
      publishDate,
      number,
      panelCount,
      viewCount,
      likeCount,
      commentCount,
    };
  }

  const tempEpisodes = [];

  tempEpisodes.push({
    id: 'episodeE',
    name: `ComicID: ${comicID} - Episode Title E`,
    description: window.smallLorem,
    thumb: episodeThumb,
    publishDate: '01/01/01',
    number: 5,
    panelCount: 12,
    viewCount: 123,
    likeCount: 798,
    commentCount: 33,
  });
  tempEpisodes.push(
    createEpisodeData(
      'episodeD',
      `ComicID: ${comicID} - Episode Title D`,
      window.smallLorem,
      episodeThumb,
      '02/02/02',
      4,
      872,
      21,
      107,
      82
    )
  );
  tempEpisodes.push(
    createEpisodeData(
      'episodeC',
      `ComicID: ${comicID} - Episode Title C`,
      window.smallLorem,
      episodeThumb,
      '03/03/03',
      3,
      12,
      123,
      798,
      83
    )
  );
  tempEpisodes.push(
    createEpisodeData(
      'episodeB',
      `ComicID: ${comicID} - Episode Title B`,
      window.smallLorem,
      episodeThumb,
      '04/04/04',
      2,
      872,
      21,
      107,
      82
    )
  );
  tempEpisodes.push(
    createEpisodeData(
      'episodeA',
      `ComicID: ${comicID} - Episode Title A`,
      window.smallLorem,
      episodeThumb,
      '05/05/05',
      1,
      12,
      123,
      798,
      89
    )
  );

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

export default { getComicsByUser, getEpisodesByComic, deleteComicById, deleteEpisodeById };
