import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import type { ViewMode } from '@/app/store/viewerStore';
import { useViewerStore } from '@/app/store/viewerStore';

const options: Array<{ value: ViewMode; label: string }> = [
  { value: '3d', label: '3D' },
  { value: 'floor-plan', label: 'Floor plan' },
  { value: 'photos', label: 'Photos' },
];

export const ViewModeToggle = () => {
  const currentView = useViewerStore((state) => state.currentView);
  const setCurrentView = useViewerStore((state) => state.setCurrentView);

  return (
    <ToggleButtonGroup
      exclusive
      value={currentView}
      onChange={(_, value: ViewMode | null) => value && setCurrentView(value)}
      size="small"
      aria-label="Viewer mode"
      sx={{
        p: 0.5,
        bgcolor: 'rgba(6,10,16,0.7)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 2.5,
        '& .MuiToggleButton-root': {
          border: 0,
          borderRadius: '9px !important',
          px: { xs: 1.2, sm: 2 },
          minHeight: 38,
          color: 'text.secondary',
          '&.Mui-selected': { bgcolor: 'rgba(124,231,213,0.14)', color: 'primary.main' },
        },
      }}
    >
      {options.map((option) => (
        <ToggleButton key={option.value} value={option.value}>{option.label}</ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
