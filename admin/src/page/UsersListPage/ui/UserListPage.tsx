import { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
import { Box, Pagination, TextField, Typography } from '@mui/material';
import { useGetUsersQuery } from 'store/api/userApi';
import { UserCard } from 'widget/UserCard';

export const UserListPage: FC = () => {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(0);

  const { data, isLoading } = useGetUsersQuery({ limit: 10, page, search: debouncedSearch });

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
    <Box sx={{ flexGrow: 1, pt: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <TextField
        label={'Поиск'}
        type={'text'}
        value={search}
        onChange={(event) => { setSearch(event.target.value); }}
        variant={'outlined'}
        fullWidth={true}
        sx={{ width: '70%' }}
      />
      {isLoading && (<Typography variant={'h3'} sx={{ textAlign: 'center' }}>Загрузка...</Typography>)}
      {Boolean(data?.data.length) && data?.data.map((item, index) => (
        <UserCard key={item._id} orderNumber={(page * 10) + index + 1} user={item} />
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

    </Box>
  );
};
