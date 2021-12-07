import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import React from 'react';

import { getUserCommentRowData } from '../../actions/AdminActions';
import DeleteComment from './DeleteComment';

// eslint-disable-next-line react/prefer-stateless-function
class AdminUserCommentRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      episodeID: props.comment.episodeID,
      comicName: '',
      episodeName: '',
    };
  }

  componentDidMount() {
    getUserCommentRowData(this);
  }

  render() {
    const { episodeID, comicName, episodeName } = this.state;
    const { comment } = this.props;
    const { commentID, publishDate, commentContent } = comment;

    return (
      <TableRow key={commentID} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell component="th" scope="row">
          {comicName}
        </TableCell>
        <TableCell align="right">{episodeName}</TableCell>
        <TableCell align="right">{publishDate}</TableCell>
        <TableCell align="right">&quot;{commentContent}&quot;</TableCell>
        <TableCell align="right">
          <DeleteComment comment={comment} />
        </TableCell>
      </TableRow>
    );
  }
}

export default AdminUserCommentRow;
