import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.secondary.main,
        color: (theme) => theme.palette.secondary.contrastText,
        padding: '1em',
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1" align="center">
          © 2023 CiviCenter. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
