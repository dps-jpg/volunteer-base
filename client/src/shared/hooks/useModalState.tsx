import { useCallback, useState } from 'react';

export const useModalState = (defaultValue = false): [boolean, () => void, () => void] => {
  const [isOpen, setVisible] = useState(defaultValue);

  const open = useCallback(() => {
    setVisible(true);
  }, []);
  const close = useCallback(() => {
    setVisible(false);
  }, []);
  return [isOpen, open, close];
};
