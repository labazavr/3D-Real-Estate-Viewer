import { ArrowBackRounded } from '@mui/icons-material';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useViewerStore } from '@/app/store/viewerStore';
import { useProperty } from '@/entities/property/model/useProperty';
import { AppLoadingScreen } from '@/shared/ui/AppLoadingScreen';
import { ErrorState } from '@/shared/ui/ErrorState';
import { FloorSelector } from '@/widgets/floor-selector/ui/FloorSelector';
import { PropertyInfoPanel } from '@/widgets/property-info/ui/PropertyInfoPanel';
import { PropertyViewerWidget } from '@/widgets/property-viewer/ui/PropertyViewerWidget';

const PropertyViewerPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: property, loading, error } = useProperty(id);
  const setSelectedProperty = useViewerStore((state) => state.setSelectedProperty);
  const resetViewer = useViewerStore((state) => state.resetViewer);

  useEffect(() => {
    if (property) {
      setSelectedProperty(property.id, property.floor);
    }
    return () => resetViewer();
  }, [property, resetViewer, setSelectedProperty]);

  if (loading) {
    return <AppLoadingScreen label="Loading property workspace" />;
  }

  if (error) {
    return (
      <Box component="main" sx={{ minHeight: '100dvh', display: 'grid', placeItems: 'center', p: 2 }}>
        <ErrorState message={error} onRetry={() => window.location.reload()} />
      </Box>
    );
  }

  if (!property) {
    return (
      <Box component="main" sx={{ minHeight: '100dvh', display: 'grid', placeItems: 'center', p: 2 }}>
        <ErrorState
          title="Property not found"
          message="This listing does not exist or is no longer available."
          actionLabel="Back to properties"
          onRetry={() => navigate('/properties')}
        />
      </Box>
    );
  }

  return (
    <Box component="main" sx={{ minHeight: '100dvh', py: { xs: 2, md: 3 } }}>
      <Container maxWidth={false} sx={{ maxWidth: 1800 }}>
        <Stack spacing={2}>
          <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" gap={2}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Button
                aria-label="Back to properties"
                variant="outlined"
                onClick={() => navigate('/properties')}
                sx={{ minWidth: 44, width: 44, height: 44, p: 0 }}
              >
                <ArrowBackRounded />
              </Button>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 750 }}>{property.name}</Typography>
                <Typography variant="body2" color="text.secondary">{property.residence} · {property.location}</Typography>
              </Box>
            </Stack>
            <FloorSelector totalFloors={property.totalFloors} />
          </Stack>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: 'minmax(0, 1fr)', lg: 'minmax(0, 1fr) 390px' },
              gap: 2,
              alignItems: 'stretch',
            }}
          >
            <PropertyViewerWidget property={property} />
            <PropertyInfoPanel property={property} />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default PropertyViewerPage;
