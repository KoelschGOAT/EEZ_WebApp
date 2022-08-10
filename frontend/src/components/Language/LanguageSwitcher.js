import Button from '@mui/material/Button';
import { De, Us } from 'react-flags-icons';
import useLocalStorageState from 'use-local-storage-state';

import React, { useEffect } from 'react';
function LanguageSwitcher() {
  const [storage, setStorage] = useLocalStorageState('language', {
    defaultValue: 'de',
  });

  useEffect(() => {
    console.log(storage);
  }, [storage]);
  return (
    <>
      <Button
        className="items"
        onClick={() => setStorage(storage === 'de' ? 'en' : 'de')}
        sx={{ backgroundColor: 'transparent', height: '100%' }}
        startIcon={storage === 'de' ? <Us /> : <De />}
        variant="outlined"
      >
        {storage === 'de' ? 'English' : 'Deutsch'}
      </Button>
    </>
  );
}

export default LanguageSwitcher;
