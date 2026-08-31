import { Box, CircularProgress, Stack, Typography } from '@mui/material';

interface AppLoadingScreenProps {
  label?: string;
}

export const AppLoadingScreen = ({ label = 'Loading' }: AppLoadingScreenProps) => (
  <Box
    sx={{
      minHeight: '100dvh',
      display: 'grid',
      placeItems: 'center',
      px: 2,
    }}
  >
    <Stack alignItems="center" spacing={2}>
      <CircularProgress size={30} thickness={3} />
      <Typography color="text.secondary">{label}</Typography>
    </Stack>
  </Box>
);
