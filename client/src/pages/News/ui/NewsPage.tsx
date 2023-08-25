import { FC, useMemo, useState } from 'react';
import classnames from 'classnames';

import cls from './NewsPage.module.css';
import { MainPageSection } from 'shared/ui-kit/MainPageSection/MainPageSection';
import { NewsCard } from 'entities/NewsCard/NewsCard';
import { Box, Grid, Pagination, useMediaQuery } from '@mui/material';
import { useGetNewsQuery } from 'store/api/newsApi';

interface NewsPageProps {
  className?: string;
}

const PAGE_SIZE = 12;

export const NewsPage: FC<NewsPageProps> = ({ className }) => {
  const [page, setPage] = useState(0);
  const matches = useMediaQuery('(max-width: 600px)');

  const { data } = useGetNewsQuery({ limit: PAGE_SIZE, page, search: '' });

  const pageCount = useMemo(() => {
    return data?.totalCount ? Math.ceil(data.totalCount / PAGE_SIZE) : 0;
  }, [data?.totalCount]);

  const handleChangePage = (_: any, page: number) => {
    setPage(page - 1);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <MainPageSection title={'Новости'} mt={ matches ? 12 : 20} className={classnames(cls.NewsPage, [className])}>
      <Box display={'flex'} flexWrap={'wrap'} justifyContent={'center'} gap={4} pb={4}>
        {data?.data.map((item, index) => (
          <Grid className={cls.newItem} display={'flex'} justifyContent={'center'} item lg={4} key={item._id}>
            <NewsCard post={item} />
          </Grid>
        ))}
      </Box>
      {Boolean(pageCount) && (
        <Box sx={{ p: '32px', display: 'flex', justifyContent: 'center' }}>
          <Pagination
            count={pageCount}
            page={page + 1}
            onChange={handleChangePage}
            variant="outlined"
            color="primary"
            size={matches ? 'small' : 'medium'}
          />
        </Box>
      )}
    </MainPageSection>
  );
};
