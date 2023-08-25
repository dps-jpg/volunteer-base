import { FC } from 'react';
import classnames from 'classnames';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

import cls from './NewsCard.module.css';
import { PostTypes } from 'shared/types/news';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routerConfig';

interface NewsCardProps {
  post: PostTypes;
  className?: string;
}

export const NewsCard: FC<NewsCardProps> = ({ className, post }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(RoutePath.post.replace(':id', post._id));
  };

  return (
    <Card sx={{ width: '100%', p: 2, borderRadius: 6, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} className={classnames(cls.NewsCard, [className])}>
      <Box>
        <CardMedia
          sx={{ height: 220, borderRadius: 4 }}
          image={`${_API_}/${post.images[0]}`}
        />
        <CardContent sx={{ p: 0, pt: 2, pb: 0 }}>
          <Typography className={cls.title} gutterBottom variant="h5" component="div">
            {post.title}
          </Typography>
          <Typography className={cls.body} variant="body2" color="text.secondary">
            {post.body}
          </Typography>
        </CardContent>
      </Box>
      <CardActions sx={{ p: 0, display: 'flex', justifyContent: 'flex-end', mt: 'auto' }}>
        <Button onClick={handleClick} size="small">Узнать больше</Button>
      </CardActions>
    </Card>
  );
};
