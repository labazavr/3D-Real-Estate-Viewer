import { Box, Chip, Container, Stack, Typography } from '@mui/material';
import { useProperties } from '@/entities/property/model/useProperties';
import { ErrorState } from '@/shared/ui/ErrorState';
import { PropertyListSkeleton } from '@/shared/ui/PropertyListSkeleton';
import { PropertyList } from '@/widgets/property-list/ui/PropertyList';

const PropertiesPage = () => {
  const { data, loading, error } = useProperties();

  return (
    <Box component="main" sx={{ minHeight: '100dvh', py: { xs: 4, md: 7 } }}>
      <Container maxWidth="xl">
        <Stack spacing={{ xs: 4, md: 6 }}>
          <Stack spacing={2} sx={{ maxWidth: 840 }}>
            <Chip
              label="LIVE INVENTORY · 04 RESIDENCES"
              size="small"
              variant="outlined"
              sx={{ alignSelf: 'flex-start', color: 'primary.main', letterSpacing: '0.08em' }}
            />
            <Typography variant="h1" sx={{ fontSize: { xs: '2.6rem', md: '4.8rem' }, lineHeight: 0.98 }}>
              Spaces worth exploring.
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: { xs: '1rem', md: '1.15rem' }, maxWidth: 620 }}>
              Browse curated residences, inspect spatial layouts in 3D and move from overview to room-level detail without leaving the experience.
            </Typography>
          </Stack>

          {loading ? <PropertyListSkeleton /> : null}
          {error ? (
            <ErrorState
              message={error}
              onRetry={() => window.location.reload()}
            />
          ) : null}
          {!loading && !error ? <PropertyList properties={data} /> : null}
        </Stack>
      </Container>
    </Box>
  );
};

export default PropertiesPage;
