import { FC } from 'react';

import { Box, Paper, Typography } from '@mui/material';
import { MainPageSection } from 'shared/ui-kit/MainPageSection/MainPageSection';

interface LinksProps {
  className?: string;
}

const arr = Array.from(Array(6));

export const Links: FC<LinksProps> = () => {
  return (
    <MainPageSection title={'Полезные сылки'}>
      <Box flexWrap={'wrap'} display={'flex'} justifyContent={'space-between'}>
        {arr.map((item, index) => (
          <Paper sx={{ width: { xs: '100%', sm: '48%', md: '31%' }, mt: 2, cursor: 'pointer', minWidth: 260, display: 'flex', justifyContent: 'center' }} key={index}>
            <Box height={100} p={2}>
              <Typography variant={'h5'}>
                Сайт кого то там
              </Typography>
              <Typography variant={'subtitle1'}>
                kchr.ru
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>
    </MainPageSection>
  );
};
