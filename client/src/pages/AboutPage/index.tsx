import { FC } from 'react';
import { MainPageSection } from 'shared/ui-kit/MainPageSection/MainPageSection';
import { Box, Typography } from '@mui/material';
import cls from 'widget/Footer/ui/components/FooterFeedback/FooterFeedback.module.css';

interface indexProps {
  className?: string;
}

export const AboutPage: FC<indexProps> = ({ className }) => {
  return (
    <MainPageSection mt={20}>
      <Box display={'flex'} mb={4}>
        <Box flex={1} display={'flex'} gap={1} flexDirection={'column'}>
          <Typography mb={1} variant={'h4'}>Наши контакты</Typography>
          <a className={cls.link} href="tel: 8 (800) 333-77-37">8 (800) 333-77-37</a>
          <a className={cls.link} href="mailto: my_carier@gmail.com">my_carier@gmail.com</a>
          <a className={cls.link} href="mailto: support_carier@gmail.com">support_carier@gmail.com</a>
        </Box>
        <Box flex={1}>
          <Typography mb={2} variant={'h4'}>Наше местоположение</Typography>
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <a
              href="https://yandex.ru/maps/1104/cherkessk/?utm_medium=mapframe&utm_source=maps"
              style={{ color: '#eee', fontSize: 12, position: 'absolute', top: 0 }}
            >Черкесск</a>
            <a
              href="https://yandex.ru/maps/1104/cherkessk/house/ulitsa_dovatora_19/YEsYdgNmTk0PQFpufX5xeX9lYg==/?ll=42.046787%2C44.208366&utm_medium=mapframe&utm_source=maps&z=17.15"
              style={{ color: '#eee', fontSize: 12, position: 'absolute', top: 14 }}>Улица Доватора, 19 — Яндекс Карты</a>
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=42.046787%2C44.208366&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgoyMDc4MDc1NzcxEn3QoNC-0YHRgdC40Y8sINCa0LDRgNCw0YfQsNC10LLQvi3Qp9C10YDQutC10YHRgdC60LDRjyDQoNC10YHQv9GD0LHQu9C40LrQsCwg0KfQtdGA0LrQtdGB0YHQuiwg0YPQu9C40YbQsCDQlNC-0LLQsNGC0L7RgNCwLCAxOSIKDeovKEIVXtUwQg%2C%2C&z=17.15"
              width="560" height="400" allowFullScreen style={{ position: 'relative' }}></iframe>
          </div>
        </Box>
      </Box>

    </MainPageSection>
  );
};
