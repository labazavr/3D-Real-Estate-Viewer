import { ArrowBackRounded } from '@mui/icons-material';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Box component="main" sx={{ minHeight: '100dvh', display: 'grid', placeItems: 'center', px: 2 }}>
      <Stack spacing={2} alignItems="center" textAlign="center">
        <Typography variant="overline" color="primary.main" sx={{ letterSpacing: '0.18em' }}>404 · NOT FOUND</Typography>
        <Typography variant="h2" sx={{ fontSize: { xs: '2.5rem', sm: '4rem' } }}>This space is off-market.</Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 520 }}>
          The requested page does not exist. Return to the property catalogue and continue exploring available residences.
        </Typography>
        <Button variant="contained" startIcon={<ArrowBackRounded />} onClick={() => navigate('/properties')} sx={{ color: '#071011' }}>
          Browse properties
        </Button>
      </Stack>
    </Box>
  );
};

export default NotFoundPage;
