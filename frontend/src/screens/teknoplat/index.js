import React from 'react';
import { useOutletContext, Outlet } from 'react-router-dom';

import 'primeicons/primeicons.css';
import './index.scss';
import { Box, Toolbar } from '@mui/material';
import Sidebar from './components/sidebar/Sidebar';

function TeknoPlat() {
  const { user, classId, classRoom, classMember } = useOutletContext();

  // TODO: Your screens

  return (
    <Box>
      <Box component="main" sx={{ flexGrow: 1, width: { sm: `calc(100% - 240px)` } }}>
        <Toolbar />
        <Outlet context={{ user, classId, classRoom, classMember }} />
      </Box>
      <Sidebar />
    </Box>
    // <div className="px-5">
    // </div>
  );
}

export default TeknoPlat;
