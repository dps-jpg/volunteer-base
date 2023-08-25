import { FC } from 'react';
import MyCareer from 'shared/assets/my-career-icon.png';
import MinMolIcon from 'shared/assets/min-mol-icon.png';
import cls from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { RoutePath } from 'shared/config/routerConfig';
import { NavLink } from 'shared/ui-kit/NavLink/NavLink';
import { Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useGetMeQuery } from 'store/api/auth';
import { Profile } from 'widget/Navbar/components/Profile';
import { useModalState } from 'shared/hooks/useModalState';
import classnames from 'classnames';

export const Navbar: FC = () => {
  const [isOpen, open, close] = useModalState();

  const { data: me } = useGetMeQuery();
  return (
    <div className={cls.Navbar}>
      <Container>
        <div className={cls.container}>
          <Link to={RoutePath.main} className={cls.icons}>
            <img src={MinMolIcon} className={cls.icon2} alt=""/>
            <img src={MyCareer} className={cls.icon1} alt=""/>
          </Link>
          {isOpen
            ? (
              <CloseIcon fontSize={'large'} onClick={close} sx={{ display: { xs: 'block', sm: 'none' }, zIndex: 10, cursor: 'pointer' }} />
              )
            : (
              <MenuIcon fontSize={'large'} onClick={open} sx={{ display: { xs: 'block', sm: 'none' }, cursor: 'pointer' }} />
              )}
          <div className={classnames(cls.nav, { [cls.active]: isOpen })}>
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
