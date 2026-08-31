import { Paper, type PaperProps } from '@mui/material';

export const GlassPanel = ({ sx, ...props }: PaperProps) => (
  <Paper
    elevation={0}
    {...props}
    sx={{
      border: '1px solid rgba(255,255,255,0.08)',
      background: 'linear-gradient(180deg, rgba(20,29,41,0.92), rgba(12,18,27,0.92))',
      backdropFilter: 'blur(18px)',
      boxShadow: '0 24px 80px rgba(0,0,0,0.28)',
      ...sx,
    }}
  />
);
