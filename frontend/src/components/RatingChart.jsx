import { useState, useEffect } from 'react';
import { getRatingDistribution } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Paper, Typography, Box } from '@mui/material';

const COLORS = ['#FF8042', '#FFBB28', '#00C49F', '#0088FE', '#8884d8'];

function RatingChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRatingDistribution();
        const formattedData = response.data.map(item => ({
          name: `${item.rating} Star`,
          count: parseInt(item.count, 10),
        }));
        setData(formattedData);
      } catch (error) {
        console.error('Failed to fetch rating distribution:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Paper sx={{ p: 2, mt: 4, height: 350, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" gutterBottom>Rating Distribution</Typography>
      {/* --- THIS IS THE FIX --- */}
      {!loading && data.length === 0 ? (
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography color="text.secondary">No rating data available yet.</Typography>
        </Box>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name.charCodeAt(0) % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </Paper>
  );
}

export default RatingChart;