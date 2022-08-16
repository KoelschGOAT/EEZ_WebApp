import Button from '@mui/material/Button';
import DoneIcon from '@mui/icons-material/Done';
import Loader from './Loader';
import React from 'react';
import UploadIcon from '@mui/icons-material/Upload';

export default function ButtonLoader({
  color,
  text = 'Submit',
  textSuccess = 'Erfolgreich',
  isLoading,
  onClick,
  isSuccess,
  sx,
  variant = 'contained',
  icon = null,
}) {
  const disabled = isLoading;
  return (
    <Button
      className="button"
      onClick={onClick}
      disabled={disabled}
      variant={variant}
      sx={sx}
      color={color}
    >
      {isLoading && <Loader loading={isLoading} size={25} />}
      {!isLoading && !isSuccess && (
        <>
          {icon || <UploadIcon />} {text}
        </>
      )}
      {isSuccess && !isLoading && (
        <>
          <DoneIcon />
          {textSuccess}
        </>
      )}
    </Button>
  );
}
