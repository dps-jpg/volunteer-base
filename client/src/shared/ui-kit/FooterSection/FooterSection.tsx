import { FC, ReactNode } from 'react';

import cls from './FooterSection.module.css';
import { Box } from '@mui/material';

interface FooterSectionProps {
  children: ReactNode;
  title: string;
}

export const FooterSection: FC<FooterSectionProps> = ({ children, title }) => {
  return (
    <Box width={300}>
      <h4 className={cls.title}>{title}</h4>
      <hr className={cls.horizontalLine}/>
      {children}
    </Box>
  );
};
