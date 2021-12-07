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
  try {
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
  } catch (error) {
    console.log('LikeUnlike Error', error);
    return {};
  }
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

  const episodeJSON = await episodeResponse.json();
  return episodeJSON;
}

export async function postComment(episodeID, commentBody) {
  const updatedCommentRequest = new Request(`${ENV.api_host}/api/comments/`, {
    credentials: 'include',
    method: 'put',
    body: JSON.stringify({ episodeID, body: commentBody }),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  });
  const updatedCommentResponse = await fetch(updatedCommentRequest);
  return updatedCommentResponse.json();
}

export function viewEpisode(episodeID) {
  const viewEpisodeRequest = new Request(`${ENV.api_host}/api/episodes/view`, {
    credentials: 'include',
    method: 'post',
    body: JSON.stringify({ episodeID }),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  });
  return fetch(viewEpisodeRequest);
}

export default {
  likeComic,
  unlikeComic,
  userHasLiked,
  getEpisode,
  postComment,
  viewEpisode,
};
