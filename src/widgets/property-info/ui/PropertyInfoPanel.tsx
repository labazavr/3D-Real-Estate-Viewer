import { Box, Chip, Divider, Stack, Typography } from '@mui/material';
import { useViewerStore } from '@/app/store/viewerStore';
import type { Property } from '@/entities/property/model/types';
import { RoomList } from '@/features/select-room/ui/RoomList';
import { formatArea, formatCurrency } from '@/shared/lib/format';
import { GlassPanel } from '@/shared/ui/GlassPanel';

interface PropertyInfoPanelProps {
  property: Property;
}

export const PropertyInfoPanel = ({ property }: PropertyInfoPanelProps) => {
  const selectedRoomId = useViewerStore((state) => state.selectedRoomId);
  const selectedFloor = useViewerStore((state) => state.selectedFloor);
  const selectedRoom = property.rooms.find((room) => room.id === selectedRoomId);

  return (
    <GlassPanel
      component="aside"
      sx={{
        p: { xs: 2, md: 2.5 },
        minWidth: 0,
        height: { lg: 'calc(100dvh - 118px)' },
        maxHeight: { lg: 980 },
        overflowY: 'auto',
      }}
    >
      <Stack spacing={2.5}>
        <Stack spacing={1}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1}>
            <Typography variant="h4" sx={{ fontSize: '1.8rem', fontWeight: 750 }}>{property.name}</Typography>
            <Chip label={property.status} size="small" color="primary" variant="outlined" />
          </Stack>
          <Typography color="text.secondary">{property.residence}</Typography>
          <Typography variant="h5" sx={{ pt: 1 }}>{formatCurrency(property.price, property.currency)}</Typography>
        </Stack>

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
          <InfoTile label="Area" value={formatArea(property.area)} />
          <InfoTile label="Rooms" value={String(property.roomCount)} />
          <InfoTile label="Property floor" value={`${property.floor} / ${property.totalFloors}`} />
          <InfoTile label="Previewing" value={`Floor ${selectedFloor}`} />
        </Box>

        <Divider />

        <Stack spacing={1.3}>
          <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: '0.12em' }}>Selected room</Typography>
          {selectedRoom ? (
            <Stack spacing={1.2}>
              <Typography variant="h5">{selectedRoom.name}</Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.2 }}>
                <Detail label="Area" value={formatArea(selectedRoom.area)} />
                <Detail label="Floor" value={String(selectedRoom.floor)} />
                <Detail label="Ceiling" value={`${selectedRoom.ceilingHeight.toFixed(1)} m`} />
                <Detail label="Orientation" value={selectedRoom.orientation} />
              </Box>
            </Stack>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Select a room in the 3D model, floor plan or room list to inspect its specifications.
            </Typography>
          )}
        </Stack>

        <Divider />

        <Stack spacing={1.25}>
          <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: '0.12em' }}>Rooms</Typography>
          <RoomList rooms={property.rooms} />
        </Stack>
      </Stack>
    </GlassPanel>
  );
};

const InfoTile = ({ label, value }: { label: string; value: string }) => (
  <Box sx={{ p: 1.4, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
    <Typography variant="caption" color="text.secondary">{label}</Typography>
    <Typography sx={{ fontWeight: 650 }}>{value}</Typography>
  </Box>
);

const Detail = ({ label, value }: { label: string; value: string }) => (
  <Box>
    <Typography variant="caption" color="text.secondary">{label}</Typography>
    <Typography variant="body2" sx={{ fontWeight: 650 }}>{value}</Typography>
  </Box>
);
