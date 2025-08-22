import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Rating,
  Box,
} from '@mui/material';

function RatingForm({ open, handleClose, handleSubmit, storeName, currentRating }) {
  const [rating, setRating] = useState(currentRating || 0);

  const onFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(rating);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Rate: {storeName}</DialogTitle>
      <form onSubmit={onFormSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <Rating
              name="rating"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              size="large"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Submit Rating
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default RatingForm;
