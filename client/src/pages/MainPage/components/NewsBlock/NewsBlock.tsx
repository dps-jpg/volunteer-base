import { FC } from 'react';
import classnames from 'classnames';
import { Box, Button, Typography } from '@mui/material';

import cls from './NewsBlock.module.css';
import { MainPageSection } from 'shared/ui-kit/MainPageSection/MainPageSection';
import { NewsCard } from 'entities/NewsCard/NewsCard';
import { useGetMainNewsQuery } from 'store/api/newsApi';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routerConfig';

interface NewsBlockProps {
  className?: string;
}

export const NewsBlock: FC<NewsBlockProps> = ({ className }) => {
  const navigate = useNavigate();
  const { data: mainNews } = useGetMainNewsQuery();

  const handleClick = () => {
    if (!mainNews?.main) return;
    navigate(RoutePath.event.replace(':id', mainNews.main._id));
  };

  return (
    <MainPageSection title={'Новости'} className={classnames(cls.NewsBlock, [className])}>
      <Box sx={{ background: 'white', borderRadius: 8 }} display={'flex'} gap={4}>
        <img className={cls.image} src={`${_API_}/${mainNews?.main.images[0]}`} alt=""/>
        <Box className={cls.textWrapper} flex={1} m={2}>
          <Box>
            <Typography className={cls.title} variant={'h4'}>{mainNews?.main.title}</Typography>
            <Typography className={cls.body} whiteSpace={'pre-wrap'} mt={2} variant={'body1'}>{mainNews?.main.body}</Typography>
          </Box>
          <Button sx={{ alignSelf: 'flex-end' }} onClick={handleClick}>Узнать больше</Button>
        </Box>
      </Box>
      <Box mt={4} display={'flex'} justifyContent={'space-between'}>
        {mainNews?.news.map((item) => (
          <NewsCard key={item._id} post={item} />
        ))}
      </Box>
    </MainPageSection>
  );
};
