import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React from 'react';

import { updateEpisode } from '../../actions/DashboardActions';

const EditEpisode = ({ episode, refreshEpisodes }) => {
  const { id, name, description, thumb, panels } = episode;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const defaultValues = {
    thumb,
    name,
    description,
    panels,
  };

  const [formValues, setFormValues] = React.useState(defaultValues);

  const submit = async (event) => {
    event.preventDefault();

    await updateEpisode(id, formValues.thumb, formValues.name, formValues.description, formValues.panels);

    refreshEpisodes();

    setOpen(false);
  };

  const handleInputChange = (event) => {
    // event.preventDefault();

    // Need to rename name to inputName here, because defined in upper context
    const { name: inputName, value } = event.target;
    setFormValues({
      ...formValues,
      [inputName]: value,
    });
  };

  return (
    <div>
      <Tooltip title="Edit Episode">
        <EditIcon onClick={handleClickOpen} style={{ cursor: 'pointer' }} />
      </Tooltip>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Your Episode!</DialogTitle>
        <DialogContent>
          <DialogContentText>Update the values as you&apos;d like, then save to update your episode.</DialogContentText>

          <Typography variant="subtitle1" component="div" style={{ marginTop: '1rem' }}>
            Thumbnail Image
          </Typography>
          {formValues.thumb && (
            <Typography variant="body1" component="div" style={{ marginTop: '0rem' }}>
              {'You currently have a thumbnail image, you can see it '}
              <a href={formValues.thumb} style={{ color: 'blue', textDecoration: 'underline' }}>
                here
              </a>
            </Typography>
          )}
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

          <Typography variant="subtitle1" component="div" style={{ marginTop: '1rem' }}>
            Panels
          </Typography>
          {formValues.panels && (
            <Typography variant="body1" component="div" style={{ marginTop: '0rem' }}>
              {'You currently have panels uploaded, you can see it '}
              <a href={formValues.panels} style={{ color: 'blue', textDecoration: 'underline' }}>
                here
              </a>
            </Typography>
          )}
          <input
            id="panels"
            accept="application/pdf"
            type="file"
            style={{
              padding: '5px',
            }}
            files={formValues.panels}
            onChange={(e) => {
              e.preventDefault();

              setFormValues((formVals) => ({
                ...formVals,
                panels: e.target.files[0] ? e.target.files[0] : undefined,
              }));
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={submit}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default EditEpisode;
