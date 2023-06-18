import { FC } from 'react';
import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { useConfirmParticipationMutation, useGetEventMembersQuery } from 'store/api/eventAip';
import { useParams } from 'react-router-dom';
import { MemberTypes } from 'store/api/types/event';

export const EventMembers: FC = () => {
  const { id } = useParams();

  const [confirm] = useConfirmParticipationMutation();
  const { data } = useGetEventMembersQuery(id as string);

  const handleClick = (member: MemberTypes) => {
    if (member.isTookPart) return;
    void confirm({ memberId: member._id, userId: member.userId, eventId: member.eventId });
  };

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <TableContainer sx={{ width: '500px', mt: 8 }} component={Paper}>
        <Table>
          <TableBody>
            {data?.map((item) => (
              <TableRow key={item._id}>
                <TableCell>
                  {item.firstName} {item.secondName} {item?.middleMame}
                </TableCell>
                <TableCell align={'right'}>
                  <Button onClick={() => { handleClick(item); }}>{item.isTookPart ? 'Подтверждено' : 'Подтвердить участие'}</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
