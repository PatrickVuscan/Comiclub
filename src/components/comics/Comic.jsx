import React from 'react';
import { useParams } from 'react-router-dom';

const ComicsReader = () => {
  const { comicId } = useParams();

  return <p>You are viewing a summary of {comicId}</p>;
};

export default ComicsReader;
