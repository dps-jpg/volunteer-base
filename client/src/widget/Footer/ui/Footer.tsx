import { FC } from 'react';

import { FooterNavSection } from './components/FooterNavSection/FooterNavSection';
import { FooterFeedback } from './components/FooterFeedback/FooterFeedback';

import cls from './Footer.module.css';
import { Container } from '@mui/material';

export const Footer: FC = () => {
  return (
    <footer className={cls.Footer}>
      <Container>
        <div className={cls.container}>
          <div className={cls.sections}>
            <FooterNavSection />
            <FooterFeedback />
          </div>
          <p className={cls.license}>Copyright © 2010-2023 Freepik Company S.L. Все права защищены.</p>
        </div>
      </Container>
    </footer>
  );
};
