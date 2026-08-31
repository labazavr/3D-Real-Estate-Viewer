import { Alert, AlertTitle, Button, Stack } from '@mui/material';

interface ErrorStateProps {
  title?: string;
  message: string;
  actionLabel?: string;
  onRetry?: () => void;
}

export const ErrorState = ({
  title = 'Something went wrong',
  message,
  actionLabel = 'Try again',
  onRetry,
}: ErrorStateProps) => (
  <Stack spacing={2} sx={{ p: 2 }}>
    <Alert severity="error" variant="outlined">
      <AlertTitle>{title}</AlertTitle>
      {message}
    </Alert>
    {onRetry ? (
      <Button variant="outlined" onClick={onRetry} sx={{ alignSelf: 'flex-start' }}>
        {actionLabel}
      </Button>
    ) : null}
  </Stack>
);
