import { FC } from 'react';
import classnames from 'classnames';

import cls from './ProfilePage.module.css';
import { MainPageSection } from 'shared/ui-kit/MainPageSection/MainPageSection';
import { useGetMeQuery } from 'store/api/auth';
import { Box, Paper, Table, TableCell, TableContainer, TableRow, Typography } from '@mui/material';

interface ProfilePageProps {
  className?: string;
}

const createData = (
  key: string,
  value: string | number
) => {
  return { key, value };
};

export const ProfilePage: FC<ProfilePageProps> = ({ className }) => {
  const { data: me } = useGetMeQuery();
  return (
    <MainPageSection title={'Профиль'} mt={20} className={classnames(cls.ProfilePage, [className])}>
      <Box display={'flex'} justifyContent={'center'} pb={4}>
        {me && (
          <TableContainer sx={{ width: '500px' }} component={Paper}>
            <Table sx={{ p: 4 }}>
              <TableRow>
                <TableCell>Имя</TableCell>
                <TableCell>{me.secondName} { me.firstName } {me.middleName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Почта</TableCell>
                <TableCell>{me.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Номер телефона</TableCell>
                <TableCell>{me.phone || '-'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Место проживания</TableCell>
                <TableCell>{me.city}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Часы работ</TableCell>
                <TableCell>{me.hours}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Ранг</TableCell>
                <TableCell>{me.rank}</TableCell>
              </TableRow>
            </Table>
          </TableContainer>
        )}
      </Box>
    </MainPageSection>
  );
};
