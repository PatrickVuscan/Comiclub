import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useParams } from 'react-router-dom';

// import ComicTable from './ComicTable';
import AdminUserCommentTable from './AdminUserCommentTable';

const AdminUser = () => {
  const { userID } = useParams();
  return (
    <div>
      <Stack spacing={5} m={10} pt={3} sx={{ minWidth: 800 }}>
        <Stack spacing={1}>
          <Typography gutterBottom variant="h3" component="div">
            Welcome to the Admin Panel for {userID}!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            In the Admin User Dashboard, you can delete Comments.
          </Typography>
        </Stack>
        <Stack spacing={4}>
          <Typography gutterBottom variant="h4" component="div">
            Comments by {userID}
          </Typography>
          <AdminUserCommentTable userID={userID} />
          {/* <Typography gutterBottom variant="h4" component="div">
            Comics
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Comics that UserA has uploaded.
          </Typography>
          <ComicTable /> */}
        </Stack>
      </Stack>
    </div>
  );
};

export default AdminUser;
