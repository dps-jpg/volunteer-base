import { FC } from 'react';
import classnames from 'classnames';

import cls from './HeaderMainPage.module.css';
import { Box, Button, Container, Typography } from '@mui/material';
import mainImage from 'shared/assets/main.png';
import { Link } from 'react-router-dom';
import { RoutePath } from 'shared/config/routerConfig';

interface HeaderMainPageProps {
  className?: string;
}

export const HeaderMainPage: FC<HeaderMainPageProps> = ({ className }) => {
  return (
    <Box className={classnames(cls.HeaderMainPage, [className])}>
      <Container>
        <Box display="flex" alignItems="center">
          <Box>
            <Typography className={cls.title}>Добро пожаловать на платформу добровольчества!</Typography>
            <Typography className={cls.text} mt={{ md: 4, xs: 2 }} sx={{ width: { lg: 500, md: 400, sm: 400, xs: '100%' } }} variant={'subtitle1'}>
              Наша платформа предназначена для тех, кто желает внести свой вклад и помочь другим. Это пространство, чтобы объединить людей, желающих делать добрые дела и помогать тем, кто нуждается в поддержке. Здесь вы сможете найти различные возможности для добровольческой работы и участия в благотворительных проектах.
              Присоединяйтесь к нам и станьте частью нашей команды добровольцев. Вместе мы сможем сделать наш мир лучше.
            </Typography>
            <Link to={RoutePath.sign_in}>
              <Button size={'large'} sx={{ mt: { md: 4, xs: 2 }, backgroundColor: '#08819C' }} variant={'contained'}>Стать добровольцем</Button>
            </Link>
          </Box>
          <img src={mainImage} className={cls.image} alt="" />
        </Box>
      </Container>
    </Box>
  );
};
