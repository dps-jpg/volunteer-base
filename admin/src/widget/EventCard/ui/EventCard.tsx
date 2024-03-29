import { FC } from 'react';
import { EventTypes } from 'store/api/types/event';
import { Button, Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { useDeleteEventMutation } from 'store/api/eventAip';

import 'swiper/css';
import 'swiper/css/navigation';
import { useNavigate } from 'react-router-dom';

interface EventCardProps {
  event: EventTypes;
  orderNumber: number;
}

export const EventCard: FC<EventCardProps> = ({ event, orderNumber }) => {
  const navigate = useNavigate();
  const [deleteEvent] = useDeleteEventMutation();

  const navigateToMembers = () => {
    navigate(`/events/${event._id}`);
  };

  return (
    <Card elevation={3} sx={{ p: '16px', width: '70%', m: '16px auto' }}>
      <CardHeader
        action={
          <>
            <Button onClick={navigateToMembers}>Участники</Button>
            <IconButton aria-label="settings" onClick={async () => await deleteEvent(event._id)}>
              <DeleteIcon />
            </IconButton>
          </>
        }
        title={orderNumber.toString() + '. ' + event.title}
        subheader={`Место ${event.city}, Время работ: ${event.hours}`}
      />
      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={1}
        navigation
      >
        {event.images.map((image) => (
          <SwiperSlide key={image} style={{ width: '100%', height: '400px' }}>
            <img style={{ width: '100%', height: '400px' }} src={`${_API_}/${image}`} alt=""/>
          </SwiperSlide>
        ))}
      </Swiper>
      <CardContent>
        <Typography whiteSpace={'pre-wrap'} variant={'body1'}>{event.body}</Typography>
      </CardContent>
    </Card>
  );
};
