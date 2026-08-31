import { Box, Skeleton, Stack } from '@mui/material';

export const PropertyListSkeleton = () => (
  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' }, gap: 2.5 }}>
    {Array.from({ length: 4 }, (_, index) => (
      <Box key={index} sx={{ border: '1px solid rgba(255,255,255,.07)', borderRadius: 4, overflow: 'hidden' }}>
        <Skeleton variant="rectangular" height={260} animation="wave" />
        <Stack spacing={1.2} sx={{ p: 3 }}>
          <Skeleton width="45%" height={34} />
          <Skeleton width="70%" />
          <Skeleton width="90%" height={54} />
        </Stack>
      </Box>
    ))}
  </Box>
);
