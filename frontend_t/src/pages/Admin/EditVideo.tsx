import React from 'react';
import { useDarkMode } from 'usehooks-ts';
interface Props {}

const EditVideo: React.FC<Props> = () => {
  const { isDarkMode, toggle, enable, disable } = useDarkMode();

  return (
    <div>
      <p>Current theme: {isDarkMode ? 'dark' : 'light'}</p>
      <button onClick={toggle}>Toggle</button>
      <button onClick={enable}>Enable</button>
      <button onClick={disable}>Disable</button>
    </div>
  );
};

export default EditVideo;
