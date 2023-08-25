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
          <Typography variant={'h2'}>Lorem ipsum</Typography>
          <Typography mt={{ md: 8, xs: 3 }} width={400} variant={'h6'}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci aliquid aspernatur atque culpa, deserunt, dolor eaque earum fuga illum ipsam numquam pariatur perferendis quam quod sapiente soluta voluptatem voluptatum?</Typography>
          <Button size={'large'} sx={{ mt: { md: 8, xs: 3 } }} variant={'contained'}>Стать добровольцем</Button>
        </Box>
      </Container>
    </Box>
  );
};
