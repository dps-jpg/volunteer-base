import { FC } from 'react';
import { MainPageSection } from 'shared/ui-kit/MainPageSection/MainPageSection';
import { useParams } from 'react-router-dom';
import { useGetPostByIdQuery } from 'store/api/newsApi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { Box, Typography } from '@mui/material';

export const PostPage: FC = () => {
  const { id } = useParams();

  const { data: post } = useGetPostByIdQuery(id as string);

  return (
    <MainPageSection title={post?.title} mt={20}>
      <Box pb={4}>
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={1}
          navigation
        >
          {post?.images.map((image) => (
            <SwiperSlide key={image} style={{ width: '100%', height: '500px' }}>
              <img style={{ width: '100%', height: '500px' }} src={`${_API_}/${image}`} alt=""/>
            </SwiperSlide>
          ))}
        </Swiper>
        <Typography whiteSpace={'pre-wrap'} mt={2} variant={'body1'} color="text.secondary">{post?.body}</Typography>
      </Box>
    </MainPageSection>
  );
};
