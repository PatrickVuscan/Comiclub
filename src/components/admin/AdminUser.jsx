import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';

import ComicTable from './ComicTable';
import CommentTable from './CommentTable';

const AdminUser = () => {
  return (
    <div>
      <Stack spacing={5} m={10} pt={3} sx={{ minWidth: 800 }}>
        <Stack spacing={1}>
          <Typography gutterBottom variant="h3" component="div">
            Welcome to the Admin Panel for UserA!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            In the Admin User Dashboard, you can delete Comments and Comics.
          </Typography>
        </Stack>
        <Stack spacing={4}>
          <Typography gutterBottom variant="h4" component="div">
            Comments
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Comments that UserA has posted.
          </Typography>
          <CommentTable />
          <Typography gutterBottom variant="h4" component="div">
            Comics
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Comics that UserA has uploaded.
          </Typography>
          <ComicTable />
        </Stack>
      </Stack>
    </div>
  );
};

export default AdminUser;
