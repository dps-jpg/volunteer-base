import { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
import { Box, Button, Pagination, TextField, Typography } from '@mui/material';
import { useLazyDownloadUsersQuery, useGetUsersQuery } from 'store/api/userApi';
import { UserCard } from 'widget/UserCard';

export const UserListPage: FC = () => {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(0);

  const [downloadUsers] = useLazyDownloadUsersQuery();
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

  const handleDownloadUsers = async () => {
    try {
      const res = await downloadUsers().unwrap();
      const link = document.createElement('a');
      link.href = `${_API_}/${res}`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.log('e', e);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, pt: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box width={'70%'} flex={1} display={'flex'} alignItems={'center'} gap={2}>
        <TextField
          label={'Поиск'}
          type={'text'}
          value={search}
          onChange={(event) => { setSearch(event.target.value); }}
          variant={'outlined'}
          fullWidth={true}
        />
        <Button onClick={handleDownloadUsers} variant={'contained'}>Выгрузить пользователей</Button>
      </Box>
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
