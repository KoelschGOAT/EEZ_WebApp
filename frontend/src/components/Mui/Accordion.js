import React, { useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

export default function MuiAccordion({
  title = 'Title',
  subtitle = 'subtitle',
  children,
}) {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Accordion
      sx={{
        border: '1px solid rgba(0, 0, 0, 0.12)',
        boxShadow: 'none',
        overflow: 'auto',
        maxHeight: 500,
      }}
      expanded={expanded === 'panel1'}
      onChange={handleChange('panel1')}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography sx={{ width: '33%', flexShrink: 0 }}>
          {title}
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          {subtitle}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}
MuiAccordion.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node.isRequired,
};
