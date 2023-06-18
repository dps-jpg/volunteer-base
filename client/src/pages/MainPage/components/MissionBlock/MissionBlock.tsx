import { FC } from 'react';
import classnames from 'classnames';

import cls from './MissionBlock.module.css';
import { Box, Button, Container, Typography } from '@mui/material';
import Background from 'shared/assets/volonter-background.jpeg';

interface MissionBlockProps {
  className?: string;
}

export const MissionBlock: FC<MissionBlockProps> = ({ className }) => {
  return (
    <Box style={{ backgroundImage: `url('${Background}')` }} className={classnames(cls.MissionBlock, [className])}>
      <Box bgcolor={'rgba(0, 0, 0, .5)'} height={'100%'}>
        <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
          <Box className={cls.paper}>
            <Typography gutterBottom variant={'h3'}>
              Наша миссия
            </Typography>
            <Typography variant={'h6'}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto commodi consectetur consequatur cumque dolorem eius esse excepturi expedita explicabo, magnam minima nemo nulla, numquam optio quidem reiciendis tempore velit voluptates.
            </Typography>
            <Typography gutterBottom variant={'h6'}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto commodi consectetur consequatur cumque dolorem eius esse excepturi expedita explicabo, magnam minima nemo nulla, numquam optio quidem reiciendis tempore velit voluptates.
            </Typography>
            <Button size={'large'} variant={'contained'}>Присоединиться к нам</Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
