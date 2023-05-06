import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeletePostMutation } from 'store/api/newsApi';
import { PostTypes } from 'store/api/types/news';

import 'swiper/css';
import 'swiper/css/navigation';

interface PostCardProps {
  post: PostTypes;
  orderNumber: number;
}

export const PostCard: FC<PostCardProps> = ({ post, orderNumber }) => {
  const [deletePost] = useDeletePostMutation();
  return (
    <Card elevation={3} sx={{ p: '16px', width: '70%', m: '16px auto' }}>
      <CardHeader
        action={
          <IconButton aria-label="settings" onClick={async () => await deletePost(post._id)}>
            <DeleteIcon />
          </IconButton>
        }
        title={orderNumber.toString() + '. ' + post.title}
       />
      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={1}
        navigation
      >
        {post.images.map((image) => (
          <SwiperSlide key={image} style={{ width: '100%', height: '400px' }}>
            <img style={{ width: '100%', height: '400px' }} src={`${_API_}/${image}`} alt=""/>
          </SwiperSlide>
        ))}
      </Swiper>
      <CardContent>
        <Typography variant={'body1'}>{post.body}</Typography>
      </CardContent>
    </Card>
  );
};
