import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';
const AppContext = createContext(null);

export default AppContext;

export const AppProvider = ({ children }) => {
  const [videos, setVideos] = useState();
  const [pcs, setPcs] = useState();
  const [language, setLanguage] = useState(() =>
    localStorage.getItem('language')
      ? JSON.parse(localStorage.getItem('language'))
      : 'german'
  );

  let contextData = {
    videos: videos,
    setVideos: setVideos,
    pcs: pcs,
    setPcs: setPcs,
  };
  return (
    <AppContext.Provider value={contextData}>
      {children}
    </AppContext.Provider>
  );
};
AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
