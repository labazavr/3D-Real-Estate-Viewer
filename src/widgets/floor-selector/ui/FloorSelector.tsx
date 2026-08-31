import { Box, Stack, Typography } from '@mui/material';
import { floorOptions } from '@/entities/floor/model/mockFloors';
import { FloorSelect } from '@/features/select-floor/ui/FloorSelect';

interface FloorSelectorProps {
  totalFloors: number;
}

export const FloorSelector = ({ totalFloors }: FloorSelectorProps) => {
  const availableFloors = floorOptions.filter((floor) => floor.value <= totalFloors);

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      alignItems={{ xs: 'stretch', sm: 'center' }}
      spacing={1.25}
      sx={{ maxWidth: { md: 620 } }}
    >
      <Box sx={{ textAlign: { xs: 'left', sm: 'right' }, flexShrink: 0 }}>
        <Typography variant="caption" color="text.secondary">Building floor</Typography>
        <Typography variant="body2" sx={{ fontWeight: 650 }}>Explore vertical context</Typography>
      </Box>
      <FloorSelect options={availableFloors} />
    </Stack>
  );
};
