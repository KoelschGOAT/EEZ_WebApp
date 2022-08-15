import PropTypes from 'prop-types';
import useLocalStorageState from 'use-local-storage-state';
import { useState } from ' react';
function useLanguageDisplayer({ en = 'en', de = 'de' }) {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [language] = useLocalStorageState('language');
  if (language === 'en') {
    setSelectedLanguage('en');
  } else if (language === 'de') {
    setSelectedLanguage('de');
  }
  const lan = {selectedLanguage, setSelectedLanguage};
  return lan;
}
useLanguageDisplayer.propTypes = {
  en: PropTypes.string.isRequired,
  de: PropTypes.string.isRequired,
};
export default useLanguageDisplayer;
