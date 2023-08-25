import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { MainPageSection } from 'shared/ui-kit/MainPageSection/MainPageSection';
import { useParams } from 'react-router-dom';
import { useGetEventByIdQuery, useParticipateEventMutation } from 'store/api/eventAip';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import { useGetMeQuery } from 'store/api/auth';

const IMAGE_RATIO = 2.304;

export const EventPage: FC = () => {
  const { id } = useParams();
  const ref = useRef<HTMLDivElement>(null);
  const matches = useMediaQuery('(max-width: 600px)');

  const { data: me } = useGetMeQuery();
  const { data: event } = useGetEventByIdQuery({ eventId: id as string, userId: me?._id });
  const [participate] = useParticipateEventMutation();

  const [height, setHeight] = useState(500);

  const getHeight = useCallback(() => {
    setHeight((ref.current?.offsetWidth ?? 0) / IMAGE_RATIO);
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver(getHeight);
    observer.observe(ref.current);
    return () => { observer.disconnect(); };
  }, [ref.current, getHeight]);

  const handleClick = async () => {
    if (!event || !me || event.isMember) return;
    try {
      void participate({ userId: me._id, eventId: event._id });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <MainPageSection title={event?.title} mt={matches ? 12 : 20}>
      <Box pb={4}>
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={1}
          navigation
        >
          {event?.images.map((image) => (
            <SwiperSlide key={image} style={{ width: '100%', height }}>
              <img style={{ width: '100%', height }} src={`${_API_}/${image}`} alt=""/>
            </SwiperSlide>
          ))}
        </Swiper>
        <Box mt={2} display={'flex'} sx={{ flexDirection: { xs: 'column', sm: 'row' } }} justifyContent={'space-between'}>
          <Box>
            <Typography>{event?.createdAt}</Typography>
            <Typography>{event?.city}</Typography>
          </Box>
          {me && <Button sx={{ maxWidth: 400, mt: { xs: 2, sm: 0 } }} onClick={handleClick} variant={'outlined'}>{event?.isMember ? 'Вы участник' : 'Записаться волонторем'}</Button>}
        </Box>
        <Typography whiteSpace={'pre-wrap'} mt={2} variant={'body1'} color="text.secondary">{event?.body}</Typography>
      </Box>
    </MainPageSection>
  );
};
