import { Box, Button, Stack, Typography, IconButton } from '@mui/material';
import React from 'react';
import styles from './UserProfile.module.css';
import CloseIcon from '@mui/icons-material/Close';
import Profile from '../../assets/Images/profilepicture.png';

function UserProfile({ handleClose, user }) {
    function formatDate(dateString) {
        const date = new Date(dateString);

        const day = String(date.getDate()).padStart(2, '0');
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    }

    return (
        <Box className={styles.root} >
            <Box className={styles.Head}>
                <Typography className={styles.title}>Profile Details</Typography>
                <IconButton className={styles.closeBtn} onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Stack direction={"row"} gap={6} p={3} width={"100%"}>
                <img src={Profile} alt="Profile" className={styles.profileImage} />
                <Stack gap={2} width={"50%"}>
                    <Stack direction={"row"}>
                        <Stack minWidth={"150px"}>
                            <Typography className={styles.heading}>User Name</Typography>
                            <Typography sx={{ fontSize: '16px' }}>{user?.username === null ? "- -" : user?.username}</Typography>
                        </Stack>
                        <Stack minWidth={"150px"}>
                            <Typography className={styles.heading}>Email</Typography>
                            <Typography sx={{ fontSize: '16px' }}>{user?.email}</Typography>
                        </Stack>
                    </Stack>
                    <Stack direction={"row"} justifyContent={"space-between"}>
                        <Stack gap={0} minWidth={"150px"}>
                            <Typography className={styles.heading}>Role</Typography>
                            <Typography sx={{ fontSize: '16px' }}>{user?.role_details?.name}</Typography>
                        </Stack>
                        <Stack minWidth={"150px"}>
                            {/* <Typography className={styles.heading}>Company</Typography>
                            <Typography sx={{ fontSize: '16px' }}>{user?.Company_detail?.name}</Typography> */}
                            <Typography className={styles.heading}>Join At</Typography>
                            <Typography sx={{ fontSize: '16px' }}>{formatDate(user?.created_at)}</Typography>
                        </Stack>
                    </Stack>
                    {/* <Stack direction={"row"} justifyContent={"space-between"}>
                        <Stack minWidth={"200px"}>
                            <Typography className={styles.heading}>Name</Typography>
                            <Typography sx={{ fontSize: '16px' }}>
                                {user?.name === null ? "-" : user?.name} {user?.last_name === null ? "-" : user?.last_name}
                            </Typography>
                        </Stack>
                        <Stack minWidth={"200px"}>
                            <Typography className={styles.heading}>Company</Typography>
                            <Typography sx={{ fontSize: '16px' }}>{user?.Company_detail?.name}</Typography>
                        </Stack>
                    </Stack> */}
                </Stack>
            </Stack>
        </Box>
    );
}

export default UserProfile;
