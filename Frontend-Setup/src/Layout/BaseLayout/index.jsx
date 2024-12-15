import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './BaseLayout.module.css';
import { Box } from '@mui/material';

const BaseLayout = ({ children }) => {
  return (
    <Box
      className={styles.BaseLayoutRoot}
      sx={{
        flex: 1,
        height: '100%',
      }}
    >
      {/* Uncomment and customize the following code if needed */}
      {/* 
      <Box className={styles.navbar}>
        <Box className={styles.navItems}>
          <img src={logo} alt='Logo' className={styles.logo} />
          <Tabs
            className={styles.navbarTabs}
            value={value}
            onChange={handleChange}
            aria-label="navbar"
          >
            <Tab value={'1'} label={"Dashboard"} className={styles.tabBtn} />
            <Tab value={'2'} label={"Team"} className={styles.tabBtn} />
            <Tab value={'3'} label={"Projects"} className={styles.tabBtn} />
            <Tab value={'4'} label={"Calendar"} className={styles.tabBtn} />
          </Tabs>
        </Box>
        <Box className={styles.navbtns}>
          <Typography
            className={styles.navbtns}
            onClick={() => { navigate('/auth/login'); }}
          >
            <LoginOutlinedIcon />&nbsp;Login/Register
          </Typography>
        </Box>
      </Box>
      */}
      <Box className={styles.children}>
        {children || <Outlet />}
      </Box>
    </Box>
  );
};

export default BaseLayout;
