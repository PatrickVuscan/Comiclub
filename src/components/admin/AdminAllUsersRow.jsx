import { Typography } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { useHistory } from 'react-router-dom';

import DeleteDialog from '../DeleteDialog';

const AdminAllUsersRow = ({ user }) => {
  const { id, name, joinDate, comicsCount, episodeCount, viewCount, likeCount, commentCount } = user;
  const history = useHistory();

  const goToUser = (e) => {
    e.preventDefault();
    console.log(e);
    const userID = e.target.id;
    console.log(`userID: ${userID}`);
    const path = `admin/${userID}`;
    history.push(path);
  };

  return (
    <TableRow key={name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row" onClick={goToUser} id={id}>
        <Typography id={id}>{name}</Typography>
      </TableCell>
      <TableCell align="right">{joinDate}</TableCell>
      <TableCell align="right">{comicsCount}</TableCell>
      <TableCell align="right">{episodeCount}</TableCell>
      <TableCell align="right">{viewCount}</TableCell>
      <TableCell align="right">{likeCount}</TableCell>
      <TableCell align="right">{commentCount}</TableCell>
      <TableCell align="right">
        <DeleteDialog />
      </TableCell>
    </TableRow>
  );
};

export default AdminAllUsersRow;
