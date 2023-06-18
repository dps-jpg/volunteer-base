import { FC } from 'react';
import { NavLink as RouterNavLink, NavLinkProps } from 'react-router-dom';
import classnames from 'classnames';

import cls from './NavLink.module.css';

const setClasses = ({ isActive }: { isActive: boolean }) => isActive ? classnames(cls.link, cls.active) : cls.link;

export const NavLink: FC<NavLinkProps> = ({ children, ...props }) => {
  return (
    <RouterNavLink className={setClasses} {...props}>{children}</RouterNavLink>
  );
};
