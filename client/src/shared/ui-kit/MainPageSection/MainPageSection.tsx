import { FC, ReactNode } from 'react';
import classnames from 'classnames';

import cls from './MainPageSection.module.css';
import { Box, Container, Typography } from '@mui/material';

interface MainPageSectionProps {
  className?: string;
  title?: string;
  mt?: number;
  children: ReactNode;
}

export const MainPageSection: FC<MainPageSectionProps> = ({ className, title, children, mt }) => {
  return (
    <Container className={classnames(cls.MainPageSection, [className])}>
      <Box mt={mt ?? 8}>
        {title && <Typography sx={{ fontSize: { xs: 24, sm: 34, md: 48 } }} mb={4} variant={'h3'}>{title}</Typography>}
        {children}
      </Box>
    </Container>
  );
};
