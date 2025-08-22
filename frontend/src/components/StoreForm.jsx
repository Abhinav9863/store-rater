import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';

function StoreForm({ open, handleClose, handleSubmit, store }) {
  const [name, setName] = useState(store ? store.name : '');
  const [email, setEmail] = useState(store ? store.email : '');
  const [address, setAddress] = useState(store ? store.address : '');

  const onFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit({ name, email, address });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{store ? 'Edit Store' : 'Add New Store'}</DialogTitle>
      <form onSubmit={onFormSubmit}>
        <DialogContent>
          <TextField autoFocus margin="dense" name="name" label="Store Name" type="text" fullWidth variant="outlined" value={name} onChange={(e) => setName(e.target.value)} required />
          <TextField margin="dense" name="email" label="Email Address" type="email" fullWidth variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <TextField margin="dense" name="address" label="Address" type="text" fullWidth variant="outlined" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {store ? 'Save Changes' : 'Create Store'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default StoreForm;
