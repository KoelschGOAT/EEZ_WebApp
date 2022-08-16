import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
function ClientForm() {
  let loading = false;
  const handleClick = () => {
    loading = !loading;
  };
  return (
    <div>
      ClientForm
      <LoadingButton
        size="small"
        onClick={handleClick}
        endIcon={<SendIcon />}
        loading={loading}
        loadingPosition="end"
        variant="contained"
      >
        Send
      </LoadingButton>
    </div>
  );
}

export default ClientForm;
