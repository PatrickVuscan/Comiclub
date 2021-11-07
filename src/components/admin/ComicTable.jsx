import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import React from 'react';

import DeleteDialog from './DeleteDialog';

function createComicData(
  comicName,
  username,
  publishDate,
  episodeCount,
  panelCount,
  viewCount,
  likeCount,
  commentCount
) {
  return { comicName, username, publishDate, episodeCount, panelCount, viewCount, likeCount, commentCount };
}

const comics = [
  createComicData('comicA', 'userA', '01/01/01', 123, 12, 123, 798, 83),
  createComicData('comicB', 'userA', '02/02/02', 87, 872, 21, 107, 82),
  createComicData('comicC', 'userD', '03/03/03', 123, 12, 123, 798, 83),
  createComicData('comicD', 'userD', '04/04/04', 87, 872, 21, 107, 82),
  createComicData('comicE', 'userE', '05/05/05', 123, 12, 123, 798, 83),
];

const ComicTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Comic Name</TableCell>
            <TableCell align="right">Username</TableCell>
            <TableCell align="right">Comic Published</TableCell>
            <TableCell align="right">Episodes Uploaded</TableCell>
            <TableCell align="right">Panels Uploaded</TableCell>
            <TableCell align="right">Views</TableCell>
            <TableCell align="right">Likes</TableCell>
            <TableCell align="right">Comments</TableCell>
            <TableCell align="right">Delete Comic</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {comics.map((comic) => (
            <TableRow key={comic.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {comic.comicName}
              </TableCell>
              <TableCell align="right">{comic.username}</TableCell>
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

export default ComicTable;
