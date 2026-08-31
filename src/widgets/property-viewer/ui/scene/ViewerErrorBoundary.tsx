import { Alert, Box, Button } from '@mui/material';
import { Component, type ErrorInfo, type PropsWithChildren, type ReactNode } from 'react';

interface ViewerErrorBoundaryState {
  hasError: boolean;
}

export class ViewerErrorBoundary extends Component<PropsWithChildren, ViewerErrorBoundaryState> {
  state: ViewerErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ViewerErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('3D viewer failed to render', error, info);
  }

  private handleRetry = () => this.setState({ hasError: false });

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <Box sx={{ height: '100%', display: 'grid', placeItems: 'center', p: 2 }}>
          <Alert
            severity="error"
            variant="outlined"
            action={<Button onClick={this.handleRetry}>Retry</Button>}
          >
            The 3D scene could not be initialized. Try reloading the viewer or use Floor plan mode.
          </Alert>
        </Box>
      );
    }

    return this.props.children;
  }
}
