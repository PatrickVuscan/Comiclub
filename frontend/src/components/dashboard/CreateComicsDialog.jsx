import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';

import { createComic } from '../../actions/DashboardActions';

const CreateComicsDialog = ({ update }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const defaultValues = {
    thumb: undefined,
    name: '',
    description: '',
    genre: '',
  };

  const [formValues, setFormValues] = React.useState(defaultValues);

  const submit = (event) => {
    event.preventDefault();
    createComic(formValues.thumb, formValues.name, formValues.description, formValues.genre).then(update);

    setFormValues({
      ...formValues,
      thumb: undefined,
      name: '',
      genre: '',
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

          <Typography variant="subtitle1" component="div" style={{ marginTop: '1rem' }}>
            Thumbnail Image
          </Typography>
          <input
            id="thumbnail"
            accept="image/*"
            type="file"
            style={{
              padding: '5px',
            }}
            files={formValues.thumb}
            onChange={(e) => {
              e.preventDefault();

              setFormValues((formVals) => ({
                ...formVals,
                thumb: e.target.files[0] ? e.target.files[0] : undefined,
              }));
            }}
          />

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
            id="genre"
            label="Genre"
            type="text"
            fullWidth
            variant="standard"
            name="genre"
            value={formValues.genre}
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
        <DialogActions style={{ marginRight: '1rem' }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={submit}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateComicsDialog;
