import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { uid } from 'react-uid';

import { getAllUsers } from '../../actions/AdminActions';
import AdminUserRow from './AdminAllUsersRow';

class AdminAllUsersTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    // When the component enters the DOM
    // get all comics
    getAllUsers(this);
    console.log('mounted');
  }

  render() {
    const { users } = this.state;
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
              <AdminUserRow key={uid(user)} user={user} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default AdminAllUsersTable;
