import comicThumb from '../assets/comicCover.jpg';
import episodeThumb from '../assets/episodeCover.png';

// TODO: replace with server calls
export const getComicsByUser = (comics) => {
  function createComicData(
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
    createComicData('Comic Title A', placeholderDescription, comicThumb, '01/01/01', 123, 12, 123, 798, 83)
  );
  tempComics.push(
    createComicData('Comic Title B', placeholderDescription, comicThumb, '02/02/02', 87, 872, 21, 107, 82)
  );
  tempComics.push(
    createComicData('Comic Title C', placeholderDescription, comicThumb, '03/03/03', 123, 12, 123, 798, 83)
  );
  tempComics.push(
    createComicData('Comic Title D', placeholderDescription, comicThumb, '04/04/04', 87, 872, 21, 107, 82)
  );
  tempComics.push(
    createComicData('Comic Title E', placeholderDescription, comicThumb, '05/05/05', 123, 12, 123, 798, 83)
  );

  comics.setState({
    comics: tempComics,
  });
};

export const getEpisodesByComic = (episodes) => {
  function createEpisodeData(
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

  tempEpisodes.push(
    createEpisodeData('Episode Title E', placeholderDescription, episodeThumb, '01/01/01', 5, 12, 123, 798, 83)
  );
  tempEpisodes.push(
    createEpisodeData('Episode Title D', placeholderDescription, episodeThumb, '02/02/02', 4, 872, 21, 107, 82)
  );
  tempEpisodes.push(
    createEpisodeData('Episode Title C', placeholderDescription, episodeThumb, '03/03/03', 3, 12, 123, 798, 83)
  );
  tempEpisodes.push(
    createEpisodeData('Episode Title B', placeholderDescription, episodeThumb, '04/04/04', 2, 872, 21, 107, 82)
  );
  tempEpisodes.push(
    createEpisodeData('Episode Title A', placeholderDescription, episodeThumb, '05/05/05', 1, 12, 123, 798, 89)
  );

  episodes.setState({
    episodes: tempEpisodes,
  });
};

export default { getComicsByUser, getEpisodesByComic };
