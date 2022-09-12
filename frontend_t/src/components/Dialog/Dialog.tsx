import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import LanguageDisplayer from '../../utils/Language/Language/LanguageDisplayer';
interface Props {
  title_en: string;
  title_de: string;
  text_de: string;
  text_en: string;

  handleClose: () => void;
  handleSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
  open: boolean;
}
export default function AlertDialog({
  title_en,
  title_de,
  text_de,
  text_en,

  handleClose,
  open,
  handleSubmit,
}: Props) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <LanguageDisplayer en={title_en} de={title_de} />
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <LanguageDisplayer en={text_en} de={text_de} />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <button
          className="btn btn-outline btn-error"
          onClick={() => handleClose}
        >
          Nein
        </button>
        <button
          className="btn btn-primary"
          onClick={() => handleSubmit}
          autoFocus
        >
          Ja
        </button>
      </DialogActions>
    </Dialog>
  );
}
