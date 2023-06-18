import { FC, useState } from 'react';
import classnames from 'classnames';

import cls from './SignIn.module.css';
import { MainPageSection } from 'shared/ui-kit/MainPageSection/MainPageSection';
import {
  Box, Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routerConfig';
import { useGetMeQuery, useLoginMutation } from 'store/api/auth';
import { writeLocalStorage } from 'shared/lib/localStorage';

interface SignInProps {
  className?: string;
}

export const SignIn: FC<SignInProps> = ({ className }) => {
  const [login] = useLoginMutation();
  const { refetch } = useGetMeQuery();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClickShowPassword = () => { setShowPassword((show) => !show); };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleLogin = async () => {
    if (!email || !password) {
      return;
    }
    try {
      const res = await login({ email, password }).unwrap();
      writeLocalStorage('token', res.accessToken);
      void refetch();
      navigate(RoutePath.main);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <MainPageSection mt={20} className={classnames(cls.SignIn, [className])}>
      <Box pb={4} display={'flex'} justifyContent={'center'}>
        <Paper sx={{ p: 4, width: '500px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant={'h5'} textAlign={'center'}>Авторизация</Typography>
          <TextField value={email} onChange={(event) => { setEmail(event.target.value); }} label="Логин" variant="outlined" />
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
            <OutlinedInput
              value={password}
              onChange={(event) => { setPassword(event.target.value); }}
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <Button onClick={handleLogin}>Войти</Button>
          <Box>
            <Typography textAlign={'center'} variant={'subtitle2'} color={'text.second'}>Еще не заригестрированы?</Typography>
            <Link style={{ textDecoration: 'none' }} to={RoutePath.sign_up}>
              <Typography textAlign={'center'} variant={'subtitle2'}>
                Регистрация
              </Typography>
            </Link>
          </Box>
        </Paper>
      </Box>
    </MainPageSection>
  );
};
