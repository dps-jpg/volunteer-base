import { FC } from 'react';

import { Box, Paper, Typography } from '@mui/material';
import { MainPageSection } from 'shared/ui-kit/MainPageSection/MainPageSection';

interface LinksProps {
  className?: string;
}

const arr = [
  { url: 'https://kchr.ru/', urlText: 'kchr.ru', text: 'Сайт Главы и Правительства КЧР' },
  { url: 'https://fadm.gov.ru/', urlText: 'fadm.gov.ru', text: 'Росмолодежь' },
  { url: 'https://minmolkchr.ru/', urlText: 'minmolkchr.ru', text: 'МинМолКЧР ' },
  { url: 'https://mycareerkchr.ru/', urlText: 'mycareerkchr.ru', text: 'АНО “Моя карьера”' },
  { url: ' https://dobro.ru/', urlText: ' dobro.ru', text: 'Добро ' },
  { url: 'https://resourcecenter09.ru/', urlText: 'resourcecenter09.ru', text: 'Ресурсный центр добровльчества' }
];

export const Links: FC<LinksProps> = () => {
  const openUrl = (url: string) => {
    window?.open(url, '_blank')?.focus();
  };

  return (
    <MainPageSection title={'Полезные сылки'}>
      <Box flexWrap={'wrap'} display={'flex'} justifyContent={'space-between'}>
        {arr.map((item, index) => (
          <Paper
            sx={{ width: { xs: '100%', sm: '48%', md: '31%' }, mt: 2, cursor: 'pointer', minWidth: 260, display: 'flex', '&:hover': { transform: 'scale(110%)' }, transition: 'transform .3s' }}
            key={index}
            onClick={() => { openUrl(item.url); }}
          >
            <Box p={2}>
              <Typography sx={{ fontWeight: 700 }} variant={'subtitle1'}>
                {item.text}
              </Typography>
              <Typography variant={'subtitle1'}>
                {item.urlText}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>
    </MainPageSection>
  );
};
