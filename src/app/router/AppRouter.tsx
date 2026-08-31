import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLoadingScreen } from '@/shared/ui/AppLoadingScreen';

const PropertiesPage = lazy(() => import('@/pages/properties/ui/PropertiesPage'));
const PropertyViewerPage = lazy(() => import('@/pages/property-viewer/ui/PropertyViewerPage'));
const NotFoundPage = lazy(() => import('@/pages/not-found/ui/NotFoundPage'));

export const AppRouter = () => (
  <Suspense fallback={<AppLoadingScreen label="Loading experience" />}>
    <Routes>
      <Route path="/" element={<Navigate to="/properties" replace />} />
      <Route path="/properties" element={<PropertiesPage />} />
      <Route path="/properties/:id" element={<PropertyViewerPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Suspense>
);
