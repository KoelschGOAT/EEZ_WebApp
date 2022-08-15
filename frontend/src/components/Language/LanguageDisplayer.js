import PropTypes from 'prop-types';
import useLocalStorageState from 'use-local-storage-state';

function LanguageDisplayer({ en = 'en', de = 'de' }) {
  const [language] = useLocalStorageState('language');
  if (language === 'en') {
    return en;
  } else if (language === 'de') {
    return de;
  }
}
LanguageDisplayer.propTypes = {
  en: PropTypes.string.isRequired,
  de: PropTypes.string.isRequired,
};
export default LanguageDisplayer;
