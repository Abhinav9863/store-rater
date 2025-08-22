import { useState, useEffect } from 'react';
import { getAllStores, createStore, updateStore, deleteStore, getAdminStats, getAdminUsers } from '../services/api';
import StoreForm from '../components/StoreForm';
import {
  Typography, Container, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, Button, Box, Grid, Card,
  CardContent, TextField, TableSortLabel, Rating
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const StatCard = ({ title, value }) => (
  <Card>
    <CardContent>
      <Typography variant="h5" component="div">{value}</Typography>
      <Typography color="text.secondary">{title}</Typography>
    </CardContent>
  </Card>
);

function AdminDashboard() {
  const [stores, setStores] = useState([]);
  const [users, setUsers] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStore, setEditingStore] = useState(null);
  const [stats, setStats] = useState({ users: 0, stores: 0, ratings: 0 });
  const [userFilters, setUserFilters] = useState({ name: '', email: '' });
  const [userSort, setUserSort] = useState({ sortBy: 'name', sortOrder: 'asc' });

  const fetchAllData = async () => {
    try {
      const params = { ...userFilters, sortBy: userSort.sortBy, sortOrder: userSort.sortOrder };
      const [storesRes, statsRes, usersRes] = await Promise.all([
        getAllStores(),
        getAdminStats(),
        getAdminUsers(params)
      ]);
      setStores(storesRes.data);
      setStats(statsRes.data);
      setUsers(usersRes.data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [userFilters, userSort]);

  const handleSortRequest = (property) => {
    const isAsc = userSort.sortBy === property && userSort.sortOrder === 'asc';
    setUserSort({ sortBy: property, sortOrder: isAsc ? 'desc' : 'asc' });
  };

  const handleUserFilterChange = (e) => {
    setUserFilters({ ...userFilters, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (storeData) => {
    try {
      if (editingStore) {
        await updateStore(editingStore.id, storeData);
      } else {
        await createStore(storeData);
      }
      fetchAllData();
      handleCloseForm();
    } catch (error) {
      console.error('Failed to save store:', error);
    }
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this store?')) {
      try {
        await deleteStore(id);
        fetchAllData();
      } catch (error) {
        console.error('Failed to delete store:', error);
      }
    }
  };

  const handleEditClick = (store) => {
    setEditingStore(store);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingStore(null);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 2 }}>Admin Dashboard</Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}><StatCard title="Total Users" value={stats.users} /></Grid>
        <Grid item xs={12} sm={4}><StatCard title="Total Stores" value={stats.stores} /></Grid>
        <Grid item xs={12} sm={4}><StatCard title="Total Ratings" value={stats.ratings} /></Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
        <Typography variant="h5">Manage Stores</Typography>
        <Button variant="contained" color="primary" onClick={() => setIsFormOpen(true)}>
          Add New Store
        </Button>
      </Box>

      {isFormOpen && (
        <StoreForm open={isFormOpen} handleClose={handleCloseForm} handleSubmit={handleFormSubmit} store={editingStore} />
      )}

      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Overall Rating</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stores.map((store) => (
              <TableRow
                key={store.id}
                // --- HOVER EFFECT ADDED HERE ---
                sx={{ '&:hover': { backgroundColor: 'action.hover' } }}
              >
                <TableCell>{store.name}</TableCell>
                <TableCell>{store.address}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Rating value={parseFloat(store.overallRating) || 0} precision={0.1} readOnly />
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleEditClick(store)}><EditIcon /></IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteClick(store.id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h5" sx={{ my: 2 }}>Manage Users</Typography>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={5}>
            <TextField fullWidth label="Filter by Name" name="name" value={userFilters.name} onChange={handleUserFilterChange} />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField fullWidth label="Filter by Email" name="email" value={userFilters.email} onChange={handleUserFilterChange} />
          </Grid>
        </Grid>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sortDirection={userSort.sortBy === 'name' ? userSort.sortOrder : false}>
                <TableSortLabel active={userSort.sortBy === 'name'} direction={userSort.sortBy === 'name' ? userSort.sortOrder : 'asc'} onClick={() => handleSortRequest('name')}>Name</TableSortLabel>
              </TableCell>
              <TableCell sortDirection={userSort.sortBy === 'email' ? userSort.sortOrder : false}>
                <TableSortLabel active={userSort.sortBy === 'email'} direction={userSort.sortBy === 'email' ? userSort.sortOrder : 'asc'} onClick={() => handleSortRequest('email')}>Email</TableSortLabel>
              </TableCell>
              <TableCell sortDirection={userSort.sortBy === 'role' ? userSort.sortOrder : false}>
                 <TableSortLabel active={userSort.sortBy === 'role'} direction={userSort.sortBy === 'role' ? userSort.sortOrder : 'asc'} onClick={() => handleSortRequest('role')}>Role</TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                // --- HOVER EFFECT ADDED HERE ---
                sx={{ '&:hover': { backgroundColor: 'action.hover' } }}
              >
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default AdminDashboard;