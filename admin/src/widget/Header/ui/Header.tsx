import { FC } from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { useNavigate, useMatch } from 'react-router-dom';

export const Header: FC = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/admin-auth');
  };
  const usersMatch = useMatch('/moderate-users');
  const newsMatch = useMatch('/moderate-news');
  const eventsMatch = useMatch('/moderate-EventsPage');

  const getStyle = (isActive: boolean) => ({
    mr: '16px',
    textDecoration: isActive ? 'underline' : 'none'
  });

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ cursor: 'pointer' }} onClick={() => { navigate('/moderate-users'); }}>
          <Typography variant={'h5'} sx={getStyle(Boolean(usersMatch))}>Пользователи</Typography>
        </Box>
        <Box sx={{ cursor: 'pointer' }} onClick={() => { navigate('/moderate-news'); }}>
          <Typography variant={'h5'} sx={getStyle(Boolean(newsMatch))}>Новости</Typography>
        </Box>
        <Box sx={{ cursor: 'pointer' }} onClick={() => { navigate('/moderate-EventsPage'); }}>
          <Typography variant={'h5'} sx={getStyle(Boolean(eventsMatch))}>Мероприятия</Typography>
        </Box>

        <Box sx={{ cursor: 'pointer', ml: 'auto' }} onClick={logout}>
          <Typography variant={'h6'}>Выйти</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
