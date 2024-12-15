import React, { useEffect, useState, useRef } from 'react';
import { Box, Button, Card, CardContent, Typography, Skeleton, Badge, Stack } from '@mui/material';
import ForwardToInboxTwoToneIcon from '@mui/icons-material/ForwardToInboxTwoTone';
import ReportTwoToneIcon from '@mui/icons-material/ReportTwoTone';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { convertToHour } from '../../libs/commonFxn';
import { useNavigate } from 'react-router';
import { getNotification, updateNotification } from '../../features/notification/notification.action';

const notificationIconAndColorLookup = (eventType) => {
  switch (eventType) {
    case 'leave_request':
      return {
        icon: <ForwardToInboxTwoToneIcon sx={{ fontSize: '2rem', color: '#3333ff' }} />,
        color: '#3333ff',
      };
    case 'leave_approve':
      return {
        icon: <CheckCircleTwoToneIcon sx={{ fontSize: '2rem', color: 'green' }} />,
        color: 'green',
      };
    case 'warning':
      return {
        icon: <ReportTwoToneIcon sx={{ fontSize: '2rem', color: '#e6e600' }} />,
        color: '#e6e600',
      };
    default:
      return {
        icon: <ForwardToInboxTwoToneIcon sx={{ fontSize: '2rem', color: '#3333ff' }} />,
        color: '#3333ff',
      };
  }
};

const NotificationCard = ({
  icon,
  color,
  title,
  body,
  datePublished,
  isRead,
  isLoading,
  uuid
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = async (uuid) => {
    await dispatch(updateNotification(uuid));
    switch (title) {
      case 'Leave request':
        navigate('/leave-summary/leave-requests');
        break;
      case 'Leave approve':
        navigate('/leave-summary/leave-approve');
        break;
      case 'warning':
        navigate('/warnings');
        break;
      default:
        navigate('/');
    }
  };

  if (isLoading) {
    return (
      <Card sx={{ marginBottom: '1rem', boxShadow: 3, borderRadius: '6px', width: '100%' }}>
        <CardContent>
          <Box display="flex" alignItems="center">
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="text" width="25%" sx={{ marginLeft: '1rem' }} />
            <Skeleton variant="circular" width={20} height={20} sx={{ marginLeft: 'auto' }} />
          </Box>
          <Skeleton variant="text" width="100%" sx={{ margin: '1rem 0' }} />
          <Box display="flex" flexWrap="wrap">
            <Skeleton variant="text" width="20%" sx={{ margin: '1rem 0' }} />
            <Skeleton variant="text" width="25%" sx={{ marginLeft: 'auto', marginTop: '1rem', marginBottom: '1rem' }} />
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      onClick={() => handleClick(uuid)}
      sx={{
        backgroundColor: isRead ? 'white' : 'rgb(220, 238, 255)',
        marginBottom: '1rem',
        boxShadow: 3,
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'transform 0.3s',
        width: '90%',
        '&:hover': { transform: 'scale(1.01)' }
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center">
          <Stack direction={"row"} justifyContent={"space-between"} width={"100%"}>
            <Stack direction={"row"}>
              <Box sx={{ margin: "5px 0" }}> {icon} </Box>
              <Typography variant="h6" sx={{ marginLeft: '1rem' }}>{title}</Typography>
            </Stack>
            <Typography variant="body2" sx={{ margin: "5px 10px" }}>
              {datePublished && convertToHour(datePublished.toString())}
            </Typography>
          </Stack>
          <Badge
            sx={{
              backgroundColor: isRead ? '#c6c6c6' : color,
              width: '1rem',
              height: '1rem',
              borderRadius: '0.5rem',
              marginLeft: 'auto',
              marginTop: '-5px',
              transition: 'background-color 0.3s',
              '&:hover': { backgroundColor: '#b0b0b0' }
            }}
          />
        </Box>
        <Typography variant="body1" sx={{ margin: '5px 0' }}>{body}</Typography>
      </CardContent>
    </Card>
  );
};

const NotificationCards = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10); 
  const { userNotification, count } = useAppSelector((state) => state.notification);
  const dispatch = useAppDispatch();
  const containerRef = useRef(null);

  useEffect(() => {
    const mappedNotifications = userNotification?.map((noti) => {
      const { icon, color } = notificationIconAndColorLookup(noti?.event_name);

      return {
        icon,
        color,
        title: noti?.event_name?.charAt(0)?.toUpperCase() + noti?.event_name?.slice(1)?.replace('_', ' '),
        body: noti?.message,
        datePublished: new Date(noti?.created_at)?.toLocaleString(),
        isRead: noti?.seen,
        uuid: noti?.uuid
      };
    });

    setNotifications(mappedNotifications);
  }, [userNotification]);

  const fetchMoreNotifications = async () => {
    setIsLoading(true);
    const pagination = { page, limit };
    await dispatch(getNotification({ pagination }));
    setPage(prevPage => prevPage + 1);
    setIsLoading(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const bottom = containerRef.current.scrollHeight === containerRef.current.scrollTop + containerRef.current.clientHeight;
        if (bottom && !isLoading) {
          fetchMoreNotifications();
        }
      }
    };

    const container = containerRef.current;
    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [fetchMoreNotifications, isLoading, page]);

  return (
    <Stack
      ref={containerRef}
      display="flex"
      flexDirection="column"
      justifyItems="center"
      alignItems="center"
      width={'95%'}
      paddingLeft={'5%'}
      sx={{ height: '80vh', overflowY: 'auto' }}
    >
      {notifications.length === 0 && !isLoading ? (
        <Typography variant="body1" sx={{ margin: '2rem 0' }}>No notifications available</Typography>
      ) : (
        notifications.map((notification, index) => (
          <NotificationCard
            key={index}
            icon={notification.icon}
            uuid={notification.uuid}
            color={notification.color}
            title={notification.title}
            body={notification.body}
            datePublished={notification.datePublished}
            dateExpires={notification.dateExpires}
            isRead={notification.isRead}
          />
        ))
      )}
      {isLoading && (
        <>
          <NotificationCard isLoading />
          <NotificationCard isLoading />
        </>
      )}
      {notifications.length < count && !isLoading && (
        <Box display="flex" justifyContent="center" sx={{ width: '100%', padding: '1rem' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={fetchMoreNotifications}
          >
            Load More
          </Button>
        </Box>
      )}
    </Stack>
  );
};

export default NotificationCards;
