import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import React from 'react';

import DeleteComment from './DeleteComment';

// eslint-disable-next-line react/prefer-stateless-function
class AdminUserCommentRow extends React.Component {
  render() {
    const { comment } = this.props;
    const { commentID, comicName, episodeNumber, panelNumber, publishDate, commentContent } = comment;

    return (
      <TableRow key={commentID} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell component="th" scope="row">
          {comicName}
        </TableCell>
        <TableCell align="right">{episodeNumber}</TableCell>
        <TableCell align="right">{panelNumber}</TableCell>
        <TableCell align="right">{publishDate}</TableCell>
        <TableCell align="right">"{commentContent}"</TableCell>
        <TableCell align="right">
          <DeleteComment commentID={commentID} commentContent={commentContent} />
        </TableCell>
      </TableRow>
    );
  }
}

export default AdminUserCommentRow;
