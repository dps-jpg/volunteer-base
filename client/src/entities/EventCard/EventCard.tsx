import { FC } from 'react';
import classnames from 'classnames';

import cls from './EventCard.module.css';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography
} from '@mui/material';
import { EventTypes } from 'shared/types/event';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routerConfig';

interface EventCardProps {
  event: EventTypes;
  className?: string;
}

export const EventCard: FC<EventCardProps> = ({ className, event }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(RoutePath.event.replace(':id', event._id));
  };
  return (
    <Card sx={{ width: 345 }} className={classnames(cls.EventCard, [className])}>
      <CardHeader
        title={<Typography noWrap sx={{ textOverflow: 'ellipsis', width: '313px' }} variant={'h6'}>{event.title}fdsaf ads fasd fasd sa df</Typography>}
        subheader={
          <Box justifyContent={'space-between'}>
            <Typography variant="body2" color="text.secondary">{event.createdAt}</Typography>
            <Typography className={cls.body} variant="body2" color="text.secondary">{event.city}</Typography>
          </Box>
        }
      />
      <CardMedia
        sx={{ height: 220 }}
        image={`${_API_}/${event.images[0]}`}
      />
      <CardContent sx={{ p: 2 }}>
        <Typography whiteSpace={'pre-wrap'} variant="body2" color="text.secondary">
          {event.body}
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0, display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={handleClick} size="small">Узнать больше</Button>
      </CardActions>
    </Card>
  );
};
