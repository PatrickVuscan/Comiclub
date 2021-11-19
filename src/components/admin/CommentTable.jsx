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

import DeleteDialog from '../DeleteDialog';

function createUserData(comicName, episodeNumber, panelNumber, publishDate, commentContent) {
  return { comicName, episodeNumber, panelNumber, publishDate, commentContent };
}

const users = [
  createUserData('comicA', 2, 3, '01/01/01', 'hello world!'),
  createUserData('comicB', 4, 1, '02/02/02', 'this panel has so many pixels!'),
  createUserData('comicC', 3, 8, '03/03/03', 'did you see that??'),
  createUserData('comicD', 10, 3, '04/04/04', 'whens the next one?'),
  createUserData('comicE', 9, 4, '05/05/05', 'more panels please'),
];

const CommentTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Comic Name</TableCell>
            <TableCell align="right">Episode</TableCell>
            <TableCell align="right">Panel</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Comment</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.comicName} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {user.comicName}
              </TableCell>
              <TableCell align="right">{user.episodeNumber}</TableCell>
              <TableCell align="right">{user.panelNumber}</TableCell>
              <TableCell align="right">{user.publishDate}</TableCell>
              <TableCell align="right">{user.commentContent}</TableCell>
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

export default CommentTable;
