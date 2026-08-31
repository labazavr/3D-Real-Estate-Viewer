import { ButtonBase } from '@mui/material';
import { useViewerStore } from '@/app/store/viewerStore';
import type { FloorOption } from '@/entities/floor/model/types';

interface FloorSelectProps {
  options: FloorOption[];
}

export const FloorSelect = ({ options }: FloorSelectProps) => {
  const selectedFloor = useViewerStore((state) => state.selectedFloor);
  const setSelectedFloor = useViewerStore((state) => state.setSelectedFloor);

  return (
    <div
      role="group"
      aria-label="Select building floor"
      style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'flex-end' }}
    >
      {options.map((floor) => {
        const selected = floor.value === selectedFloor;

        return (
          <ButtonBase
            key={floor.value}
            aria-pressed={selected}
            onClick={() => setSelectedFloor(floor.value)}
            sx={{
              width: 34,
              height: 34,
              borderRadius: 1.5,
              border: '1px solid',
              borderColor: selected ? 'rgba(124,231,213,.55)' : 'rgba(255,255,255,.08)',
              bgcolor: selected ? 'rgba(124,231,213,.13)' : 'rgba(255,255,255,.025)',
              color: selected ? 'primary.main' : 'text.secondary',
              fontSize: '0.78rem',
              fontWeight: 700,
              '&:hover': {
                bgcolor: selected ? 'rgba(124,231,213,.18)' : 'rgba(255,255,255,.06)',
              },
            }}
          >
            {floor.label}
          </ButtonBase>
        );
      })}
    </div>
  );
};
