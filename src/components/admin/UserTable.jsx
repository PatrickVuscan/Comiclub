import DeleteIcon from '@mui/icons-material/Delete';
// import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Admin.css';
import DeleteDialog from './DeleteDialog';

function createUserData(name, joinDate, comicsCount, episodeCount, viewCount, likeCount, commentCount) {
  return { name, joinDate, comicsCount, episodeCount, viewCount, likeCount, commentCount };
}

const users = [
  createUserData('userA', '01/01/01', 123, 12, 123, 798, 83),
  createUserData('userB', '02/02/02', 87, 872, 21, 107, 82),
  createUserData('userC', '03/03/03', 123, 12, 123, 798, 83),
  createUserData('userD', '04/04/04', 87, 872, 21, 107, 82),
  createUserData('userE', '05/05/05', 123, 12, 123, 798, 83),
];

const UserTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell align="right">Join Date</TableCell>
            <TableCell align="right">Comics Uploaded</TableCell>
            <TableCell align="right">Episodes Uploaded</TableCell>
            <TableCell align="right">Comics Viewed</TableCell>
            <TableCell align="right">Comics Liked</TableCell>
            <TableCell align="right">Comments Posted</TableCell>
            <TableCell align="right">Delete User</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                <Link to="/adminuser" className="userLink">
                  {user.name}
                </Link>
              </TableCell>
              <TableCell align="right">{user.joinDate}</TableCell>
              <TableCell align="right">{user.comicsCount}</TableCell>
              <TableCell align="right">{user.episodeCount}</TableCell>
              <TableCell align="right">{user.viewCount}</TableCell>
              <TableCell align="right">{user.likeCount}</TableCell>
              <TableCell align="right">{user.commentCount}</TableCell>
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

export default UserTable;
