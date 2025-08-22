import { useState, useEffect } from 'react';
import { getStoreOwnerDashboard } from '../services/api';
import {
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Card,
  CardContent,
  Rating
} from '@mui/material';

function StoreOwnerDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStoreOwnerDashboard();
        setDashboardData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!dashboardData) return <Typography>No data found.</Typography>;


  const { storeDetails, ratings } = dashboardData;

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 2 }}>
        {storeDetails.name} - Dashboard
      </Typography>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6">Overall Rating</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <Rating value={parseFloat(storeDetails.overallRating) || 0} precision={0.1} readOnly />
            <Typography sx={{ ml: 1 }}>
              ({parseFloat(storeDetails.overallRating).toFixed(2)} average)
            </Typography>
          </Box>
        </CardContent>
      </Card>
      
      <Typography variant="h5" sx={{ my: 2 }}>Users Who Rated Your Store</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell>User Email</TableCell>
              <TableCell>Rating</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ratings.map((rating) => (
              <TableRow key={rating.id}>
                <TableCell>{rating.User.name}</TableCell>
                <TableCell>{rating.User.email}</TableCell>
                <TableCell>
                  <Rating value={rating.rating} readOnly />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default StoreOwnerDashboard;  