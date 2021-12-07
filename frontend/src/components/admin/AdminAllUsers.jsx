import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';

import AdminUserTable from './AdminAllUsersTable';

const AdminAllUsers = () => {
  // const [updates] = React.useState(0);

  return (
    <div>
      <Stack spacing={5} m={10} pt={3} sx={{ minWidth: 800 }}>
        <Stack spacing={1}>
          <Typography gutterBottom variant="h3" component="div">
            Admin Dashboard: Users
          </Typography>
          <Typography variant="body2" color="text.secondary">
            In the Admin Dashboard, you can delete Users.
          </Typography>
        </Stack>
        <Stack spacing={4}>
          <Typography gutterBottom variant="h4" component="div">
            All Users
          </Typography>
          <AdminUserTable />
        </Stack>
      </Stack>
    </div>
  );
};

export default AdminAllUsers;
