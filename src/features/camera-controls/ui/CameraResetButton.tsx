import { RestartAltRounded } from '@mui/icons-material';
import { Button } from '@mui/material';

interface CameraResetButtonProps {
  onReset: () => void;
}

export const CameraResetButton = ({ onReset }: CameraResetButtonProps) => (
  <Button
    onClick={onReset}
    startIcon={<RestartAltRounded />}
    size="small"
    variant="outlined"
    sx={{
      position: 'absolute',
      zIndex: 10,
      left: 14,
      bottom: 14,
      bgcolor: 'rgba(6,10,16,0.72)',
      backdropFilter: 'blur(12px)',
      minHeight: 40,
    }}
  >
    Reset camera
  </Button>
);
