import comicCoverImg from '../assets/episodeCover.png';

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

export const getEpisodesByComicID = (episodes) => {
  const placeholderDescription =
    'Comics is a medium used to express ideas with images, often combined with text or other visual information. It typically takes the form of a sequence of panels of images. Textual devices such as speech balloons, captions, and onomatopoeia can indicate dialogue, narration, sound effects, or other information.';

  const tempEpisodes = [];

  tempEpisodes.push(
    createEpisodeData('Episode Title E', placeholderDescription, comicCoverImg, '01/01/01', 5, 12, 123, 798, 83)
  );
  tempEpisodes.push(
    createEpisodeData('Episode Title D', placeholderDescription, comicCoverImg, '02/02/02', 4, 872, 21, 107, 82)
  );
  tempEpisodes.push(
    createEpisodeData('Episode Title C', placeholderDescription, comicCoverImg, '03/03/03', 3, 12, 123, 798, 83)
  );
  tempEpisodes.push(
    createEpisodeData('Episode Title B', placeholderDescription, comicCoverImg, '04/04/04', 2, 872, 21, 107, 82)
  );
  tempEpisodes.push(
    createEpisodeData('Episode Title A', placeholderDescription, comicCoverImg, '05/05/05', 1, 12, 123, 798, 89)
  );

  episodes.setState({
    episodes: tempEpisodes,
  });
};

export default getEpisodesByComicID;
