import { FC } from 'react';
import MyCareer from 'shared/assets/my-career-icon.png';
import MinMolIcon from 'shared/assets/min-mol-icon.png';
import cls from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { RoutePath } from 'shared/config/routerConfig';
import { NavLink } from 'shared/ui-kit/NavLink/NavLink';
import { Container } from '@mui/material';
import { useGetMeQuery } from 'store/api/auth';
import { Profile } from 'widget/Navbar/components/Profile';

export const Navbar: FC = () => {
  const { data: me } = useGetMeQuery();
  return (
    <div className={cls.Navbar}>
      <Container fixed>
        <div className={cls.container}>
          <Link to={RoutePath.main} className={cls.icons}>
            <img src={MinMolIcon} className={cls.icon2} alt=""/>
            <img src={MyCareer} className={cls.icon1} alt=""/>
          </Link>
          <div className={cls.nav}>
            <NavLink to={RoutePath.main}>Главная</NavLink>
            <NavLink to={RoutePath.news}>Новости</NavLink>
            <NavLink to={RoutePath.events}>Меороприятия</NavLink>
            <NavLink to={RoutePath.about}>О нас</NavLink>
            {me
              ? (
                <Profile />
                )
              : (
                <NavLink to={RoutePath.sign_in}>Войти</NavLink>
                )}
          </div>
        </div>
      </Container>
    </div>
  );
};
