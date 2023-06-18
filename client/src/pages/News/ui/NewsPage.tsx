import { FC, useMemo, useState } from 'react';
import classnames from 'classnames';

import cls from './NewsPage.module.css';
import { MainPageSection } from 'shared/ui-kit/MainPageSection/MainPageSection';
import { NewsCard } from 'entities/NewsCard/NewsCard';
import { Box, Grid, Pagination } from '@mui/material';
import { useGetNewsQuery } from 'store/api/newsApi';

interface NewsPageProps {
  className?: string;
}

const PAGE_SIZE = 12;

export const NewsPage: FC<NewsPageProps> = ({ className }) => {
  const [page, setPage] = useState(0);

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
    <MainPageSection title={'Новости'} mt={20} className={classnames(cls.NewsPage, [className])}>
      <Grid container spacing={4} pb={4}>
        {data?.data.map((item, index) => (
          <Grid display={'flex'} justifyContent={'center'} item lg={4} key={item._id}>
            <NewsCard post={item} />
          </Grid>
        ))}
      </Grid>
      {Boolean(pageCount) && (
        <Box sx={{ p: '32px', display: 'flex', justifyContent: 'center' }}>
          <Pagination
            count={pageCount}
            page={page + 1}
            onChange={handleChangePage}
            variant="outlined"
            color="primary"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </MainPageSection>
  );
};
