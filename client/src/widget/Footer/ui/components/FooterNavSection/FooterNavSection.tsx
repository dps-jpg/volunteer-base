import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { FooterSection } from 'shared/ui-kit/FooterSection/FooterSection';

import cls from './FooterNavSection.module.css';

export const FooterNavSection: FC = () => {
  return (
    <FooterSection title='Навигация'>
      <div className={cls.links}>
        <NavLink className={cls.link} to={'/news'}>Новости</NavLink>
        <NavLink className={cls.link} to={'/EventsPage'}>Мероприятия</NavLink>
        <NavLink className={cls.link} to={'/rating'}>Рейтинг</NavLink>
        <NavLink className={cls.link} to={'/about'}>О нас</NavLink>
        <NavLink className={cls.link} to={'/docs'}>Документы</NavLink>
      </div>
    </FooterSection>
  );
};
