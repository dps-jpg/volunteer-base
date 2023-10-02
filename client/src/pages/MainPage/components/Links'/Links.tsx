import { FC } from 'react';

import { Box, Paper, Typography } from '@mui/material';
import { MainPageSection } from 'shared/ui-kit/MainPageSection/MainPageSection';

interface LinksProps {
  className?: string;
}

const arr = [
  { url: 'https://fadm.gov.ru/', text: 'Федеральное агенство по делам молодежи' },
  { url: 'https://kchr.ru/', text: 'Сайт Главы и Правительства КЧО' },
  { url: 'https://minmolkchr.ru/', text: 'Министерство по делам молодежи по КЧР' },
  { url: 'https://mycareerkchr.ru/', text: 'Моя карьера' },
  { url: 'https://dobro.ru/?utm_', text: 'DOBRO.RU' },
  { url: 'https://resourcecenter09.ru/', text: 'Ресурсный центр развития молодежного добровльчества' }
];

export const Links: FC<LinksProps> = () => {
  return (
    <MainPageSection title={'Полезные сылки'}>
      <Box flexWrap={'wrap'} display={'flex'} justifyContent={'space-between'}>
        {arr.map((item, index) => (
          <Paper
            sx={{ width: { xs: '100%', sm: '48%', md: '31%' }, mt: 2, cursor: 'pointer', minWidth: 260, display: 'flex' }}
            key={index}
          >
            <Box p={2}>
              <Typography variant={'subtitle1'}>
                {item.text}
              </Typography>
              <Typography variant={'subtitle1'}>
                {item.url}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>
    </MainPageSection>
  );
};
