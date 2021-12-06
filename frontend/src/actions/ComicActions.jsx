import ENV from '../config';
import { getComic } from './DashboardActions';

export async function userHasLiked(comicID) {
  const likedResponse = await fetch(`${ENV.api_host}/api/comics/liked/${comicID}`, {
    credentials: 'include',
  });

  if (!likedResponse.ok) {
    console.log('There was an error checking if this comic was liked:', likedResponse);
    return;
  }

  return likedResponse.json();
}

async function likeUnlikeComicHelper(comicID, likeOrUnlike) {
  const likeRequest = new Request(`${ENV.api_host}/api/comics/${likeOrUnlike}`, {
    credentials: 'include',
    method: 'post',
    body: JSON.stringify({ comicID }),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  });

  const likeResponse = await fetch(likeRequest);

  if (!likeResponse.ok) {
    console.log('There was an error liking the comic:', likeResponse);
    return;
  }

  return getComic(comicID);
}

export async function likeComic(comicID) {
  return likeUnlikeComicHelper(comicID, 'like');
}

export async function unlikeComic(comicID) {
  return likeUnlikeComicHelper(comicID, 'unlike');
}

export async function getEpisode(episodeID) {
  const episodeResponse = await fetch(`${ENV.api_host}/api/episodes/${episodeID}`, {
    credentials: 'include',
  });

  if (!episodeResponse.ok) {
    console.log('There was an error retrieving this episode:', episodeResponse);
    return;
  }

  return episodeResponse.json();
}

export default {
  likeComic,
  unlikeComic,
  userHasLiked,
  getEpisode,
};