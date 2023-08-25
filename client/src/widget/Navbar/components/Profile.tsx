import { FC, useRef } from 'react';
import classnames from 'classnames';
import { Box, Button, Paper, Table, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { useModalState } from 'shared/hooks/useModalState';
import { useGetMeQuery } from 'store/api/auth';
import { useOnClickOutside } from 'shared/hooks/useClickOutside';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routerConfig';

interface ProfileProps {
  className?: string;
}

export const Profile: FC<ProfileProps> = ({ className }) => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const { data: me, refetch } = useGetMeQuery();

  const [isOpen, open, close] = useModalState(false);

  const handleToggle = () => {
    isOpen ? close() : open();
  };

  useOnClickOutside(ref, close);

  const handleLogout = () => {
    localStorage.removeItem('token');
    void refetch();
    navigate(RoutePath.sign_in);
  };

  return (
    <Box ref={ref} position={'relative'} className={classnames([className])}>
      <Typography
        fontFamily={'Montserrat'}
        fontSize={20}
        fontWeight={600}
        onClick={handleToggle}
        sx={{ cursor: 'pointer', fontSize: { sm: 16, md: 20 } }}
      >
        Профиль
      </Typography>
      {isOpen && me && (
      <TableContainer
        sx={{
          width: '300px',
          position: 'absolute',
          bottom: -8,
          left: {
            xs: 0,
            sm: 'auto'
          },
          right: {
            xs: 'auto',
            sm: 0
          },
          transform: 'translateY(100%)',
          zIndex: 20
        }}
        component={Paper}
      >
        <Table>
          <TableRow>
            <TableCell sx={{ p: 1 }}>Имя</TableCell>
            <TableCell sx={{ p: 1 }}>{me.secondName} { me.firstName } {me.middleName}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ p: 1 }}>Почта</TableCell>
            <TableCell sx={{ p: 1 }}>{me.email}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ p: 1 }}>Номер телефона</TableCell>
            <TableCell sx={{ p: 1 }}>{me.phone || '-'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ p: 1 }}>Место проживания</TableCell>
            <TableCell sx={{ p: 1 }}>{me.city}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ p: 1 }}>Часы работ</TableCell>
            <TableCell sx={{ p: 1 }}>{me.hours}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ p: 1 }}>Ранг</TableCell>
            <TableCell sx={{ p: 1 }}>{me.rank}</TableCell>
          </TableRow>
          <TableRow sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={handleLogout}>Выйти</Button>
          </TableRow>
        </Table>
      </TableContainer>
      )}
    </Box>
  );
};
