import React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import AlertTitle from "@mui/material/AlertTitle";
import PropTypes from "prop-types";

function Notification({ Title, Message,severity,width="30%" }) {
  return (
    <div className="loading">
      <Stack sx={{ width:width }} spacing={2}>
        <Alert severity={severity}>
          <AlertTitle>{Title}</AlertTitle>
          <strong>{Message}</strong>
        </Alert>
      </Stack>
    </div>
  );
}
Notification.propTypes = {
	Title: PropTypes.string.isRequired,
  Message: PropTypes.string.isRequired,
};
export default Notification;
