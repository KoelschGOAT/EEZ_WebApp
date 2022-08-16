import React, { useState } from 'react';

import ButtonLoader from '../../components/Feedback/ButtonLoader';
import CheckboxList from '../../components/DisplaySelection/CheckboxList';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';

function ClientForm({ pc, allVideos, pcVideos, setPcVideos }) {
  console.log(pc, allVideos, pcVideos, setPcVideos);
  const [loading, setLoading] = useState(false);
  return (
    <>
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
      />
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
      />

      <ButtonLoader
        text="Ändern"
        sx={{ height: '3rem', color: '#fff' }}
      />
      <ButtonLoader
        text="Löschen"
        variant="outlined"
        color="buttonRed"
        sx={{ height: '3rem', color: '#000' }}
      />
      <CheckboxList
        pcVideos={pcVideos}
        setPcVideos={setPcVideos}
        allVideos={allVideos}
      />
    </>
  );
}

export default ClientForm;
