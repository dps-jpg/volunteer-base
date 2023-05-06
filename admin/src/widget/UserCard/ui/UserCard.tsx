import { FC } from 'react';
import { UserTypes } from 'store/api/types/user';
import { Paper, Typography } from '@mui/material';

interface UserCardProps {
  user: UserTypes;
  orderNumber: number;
}

export const UserCard: FC<UserCardProps> = ({ user, orderNumber }) => {
  return (
    <Paper elevation={3} sx={{ p: '16px', width: '70%', m: '16px 0' }}>
      <Typography variant={'subtitle1'}>{orderNumber}  Имя: {`${user.secondName} ${user.firstName} ${user?.middleName ?? ''}`}</Typography>
      <Typography variant={'subtitle1'}>Почта: {user.email}</Typography>
      <Typography variant={'subtitle1'}>Телефон: {user.phone}</Typography>
      <Typography variant={'subtitle1'}>Город: {user.city}</Typography>
      <Typography variant={'subtitle1'}>Часы волонтерства: {user.hours}</Typography>
      <Typography variant={'subtitle1'}>Ранг: {user.rank}</Typography>
      <Typography variant={'subtitle1'}>Возраст: {user.age}</Typography>
    </Paper>
  );
};
