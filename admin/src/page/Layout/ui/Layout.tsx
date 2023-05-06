import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { Header } from 'widget/Header';

export const Layout: FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </Box>
  );
};
