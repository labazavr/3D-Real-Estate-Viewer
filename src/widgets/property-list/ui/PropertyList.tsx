import { Box } from '@mui/material';
import type { Property } from '@/entities/property/model/types';
import { EmptyState } from '@/shared/ui/EmptyState';
import { PropertyCard } from './PropertyCard';

interface PropertyListProps {
  properties: Property[];
}

export const PropertyList = ({ properties }: PropertyListProps) => {
  if (properties.length === 0) {
    return (
      <EmptyState
        title="No properties available"
        description="New listings will appear here when inventory becomes available."
      />
    );
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
        gap: 2.5,
      }}
    >
      {properties.map((property) => <PropertyCard key={property.id} property={property} />)}
    </Box>
  );
};
