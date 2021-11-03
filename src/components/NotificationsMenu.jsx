import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';

import styles from './NotificationsMenu.module.css';
import useComponentVisible from './useComponentVisible';

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

const NotificationsMenu = ({ callback }) => {
  const [notifications, setNotifications] = useState(staticNotifications);
  const { ref, isComponentVisible } = useComponentVisible(true, callback);

  // Update the status of favourited or not
  const deleteNotification = (n) => (e) => {
    e.preventDefault();

    // Do some stuff to delete notification
    setNotifications((prevNotifications) => prevNotifications.filter((notif) => notif !== n));
  };

  const deleteAllNotifications = (e) => {
    e.preventDefault();

    // Do some stuff to delete notification
    setNotifications([]);
  };

  return (
    <div ref={ref}>
      {isComponentVisible && (
        <div className={styles.coverScroll}>
          <div className={styles.dropdown}>
            <div className={styles.header}>
              <Typography variant="h5" component="div" style={{ padding: '0.5rem', fontWeight: 'bold' }}>
                Notifications
              </Typography>
              <Button sx={{ lineHeight: '1rem', height: 'min-content' }} onClick={deleteAllNotifications}>
                Clear All
              </Button>
            </div>
            {notifications.map((notification) => (
              <div className={styles.item}>
                <Typography variant="h6" component="div">
                  {notification.title}
                </Typography>
                <Typography variant="body1" component="div">
                  {notification.details}
                </Typography>
                <CloseIcon size="small" className={styles.X} onClick={deleteNotification(notification)} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsMenu;
