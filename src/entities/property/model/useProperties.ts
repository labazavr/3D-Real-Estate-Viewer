import { useEffect, useState } from 'react';
import { propertyRepository } from '@/entities/property/api/propertyRepository';
import type { Property } from './types';

interface PropertiesQueryState {
  data: Property[];
  loading: boolean;
  error: string | null;
}

export const useProperties = (): PropertiesQueryState => {
  const [state, setState] = useState<PropertiesQueryState>({ data: [], loading: true, error: null });

  useEffect(() => {
    let active = true;

    propertyRepository
      .getAll()
      .then((data) => active && setState({ data, loading: false, error: null }))
      .catch(() => active && setState({ data: [], loading: false, error: 'Unable to load property inventory.' }));

    return () => {
      active = false;
    };
  }, []);

  return state;
};
