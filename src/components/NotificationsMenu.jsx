import { Typography } from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import styles from './NotificationsMenu.module.css';

const staticNotifications = [
  {
    title: 'New Comic!',
    details: 'A new comic has been released by Marvel',
    comicId: '10002313',
    new: true,
  },
  {
    title: 'New Series!',
    details: 'A new series has been released by DC Comics',
    seriesId: '1251152',
    new: true,
  },
  {
    title: 'New Comic!',
    details: 'A new comic has been released by One Piece',
    comicId: '8590',
    new: false,
  },
  {
    title: 'New Comic!',
    details:
      'A new comic has been released by MangaNation and this is just an example of an extremely long details message',
    comicId: '12111',
    new: false,
  },
  {
    title: 'New Series!',
    details: 'A new series has been released by kcxd ',
    comicId: '10002313',
    new: false,
  },
];

const NotificationsMenu = () => {
  const [notifications, setNotifications] = useState(staticNotifications);

  // Update the status of favourited or not
  const deleteNotification = (n) => (e) => {
    e.preventDefault();

    // Do some stuff to delete notification
    setNotifications((prevNotifications) => prevNotifications.filter((notif) => notif !== n));
  };

  return (
    <div className={styles.coverScroll}>
      <div className={styles.dropdown}>
        <Typography
          variant="h4"
          gutterBottom
          component="div"
          style={{ padding: '0.5rem', borderBottom: '1px solid white' }}
        >
          Notifications
        </Typography>
        {notifications.map((notification) => (
          <div className={styles.item}>
            <Typography variant="h6" gutterBottom component="div">
              {notification.title}
            </Typography>
            <Typography variant="body1" gutterBottom component="div">
              {notification.details}
            </Typography>
            <CloseIcon size="small" className={styles.X} onClick={deleteNotification(notification)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsMenu;
