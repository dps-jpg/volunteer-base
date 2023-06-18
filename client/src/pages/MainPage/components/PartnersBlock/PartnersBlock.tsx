import { FC } from 'react';
import { MainPageSection } from 'shared/ui-kit/MainPageSection/MainPageSection';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Box, Paper } from '@mui/material';
import { Autoplay } from 'swiper';

import cls from './PartnersBlock.module.css';

interface PartnersBlockProps {
  className?: string;
}

const arr = Array.from(Array(10));
export const PartnersBlock: FC<PartnersBlockProps> = ({ className }) => {
  return (
    <MainPageSection title={'Партнеры'}>
      <Box pt={4} pb={4} position={'relative'}>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          autoplay={{
            delay: 3000
          }}
          modules={[Autoplay]}
        >
          {arr.map((item, index) => (
            <SwiperSlide key={index}>
              <Paper sx={{ height: 100 }}>
                <img draggable={false} className={cls.img} src="https://cdn.riastatic.com/photosnewr/ria/news_common/kakie-modeli-toyota-s-probegom-samye-populyarnye-v-ukraine__255148-620x0.jpg" alt=""/>
              </Paper>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </MainPageSection>
  );
};
