import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

export default function AppForgetPassword({ ForgetPasswordDrawerOpen, handleAuthDrawerToggle }) {
  return (
    <Drawer
      open={ForgetPasswordDrawerOpen}
      anchor="right"
      onClose={() => handleAuthDrawerToggle(false)} // Pass a function reference
    >
      <Box sx={{
          width: 400, // Set the width of the Drawer content here
          padding: 2,
        }}>
      </Box>
    </Drawer>
  );
}
