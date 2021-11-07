import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';

import ComicTable from './ComicTable';
import UserTable from './UserTable';

const Admin = () => {
  return (
    <div>
      <Stack spacing={5} m={10} pt={3} sx={{ minWidth: 800 }}>
        <Stack spacing={1}>
          <Typography gutterBottom variant="h3" component="div">
            Welcome to the Admin Panel!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            In the Admin Dashboard, you can delete Users and Comics.
          </Typography>
        </Stack>
        <Stack spacing={4}>
          <Typography gutterBottom variant="h4" component="div">
            Users
          </Typography>
          <UserTable />
          <Typography gutterBottom variant="h4" component="div">
            Comics
          </Typography>
          <ComicTable />
        </Stack>
      </Stack>
    </div>
  );
};

export default Admin;
