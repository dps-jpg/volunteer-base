import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  InputAdornment,
  IconButton,
  OutlinedInput,
  FormControl, InputLabel
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { useAuthMutation } from 'store/api/auth';
import { writeLocalStorage } from 'shared/lib/localStorage';

import cls from './Auth.module.css';

export const Auth: FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [passErr, setPassErr] = useState(false);

  const handleClickShowPassword = () => { setShowPassword((show) => !show); };

  const [auth] = useAuthMutation();

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    if (emailErr) setEmailErr(false);
    setEmail(event.target.value);
  };

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    if (passErr) setPassErr(false);
    setPassword(event.target.value);
  };

  const handleAuth = useCallback(async () => {
    if (!email) {
      setEmailErr(true);
      return;
    }
    if (!password) {
      setPassErr(true);
      return;
    }
    try {
      const data = await auth({ email, password }).unwrap();
      writeLocalStorage('token', data.accessToken);
      navigate('/admin');
    } catch (e) {
      console.log(e);
    }
  }, [email, password]);

  const handlePressEnter = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      void handleAuth();
    }
  }, [handleAuth]);

  useEffect(() => {
    window.addEventListener('keypress', handlePressEnter);
    return () => {
      window.removeEventListener('keypress', handlePressEnter);
    };
  }, [handleAuth]);

  return (
    <div className={cls.Auth}>
      <Paper className={cls.paper}>
        <Typography variant="h3">Авторизация</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '32px', marginBottom: '16px' }}>
          <TextField
            id="outlined-required"
            error={emailErr}
            required={true}
            label="Логин"
            variant="outlined"
            value={email}
            onChange={handleChangeEmail}
          />
          <FormControl variant="outlined" required={true} error={passErr}>
            <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
            <OutlinedInput
              id="outlined-required"
              label="Пароль"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handleChangePassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" size="large" onClick={handleAuth}>Войти</Button>
        </Box>
      </Paper>
    </div>
  );
};
