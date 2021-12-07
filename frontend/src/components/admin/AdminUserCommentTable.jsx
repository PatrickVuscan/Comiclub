import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';

import { getCommentsByUserID } from '../../actions/AdminActions';
import AdminUserCommentRow from './AdminUserCommentRow';

class AdminUserCommentTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
    };
  }

  componentDidMount() {
    const { userID } = this.props;
    getCommentsByUserID(this, userID);
  }

  componentDidUpdate(prevProps) {
    const { userID } = this.props;
    // eslint-disable-next-line react/destructuring-assignment
    if (prevProps.updates !== this.props.updates) {
      getCommentsByUserID(this, userID);
    }
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
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Comment</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {comments.map((comment) => (
              <AdminUserCommentRow userID={userID} comment={comment} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default AdminUserCommentTable;
