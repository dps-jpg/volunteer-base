import { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
import { Box, Button, Pagination, TextField, Typography } from '@mui/material';
import { useGetNewsQuery } from 'store/api/newsApi';
import { PostCard } from 'widget/PostCard';
import { CreatePostModal } from 'widget/CreatePostModal';
import { useModalState } from 'shared/hooks/useModalState';

export const NewsListPage: FC = () => {
  const [isOpen, open, close] = useModalState();
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(0);

  const { data, isLoading } = useGetNewsQuery({ limit: 10, page, search: debouncedSearch });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => { clearTimeout(handler); };
  }, [search]);

  const pageCount = useMemo(() => {
    return data?.totalCount ? Math.ceil(data.totalCount / 10) : 0;
  }, [data?.totalCount]);

  const handleChangePage = (_: ChangeEvent, page: number) => {
    setPage(page - 1);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Box sx={{ flexGrow: 1, pt: '32px' }}>
      <Box
        sx={{ width: '70%', display: 'flex', gap: '16px', margin: '0 auto' }}
      >
        <TextField
          label={'Поиск'}
          type={'text'}
          value={search}
          onChange={(event) => { setSearch(event.target.value); }}
          variant={'outlined'}
          fullWidth={true}
        />
        <Button variant="contained" sx={{ width: '200px' }} onClick={open}>Cоздать</Button>
      </Box>
      {isLoading && (<Typography variant={'h3'} sx={{ textAlign: 'center' }}>Загрузка...</Typography>)}
      {Boolean(data?.data.length) && data?.data.map((item, index) => (
        <PostCard key={item._id} orderNumber={(page * 10) + index + 1} post={item} />
      ))}
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
      <CreatePostModal isOpen={isOpen} close={close} />
    </Box>
  );
};
