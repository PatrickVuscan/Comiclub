import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import * as React from 'react';

import { createComic } from '../../actions/DashboardActions';

const CreateComicsDialog = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const defaultValues = {
    thumb: '',
    name: '',
    description: '',
  };

  const [formValues, setFormValues] = React.useState(defaultValues);

  const submit = (event) => {
    event.preventDefault();
    createComic(formValues.thumb, formValues.name, formValues.description);
    setFormValues({
      ...formValues,
      thumb: '',
      name: '',
      description: '',
    });
    setOpen(false);
  };

  const handleInputChange = (event) => {
    // event.preventDefault();
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add a New Comic!
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a New Comic!</DialogTitle>
        <DialogContent>
          <DialogContentText>Complete the details to add a new Comic.</DialogContentText>
          <TextField autoFocus margin="dense" id="name" label="Cover" type="text" fullWidth variant="standard" />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            name="description"
            value={formValues.description}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={submit}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateComicsDialog;
