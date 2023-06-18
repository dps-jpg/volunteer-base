import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { Button, Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeletePostMutation, useMakeMainMutation } from 'store/api/newsApi';
import { PostTypes } from 'store/api/types/news';

interface PostCardProps {
  post: PostTypes;
  orderNumber: number;
}

export const PostCard: FC<PostCardProps> = ({ post, orderNumber }) => {
  const [deletePost] = useDeletePostMutation();
  const [makeMain] = useMakeMainMutation();
  return (
    <Card elevation={3} sx={{ p: '16px', width: '70%', m: '16px auto', border: post.isMain ? '1px solid #1976d2' : 0 }}>
      <CardHeader
        action={
          <>
            <Button onClick={async () => await makeMain(post._id)} variant={'text'}>Сделать главной</Button>
            <IconButton aria-label="settings" onClick={async () => await deletePost(post._id)}>
              <DeleteIcon />
            </IconButton>
          </>
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
        <Typography whiteSpace={'pre-wrap'} variant={'body1'}>{post.body}</Typography>
      </CardContent>
    </Card>
  );
};
