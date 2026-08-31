import { Box, Button, Stack, Typography } from '@mui/material';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState = ({ title, description, actionLabel, onAction }: EmptyStateProps) => (
  <Box sx={{ py: 10, px: 2, textAlign: 'center' }}>
    <Stack spacing={1.5} alignItems="center">
      <Typography variant="h5">{title}</Typography>
      <Typography color="text.secondary" sx={{ maxWidth: 520 }}>
        {description}
      </Typography>
      {actionLabel && onAction ? (
        <Button variant="outlined" onClick={onAction} sx={{ mt: 1 }}>
          {actionLabel}
        </Button>
      ) : null}
    </Stack>
  </Box>
);
