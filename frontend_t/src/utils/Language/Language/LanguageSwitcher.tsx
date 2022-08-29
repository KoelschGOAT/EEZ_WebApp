import React, { FC } from 'react';
import { De, Gb } from 'react-flags-select';
import useLocalStorageState from 'use-local-storage-state';
interface Props {
  className?: string;
}

const LanguageSwitcher: FC<Props> = ({ className }) => {
  const [storage, setStorage] = useLocalStorageState('language', {
    defaultValue: 'de',
  });

  return (
    <div
      className={className}
      onClick={() => setStorage(storage === 'de' ? 'en' : 'de')}
    >
      <span className="text-3xl">
        {storage === 'en' ? <De /> : <Gb />}
      </span>
      {storage === 'en' ? 'Deutsch' : 'English'}
    </div>
  );
};

export default LanguageSwitcher;
