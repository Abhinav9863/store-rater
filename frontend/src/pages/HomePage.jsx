import { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAllStores, getMyRatings, submitRating, updateRating } from '../services/api';
import AuthContext from '../context/AuthContext';
import RatingForm from '../components/RatingForm';
import {
  Container, Typography, Card, CardContent, CardActions, Button,
  Box, Grid, TextField, Paper, Rating
} from '@mui/material';

function HomePage() {
  const [stores, setStores] = useState([]);
  const [searchParams] = useSearchParams();
  const { user } = useContext(AuthContext);
  const [isRatingFormOpen, setIsRatingFormOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const search = searchParams.get('search') || '';
      try {
        const storesResponse = await getAllStores({ search });
        let storesData = storesResponse.data;
        if (user) {
          const myRatingsResponse = await getMyRatings();
          const myRatingsMap = new Map(myRatingsResponse.data.map(r => [r.storeId, r.rating]));
          storesData = storesData.map(store => ({ ...store, userRating: myRatingsMap.get(store.id) || null }));
        }
        setStores(storesData);
      } catch (error) { console.error('Failed to fetch data:', error); }
    };
    fetchData();
  }, [searchParams, user]);

  const handleOpenRatingForm = (store) => {
    setSelectedStore(store);
    setIsRatingFormOpen(true);
  };

  const handleRatingSubmit = async (rating) => {
    if (!selectedStore) return;
    try {
      if (selectedStore.userRating) {
        await updateRating(selectedStore.id, { rating });
      } else {
        await submitRating(selectedStore.id, { rating });
      }
      setIsRatingFormOpen(false);
      setSelectedStore(null);
      // Re-fetch data after submitting/updating a rating
      const search = searchParams.get('search') || '';
      const storesResponse = await getAllStores({ search });
      let storesData = storesResponse.data;
      if (user) {
        const myRatingsResponse = await getMyRatings();
        const myRatingsMap = new Map(myRatingsResponse.data.map(r => [r.storeId, r.rating]));
        storesData = storesData.map(store => ({ ...store, userRating: myRatingsMap.get(store.id) || null }));
      }
      setStores(storesData);
    } catch (error) {
      console.error('Failed to save rating:', error);
      alert('An error occurred while saving your rating.');
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 2 }}>
        Stores
      </Typography>

      <Box>
        {stores.length > 0 ? (
          stores.map((store) => (
            <Card
              key={store.id}
              // --- ANIMATION ADDED HERE ---
              sx={{ mb: 2, animation: 'fadeIn 0.5s ease-in-out' }}
            >
              <CardContent>
                <Typography variant="h5">{store.name}</Typography>
                <Typography color="text.secondary" gutterBottom>{store.address}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
                  <Rating value={parseFloat(store.overallRating) || 0} precision={0.1} readOnly />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    ({store.overallRating ? parseFloat(store.overallRating).toFixed(1) : 'N/A'})
                  </Typography>
                </Box>
                {user && (
                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" color="primary" sx={{ mr: 1, fontWeight: 'bold' }}>
                       Your Rating:
                    </Typography>
                    <Rating value={store.userRating || 0} readOnly />
                  </Box>
                )}
              </CardContent>
              {user && (
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => handleOpenRatingForm(store)}
                    variant="contained"
                  >
                    {store.userRating ? 'Modify Your Rating' : 'Add Your Rating'}
                  </Button>
                </CardActions>
              )}
            </Card>
          ))
        ) : (
          <Typography sx={{ mt: 4 }}>No stores found matching your search.</Typography>
        )}
      </Box>

      {selectedStore && (
        <RatingForm
          open={isRatingFormOpen}
          handleClose={() => setIsRatingFormOpen(false)}
          handleSubmit={handleRatingSubmit}
          storeName={selectedStore.name}
          currentRating={selectedStore.userRating}
        />
      )}
    </Container>
  );
}

export default HomePage;