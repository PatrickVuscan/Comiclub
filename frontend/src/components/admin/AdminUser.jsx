import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useParams } from 'react-router-dom';

import { getUsername } from '../../actions/DashboardActions';
import AdminUserCommentTable from './AdminUserCommentTable';

const AdminUser = () => {
  const { userID } = useParams();
  const [username, setUsername] = React.useState({});

  React.useEffect(() => {
    const fetchData = async () => {
      const usernameResponse = await getUsername(userID);
      console.log(`AdminUser:username: ${usernameResponse}`);
      setUsername(usernameResponse);
    };
    fetchData();
  }, [userID]);

  console.log(`AdminUser:username2: ${username}`);

  return (
    <div>
      <Stack spacing={5} m={10} pt={3} sx={{ minWidth: 800 }}>
        <Stack spacing={1}>
          <Typography gutterBottom variant="h3" component="div">
            Admin Dashboard: User Comments
          </Typography>
          <Typography variant="body2" color="text.secondary">
            In the Admin User Dashboard, you can delete Comments.
          </Typography>
        </Stack>
        <Stack spacing={4}>
          <Typography gutterBottom variant="h4" component="div">
            {/* Comments by {username} */}
            Comments by {userID}
          </Typography>
          <AdminUserCommentTable userID={userID} />
        </Stack>
      </Stack>
    </div>
  );
};

export default AdminUser;
