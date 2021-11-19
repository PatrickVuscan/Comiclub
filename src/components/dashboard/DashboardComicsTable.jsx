import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Link } from 'react-router-dom';

import comicCoverImg from '../../assets/comicCover.jpg';
import DeleteDialog from '../DeleteDialog';
import styles from './Dashboard.css';

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

// TODO: replace with server calls
function getComicsByUserID(userID) {
  console.log(userID);

  const placeholderDescription =
    'Comics is a medium used to express ideas with images, often combined with text or other visual information. It typically takes the form of a sequence of panels of images. Textual devices such as speech balloons, captions, and onomatopoeia can indicate dialogue, narration, sound effects, or other information.';

  const comics = [
    createComicData('Comic Title A', placeholderDescription, comicCoverImg, '01/01/01', 123, 12, 123, 798, 83),
    createComicData('Comic Title B', placeholderDescription, comicCoverImg, '02/02/02', 87, 872, 21, 107, 82),
    createComicData('Comic Title C', placeholderDescription, comicCoverImg, '03/03/03', 123, 12, 123, 798, 83),
    createComicData('Comic Title D', placeholderDescription, comicCoverImg, '04/04/04', 87, 872, 21, 107, 82),
    createComicData('Comic Title E', placeholderDescription, comicCoverImg, '05/05/05', 123, 12, 123, 798, 83),
  ];

  return comics;
}

const ComicsTable = () => {
  const comicsByUser = getComicsByUserID(null);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox color="primary" />
            </TableCell>
            <TableCell>Comic</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="right">Published</TableCell>
            <TableCell align="right">Episodes Uploaded</TableCell>
            <TableCell align="right">Panels Uploaded</TableCell>
            <TableCell align="right">Views</TableCell>
            <TableCell align="right">Likes</TableCell>
            <TableCell align="right">Comments</TableCell>
            <TableCell align="right">Delete Comic</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {comicsByUser.map((comic) => (
            <TableRow key={comic.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>
                <Checkbox color="primary" />
              </TableCell>
              <TableCell align="right">
                <Box component="img" src={comic.thumb} sx={{ width: 200 }} />
              </TableCell>
              <TableCell component="th" scope="row">
                <Stack>
                  <Typography gutterBottom variant="h7" color="text.primary" component="div">
                    <Link to="/dashboardEpisodes" className="episodeLink">
                      {comic.name}
                    </Link>
                  </Typography>
                  <Typography variant="body2" color="text.secondary" component="div">
                    {comic.description}
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell align="right">{comic.publishDate}</TableCell>
              <TableCell align="right">{comic.episodeCount}</TableCell>
              <TableCell align="right">{comic.panelCount}</TableCell>
              <TableCell align="right">{comic.viewCount}</TableCell>
              <TableCell align="right">{comic.likeCount}</TableCell>
              <TableCell align="right">{comic.commentCount}</TableCell>
              <TableCell align="right">
                <DeleteDialog />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ComicsTable;
