import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { MainPageSection } from 'shared/ui-kit/MainPageSection/MainPageSection';
import { useParams } from 'react-router-dom';
import { useGetPostByIdQuery } from 'store/api/newsApi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { Box, Typography, useMediaQuery } from '@mui/material';

const IMAGE_RATIO = 2.304;

export const PostPage: FC = () => {
  const { id } = useParams();
  const ref = useRef<HTMLDivElement>(null);
  const matches = useMediaQuery('(max-width: 600px)');

  const [height, setHeight] = useState(500);

  const { data: post } = useGetPostByIdQuery(id as string);

  const getHeight = useCallback(() => {
    setHeight((ref.current?.offsetWidth ?? 0) / IMAGE_RATIO);
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver(getHeight);
    observer.observe(ref.current);
    return () => { observer.disconnect(); };
  }, [ref.current, getHeight]);

  return (
    <MainPageSection title={post?.title} mt={matches ? 12 : 20}>
      <Box ref={ref} pb={4}>
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={1}
          navigation
        >
          {post?.images.map((image) => (
            <SwiperSlide key={image} style={{ width: '100%', height }}>
              <div
                style={{ width: '100%', height, backgroundImage: `url(${_API_}/${image})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
              />
              {/* <img style={{ width: '100%', height }} src={`${_API_}/${image}`} alt=""/> */}
            </SwiperSlide>
          ))}
        </Swiper>
        <Typography whiteSpace={'pre-wrap'} mt={2} variant={'body1'} color="text.secondary">{post?.body}</Typography>
      </Box>
    </MainPageSection>
  );
};
