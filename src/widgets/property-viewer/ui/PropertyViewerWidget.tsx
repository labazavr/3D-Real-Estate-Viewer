import { Box, Chip, Stack } from '@mui/material';
import { useViewerStore } from '@/app/store/viewerStore';
import type { Property } from '@/entities/property/model/types';
import { ViewModeToggle } from '@/features/change-view/ui/ViewModeToggle';
import { GlassPanel } from '@/shared/ui/GlassPanel';
import { FloorPlanView } from './floor-plan/FloorPlanView';
import { PhotoGallery } from './photos/PhotoGallery';
import { SceneCanvas } from './scene/SceneCanvas';

interface PropertyViewerWidgetProps {
  property: Property;
}

export const PropertyViewerWidget = ({ property }: PropertyViewerWidgetProps) => {
  const currentView = useViewerStore((state) => state.currentView);
  const selectedFloor = useViewerStore((state) => state.selectedFloor);

  return (
    <GlassPanel
      sx={{
        position: 'relative',
        overflow: 'hidden',
        minWidth: 0,
        minHeight: { xs: 520, md: 680 },
        height: { xs: '68dvh', md: 'calc(100dvh - 118px)' },
        maxHeight: 980,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        gap={1}
        sx={{ position: 'absolute', zIndex: 10, top: 14, left: 14, right: 14, pointerEvents: 'none' }}
      >
        <ViewModeToggleWrapper />
        <Chip
          label={`Floor ${selectedFloor}`}
          size="small"
          variant="outlined"
          sx={{ bgcolor: 'rgba(6,10,16,0.66)', backdropFilter: 'blur(12px)' }}
        />
      </Stack>
      {currentView === '3d' ? <SceneCanvas property={property} /> : null}
      {currentView === 'floor-plan' ? <FloorPlanView property={property} /> : null}
      {currentView === 'photos' ? <PhotoGallery property={property} /> : null}
    </GlassPanel>
  );
};

const ViewModeToggleWrapper = () => (
  <Box sx={{ pointerEvents: 'auto' }}>
    <ViewModeToggle />
  </Box>
);
