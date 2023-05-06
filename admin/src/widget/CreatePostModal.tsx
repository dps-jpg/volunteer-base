import { FC, useState } from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { useCreatePostMutation } from 'store/api/newsApi';

interface CreatePostModalProps {
  isOpen: boolean;
  close: () => void;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: '32px'
};

const baseStyle = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  cursor: 'pointer'
};

export const CreatePostModal: FC<CreatePostModalProps> = ({ isOpen, close }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState(false);

  const [createPost] = useCreatePostMutation();

  const handleDrop = (newFiles: File[]) => {
    setFiles((prev) => ([...prev, ...newFiles]));
    setError(false);
  };

  const { getRootProps, getInputProps } = useDropzone({ multiple: true, onDrop: handleDrop });

  const renderFiles = files.map((file, index) => {
    return (
      <li key={index} style={{ maxWidth: '100%', overflow: 'hidden', paddingTop: '8px' }}>
        {file.name} - {file.size} bytes
      </li>
    );
  });

  const clear = () => {
    setTitle('');
    setBody('');
    setFiles([]);
  };

  const handleCreate = async () => {
    if (!title || !body || !files.length) {
      setError(true);
      return;
    }

    const form = new FormData();
    form.set('title', title);
    form.set('body', body);
    for (const file of files) {
      form.append('images', file);
    }

    try {
      await createPost(form);
      clear();
      close();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {error && <Typography variant={'subtitle1'} sx={{ color: 'red' }}>Заполните все поля</Typography>}
        <TextField
          required
          label={'Загаловок'}
          type={'text'}
          value={title}
          onChange={(event) => { setTitle(event.target.value); setError(false); }}
          variant={'outlined'}
          fullWidth={true}
        />
        <TextField
          required
          label={'Tекст'}
          type={'text'}
          value={body}
          onChange={(event) => { setBody(event.target.value); setError(false); }}
          multiline={true}
          variant={'outlined'}
          fullWidth={true}
        />
        <Box sx={{ border: '1px solid gray' }}>
          <div {...getRootProps({ style: baseStyle })}>
            <input {...getInputProps()} />
            <p>Drag  drop some files here, or click to select files</p>
          </div>

        </Box>
        <Box>
          <ul>{renderFiles}</ul>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
          <Button variant="contained" onClick={clear}>Очистить</Button>
          <Button variant="contained" onClick={close}>Отмена</Button>
          <Button variant="contained" onClick={handleCreate}>Cоздать</Button>
        </Box>
      </Box>
    </Modal>
  );
};
