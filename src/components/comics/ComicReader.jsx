import React from 'react';
import { useParams } from 'react-router-dom';

const ComicsReader = () => {
  const { comicId, episodeId } = useParams();

  return (
    <p>
      You are reading {comicId}, episode {episodeId}
    </p>
  );
};

export default ComicsReader;
