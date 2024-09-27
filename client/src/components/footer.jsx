import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      sx={{
        backgroundColor: '#FFFFFF', // White background
        color: '#000000',            // Black font color
        padding: '10px',
        textAlign: 'center',
        position: 'relative',
        marginTop:'10px',
        bottom: 0,
        width: "100% ",
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)', // Optional: subtle shadow for the footer
      }}
    >
      <Typography variant="body1">
        All rights reserved © 2024
      </Typography>
    </Box>
  );
};

export default Footer