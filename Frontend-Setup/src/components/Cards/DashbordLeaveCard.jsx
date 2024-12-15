import React from 'react';
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import GradientDonutChart from './DonutChart';

const DashboardLeaveCard = ({ seriesData, title }) => {
  return (
    <Stack sx={{ width: '15vw', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
      <Card 
        variant="outlined" 
        sx={{ 
          width: '100%', 
          bgcolor: '#DCEEFF', 
          borderRadius: '20px', 
          padding: '10px', 
          boxShadow: 3,
          transition: '0.3s',
          '&:hover': {
            boxShadow: 6, 
          },
        }}
      >
        <CardContent sx={{ padding: '0px' }}>
          <Typography variant="h6" p={1} sx={{ fontWeight: 600, color: '#333' }}>
            {title}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <GradientDonutChart seriesData={seriesData} />
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default DashboardLeaveCard;
