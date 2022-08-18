import DoneIcon from '@mui/icons-material/Done';
import UploadIcon from '@mui/icons-material/Upload';
import Button from '@mui/material/Button';
import React from 'react';
import Loader from './Loader';

export default function ButtonLoader({
  color,
  text = 'Submit',
  textSuccess = '',
  isLoading,
  onClick,
  isSuccess,
  sx,
  variant = 'contained',
  icon = null,
  disabled = false,
}) {
  return (
    <Button
      className="button"
      onClick={onClick}
      disabled={disabled || isLoading}
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
