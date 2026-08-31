import { ArrowForwardRounded } from '@mui/icons-material';
import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { Property } from '@/entities/property/model/types';
import { formatArea, formatCurrency } from '@/shared/lib/format';
import { GlassPanel } from '@/shared/ui/GlassPanel';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  const navigate = useNavigate();

  return (
    <GlassPanel
      sx={{
        overflow: 'hidden',
        transition: 'transform 180ms ease, border-color 180ms ease',
        '&:hover': { transform: 'translateY(-3px)', borderColor: 'rgba(124,231,213,0.28)' },
      }}
    >
      <Box
        component="img"
        src={property.preview}
        alt={`${property.name} architectural preview`}
        sx={{ display: 'block', width: '100%', aspectRatio: '16 / 9', objectFit: 'cover' }}
      />
      <Stack spacing={2.5} sx={{ p: { xs: 2.25, md: 3 } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>{property.name}</Typography>
            <Typography color="text.secondary" variant="body2">{property.residence} · {property.location}</Typography>
          </Box>
          <Chip
            label={property.status}
            size="small"
            color={property.status === 'Available' ? 'primary' : 'default'}
            variant="outlined"
          />
        </Stack>

        <Stack direction="row" spacing={{ xs: 2, sm: 3 }} flexWrap="wrap" useFlexGap>
          <Metric label="Area" value={formatArea(property.area)} />
          <Metric label="Floor" value={`${property.floor} / ${property.totalFloors}`} />
          <Metric label="Rooms" value={String(property.roomCount)} />
          <Metric label="Price" value={formatCurrency(property.price, property.currency)} />
        </Stack>

        <Button
          variant="contained"
          color="primary"
          endIcon={<ArrowForwardRounded />}
          onClick={() => navigate(`/properties/${property.id}`)}
          sx={{ alignSelf: { xs: 'stretch', sm: 'flex-start' }, color: '#071011' }}
        >
          Open 3D viewer
        </Button>
      </Stack>
    </GlassPanel>
  );
};

interface MetricProps {
  label: string;
  value: string;
}

const Metric = ({ label, value }: MetricProps) => (
  <Box sx={{ minWidth: 86 }}>
    <Typography variant="caption" color="text.secondary">{label}</Typography>
    <Typography sx={{ fontWeight: 650 }}>{value}</Typography>
  </Box>
);
