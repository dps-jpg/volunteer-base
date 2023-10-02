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
            <Typography sx={{ fontSize: { xs: 32, sm: 48 } }} gutterBottom variant={'h3'}>
              Наша миссия
            </Typography>
            <Typography sx={{ fontSize: { xs: 16, sm: 20 } }} variant={'h6'}>
              Наша миссия – содействие развитию добровольчества и вклад положительных изменений в жизни людей через поддержку разнообразных благотворительных, социальных и экологических проектов. Мы стремимся вдохновить людей на добрые дела и создать платформу взаимопомощи для лучшего общества. Присоединяйтесь к нам и вместе мы сделаем больше добра!
            </Typography>
            <Button sx={{ mt: 2 }} size={'large'} variant={'contained'}>Присоединиться к нам</Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
