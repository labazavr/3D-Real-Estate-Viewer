import { Box, ButtonBase, Stack, Typography } from '@mui/material';
import { useViewerStore } from '@/app/store/viewerStore';
import type { Room } from '@/entities/room/model/types';
import { formatArea } from '@/shared/lib/format';

interface RoomListProps {
  rooms: Room[];
}

export const RoomList = ({ rooms }: RoomListProps) => {
  const selectedRoomId = useViewerStore((state) => state.selectedRoomId);
  const setSelectedRoom = useViewerStore((state) => state.setSelectedRoom);

  return (
    <Stack spacing={0.75}>
      {rooms.map((room) => {
        const selected = selectedRoomId === room.id;
        return (
          <ButtonBase
            key={room.id}
            onClick={() => setSelectedRoom(selected ? null : room.id)}
            sx={{
              width: '100%',
              borderRadius: 2,
              justifyContent: 'stretch',
              textAlign: 'left',
              border: '1px solid',
              borderColor: selected ? 'rgba(124,231,213,0.5)' : 'rgba(255,255,255,0.07)',
              bgcolor: selected ? 'rgba(124,231,213,0.09)' : 'rgba(255,255,255,0.025)',
              '&:hover': { bgcolor: selected ? 'rgba(124,231,213,0.13)' : 'rgba(255,255,255,0.05)' },
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 1.35, width: '100%' }}>
              <Stack direction="row" alignItems="center" spacing={1.2}>
                <Box sx={{ width: 9, height: 9, borderRadius: '50%', bgcolor: selected ? 'primary.main' : room.color }} />
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 650 }}>{room.name}</Typography>
                  <Typography variant="caption" color="text.secondary">{room.type}</Typography>
                </Box>
              </Stack>
              <Typography variant="body2" color={selected ? 'primary.main' : 'text.secondary'}>{formatArea(room.area)}</Typography>
            </Stack>
          </ButtonBase>
        );
      })}
    </Stack>
  );
};
