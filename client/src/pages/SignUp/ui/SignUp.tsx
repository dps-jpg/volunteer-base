import { FC, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import classnames from 'classnames';
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
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

import { RoutePath } from 'shared/config/routerConfig';
import { useRegistrationMutation } from 'store/api/auth';
import { writeLocalStorage } from 'shared/lib/localStorage';

import cls from './SignUp.module.css';

interface SignUpProps {
  className?: string;
}

export const SignUp: FC<SignUpProps> = ({ className }) => {
  const navigate = useNavigate();
  const [registration] = useRegistrationMutation();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');

  const handleClickShowPassword = () => { setShowPassword((show) => !show); };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleRegistration = async () => {
    if (!email || !password || !firstName || !secondName || !city) {
      alert('Заолните все поля');
      return;
    }
    try {
      const res = await registration({ email, password, phone, city, firstName, middleName, secondName }).unwrap();
      writeLocalStorage('token', res.accessToken);
      navigate(RoutePath.main);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <MainPageSection mt={20} className={classnames(cls.SignIn, [className])}>
      <Box pb={4} display={'flex'} justifyContent={'center'}>
        <Paper sx={{ p: { xs: 2, sm: 4 }, width: '500px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant={'h5'} textAlign={'center'}>Регистрация</Typography>
          <TextField required value={email} onChange={(event) => { setEmail(event.target.value); }} label="Email (login)" variant="outlined" />
          <TextField required value={secondName} onChange={(event) => { setSecondName(event.target.value); }} label="Фамилия" variant="outlined" />
          <TextField required value={firstName} onChange={(event) => { setFirstName(event.target.value); }} label="Имя" variant="outlined" />
          <TextField value={middleName} onChange={(event) => { setMiddleName(event.target.value); }} label="Отчество" variant="outlined" />
          <TextField value={phone} onChange={(event) => { setPhone(event.target.value); }} label="Номер телефона" variant="outlined" />
          <TextField required value={city} onChange={(event) => { setCity(event.target.value); }} label="Город проживания" variant="outlined" />
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
            <OutlinedInput
              fullWidth
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
          <Button onClick={handleRegistration}>Зарегистрироваться</Button>
          <Box>
            <Typography textAlign={'center'} variant={'subtitle2'} color={'text.second'}>Уже зарегистрированы?</Typography>
            <Link style={{ textDecoration: 'none' }} to={RoutePath.sign_in}>
              <Typography textAlign={'center'} variant={'subtitle2'}>
                Вход
              </Typography>
            </Link>
          </Box>
        </Paper>
      </Box>
    </MainPageSection>
  );
};
