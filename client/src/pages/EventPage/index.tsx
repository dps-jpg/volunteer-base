import { FC } from 'react';
import { MainPageSection } from 'shared/ui-kit/MainPageSection/MainPageSection';
import { useParams } from 'react-router-dom';
import { useGetEventByIdQuery, useParticipateEventMutation } from 'store/api/eventAip';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { Box, Button, Typography } from '@mui/material';
import { useGetMeQuery } from 'store/api/auth';

export const EventPage: FC = () => {
  const { id } = useParams();

  const { data: me } = useGetMeQuery();
  const { data: event } = useGetEventByIdQuery({ eventId: id as string, userId: me?._id });
  const [participate] = useParticipateEventMutation();

  const handleClick = async () => {
    if (!event || !me || event.isMember) return;
    try {
      void participate({ userId: me._id, eventId: event._id });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <MainPageSection title={event?.title} mt={20}>
      <Box pb={4}>
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={1}
          navigation
        >
          {event?.images.map((image) => (
            <SwiperSlide key={image} style={{ width: '100%', height: '500px' }}>
              <img style={{ width: '100%', height: '500px' }} src={`${_API_}/${image}`} alt=""/>
            </SwiperSlide>
          ))}
        </Swiper>
        <Box mt={2} display={'flex'} justifyContent={'space-between'}>
          <Box>
            <Typography>{event?.createdAt}</Typography>
            <Typography>{event?.city}</Typography>
          </Box>
          {me && <Button onClick={handleClick} variant={'outlined'}>{event?.isMember ? 'Вы участник' : 'Записаться волонторем'}</Button>}
        </Box>
        <Typography whiteSpace={'pre-wrap'} mt={2} variant={'body1'} color="text.secondary">{event?.body}</Typography>
      </Box>
    </MainPageSection>
  );
};
