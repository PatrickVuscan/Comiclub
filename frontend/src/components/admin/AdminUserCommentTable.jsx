import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { uid } from 'react-uid';

import { getCommentsByUserID } from '../../actions/AdminActions';
import AdminUserCommentRow from './AdminUserCommentRow';

class AdminUserCommentTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: props.userID,
      comments: [],
    };
  }

  componentDidMount() {
    getCommentsByUserID(this);
  }

  render() {
    const { userID, comments } = this.state;
    console.log(userID);
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
            {comments.map((comment) => (
              <AdminUserCommentRow comment={comment} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default AdminUserCommentTable;