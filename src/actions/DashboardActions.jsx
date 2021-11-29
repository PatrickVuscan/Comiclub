import comicThumb from '../assets/comicCover.jpg';
import episodeThumb from '../assets/episodeCover.png';

export const getComicsByUser = (comics) => {
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

  const placeholderDescription =
    'Comics is a medium used to express ideas with images, often combined with text or other visual information. It typically takes the form of a sequence of panels of images. Textual devices such as speech balloons, captions, and onomatopoeia can indicate dialogue, narration, sound effects, or other information.';

  const tempComics = [];

  tempComics.push(
    createComicData('comicA', 'Comic Title A', placeholderDescription, comicThumb, '01/01/01', 123, 12, 123, 798, 83)
  );
  tempComics.push(
    createComicData('comicB', 'Comic Title B', placeholderDescription, comicThumb, '02/02/02', 87, 872, 21, 107, 82)
  );
  tempComics.push(
    createComicData('comicC', 'Comic Title C', placeholderDescription, comicThumb, '03/03/03', 123, 12, 123, 798, 83)
  );
  tempComics.push(
    createComicData('comicD', 'Comic Title D', placeholderDescription, comicThumb, '04/04/04', 87, 872, 21, 107, 82)
  );
  tempComics.push(
    createComicData('comicE', 'Comic Title E', placeholderDescription, comicThumb, '05/05/05', 123, 12, 123, 798, 83)
  );

  comics.setState({
    comics: tempComics,
  });
};

export const getEpisodesByComic = (Comic) => {
  const { comicID } = Comic.state;

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

  const placeholderDescription =
    'Comics is a medium used to express ideas with images, often combined with text or other visual information. It typically takes the form of a sequence of panels of images. Textual devices such as speech balloons, captions, and onomatopoeia can indicate dialogue, narration, sound effects, or other information.';

  const tempEpisodes = [];

  tempEpisodes.push({
    id: 1,
    name: `ComicID: ${comicID} - Episode Title E`,
    description: placeholderDescription,
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
      2,
      `ComicID: ${comicID} - Episode Title D`,
      placeholderDescription,
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
      3,
      `ComicID: ${comicID} - Episode Title C`,
      placeholderDescription,
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
      4,
      `ComicID: ${comicID} - Episode Title B`,
      placeholderDescription,
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
      5,
      `ComicID: ${comicID} - Episode Title A`,
      placeholderDescription,
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
