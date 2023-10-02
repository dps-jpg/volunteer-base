import { FC } from 'react';
import classnames from 'classnames';

import cls from './HeaderMainPage.module.css';
import { Box, Button, Container, Typography } from '@mui/material';
import mainImage from 'shared/assets/volonter.jpg';

interface HeaderMainPageProps {
  className?: string;
}

export const HeaderMainPage: FC<HeaderMainPageProps> = ({ className }) => {
  return (
    <Box style={{ backgroundImage: `url("${mainImage}")` }} className={classnames(cls.HeaderMainPage, [className])}>
      <Container>
        <Box>
          <Typography className={cls.title}>Добро пожаловать на платформу добровольчества!</Typography>
          <Typography mt={{ md: 4, xs: 2 }} sx={{ width: { sm: 500, xs: '100%' } }} variant={'h6'}>
            Наша платформа предназначена для тех, кто желает внести свой вклад и помочь другим. Это пространство, чтобы объединить людей, желающих делать добрые дела и помогать тем, кто нуждается в поддержке. Здесь вы сможете найти различные возможности для добровольческой работы и участия в благотворительных проектах.
            Присоединяйтесь к нам и станьте частью нашей команды добровольцев. Вместе мы сможем сделать наш мир лучше.
          </Typography>
          <Button size={'large'} sx={{ mt: { md: 4, xs: 2 } }} variant={'contained'}>Стать добровольцем</Button>
        </Box>
      </Container>
    </Box>
  );
};
