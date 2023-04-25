import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button } from '@mui/material';

const Navigation = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', padding: '1em' }}>
      <Button component={Link} to="/" color="inherit">
        Discussions
      </Button>
      <Button component={Link} to="/issues" color="inherit">
        Issues
      </Button>
      <Button component={Link} to="/experts" color="inherit">
        Expert Analysis
      </Button>
      {/* Add more navigation buttons as needed */}
    </Box>
  );
};

export default Navigation;
