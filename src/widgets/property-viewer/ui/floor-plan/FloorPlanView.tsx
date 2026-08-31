import { Box, Stack, Typography } from '@mui/material';
import { useViewerStore } from '@/app/store/viewerStore';
import type { Property } from '@/entities/property/model/types';

interface FloorPlanViewProps {
  property: Property;
}

export const FloorPlanView = ({ property }: FloorPlanViewProps) => {
  const selectedRoomId = useViewerStore((state) => state.selectedRoomId);
  const setSelectedRoom = useViewerStore((state) => state.setSelectedRoom);

  const positions: Record<string, { gridArea: string }> = {
    'living-room': { gridArea: 'living' },
    bedroom: { gridArea: 'bedroom' },
    kitchen: { gridArea: 'kitchen' },
    bathroom: { gridArea: 'bathroom' },
  };

  return (
    <Box sx={{ height: '100%', display: 'grid', placeItems: 'center', p: { xs: 2, md: 5 }, pt: 10 }}>
      <Box
        sx={{
          width: 'min(100%, 860px)',
          aspectRatio: { xs: '4 / 5', sm: '5 / 3.6' },
          display: 'grid',
          gridTemplateAreas: `"living bedroom" "kitchen bathroom"`,
          gridTemplateColumns: '1.15fr 1fr',
          gridTemplateRows: '1.15fr 0.85fr',
          gap: '6px',
          p: '6px',
          bgcolor: '#d7dde0',
          borderRadius: 2.5,
          boxShadow: '0 30px 90px rgba(0,0,0,0.34)',
        }}
      >
        {property.rooms.map((room) => {
          const selected = selectedRoomId === room.id;
          return (
            <Box
              key={room.id}
              component="button"
              onClick={() => setSelectedRoom(selected ? null : room.id)}
              sx={{
                gridArea: positions[room.id]?.gridArea,
                border: 0,
                cursor: 'pointer',
                borderRadius: 1.5,
                p: { xs: 1.2, sm: 2 },
                textAlign: 'left',
                display: 'flex',
                alignItems: 'flex-end',
                background: selected
                  ? 'linear-gradient(145deg, #7ce7d5, #53afa2)'
                  : `linear-gradient(145deg, ${room.color}, #202a34)`,
                color: selected ? '#071011' : '#fff',
                transition: 'transform 160ms ease, filter 160ms ease',
                '&:hover': { filter: 'brightness(1.12)', transform: 'scale(0.995)' },
              }}
            >
              <Stack spacing={0.3}>
                <Typography sx={{ fontWeight: 750, fontSize: { xs: '0.82rem', sm: '1rem' } }}>{room.name}</Typography>
                <Typography variant="caption" sx={{ opacity: 0.78 }}>{room.area.toFixed(1)} m²</Typography>
              </Stack>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
