import { FC, useMemo, useState } from 'react';
import classnames from 'classnames';

import cls from './EventsPage.module.css';
import { MainPageSection } from 'shared/ui-kit/MainPageSection/MainPageSection';
import { Box, Grid, Pagination, useMediaQuery } from '@mui/material';
import { EventCard } from 'entities/EventCard/EventCard';
import { useGetEventsQuery } from 'store/api/eventAip';

interface EventsPageProps {
  className?: string;
}

const PAGE_SIZE = 12;

export const EventsPage: FC<EventsPageProps> = ({ className }) => {
  const matches = useMediaQuery('(max-width: 600px)');
  const [page, setPage] = useState(0);

  const { data } = useGetEventsQuery({ page, limit: PAGE_SIZE, search: '' });

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
    <MainPageSection mt={matches ? 12 : 20} title={'Мероприятия'} className={classnames(cls.EventsPage, [className])}>
      <Box display={'flex'} justifyContent={'center'} flexWrap={'wrap'} gap={4} pb={4}>
        {data?.data.map((item) => (
          <Grid className={cls.newItem} display={'flex'} justifyContent={'center'} item lg={4} key={item._id}>
            <EventCard event={item} />
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
