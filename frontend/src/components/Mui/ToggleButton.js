import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import PropTypes from 'prop-types';
import * as React from 'react';
export default function ToggleButtons({
  alignment,
  handleAlignment,
  ariaLabel,
  children,
}) {
  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      color="primary"
      onChange={handleAlignment}
      aria-label={ariaLabel}
    >
      {children}
    </ToggleButtonGroup>
  );
}
ToggleButtons.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
