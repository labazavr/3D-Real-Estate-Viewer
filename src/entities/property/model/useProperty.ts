import { useEffect, useState } from 'react';
import { propertyRepository } from '@/entities/property/api/propertyRepository';
import type { Property } from './types';

interface PropertyQueryState {
  data: Property | null;
  loading: boolean;
  error: string | null;
}

export const useProperty = (id: string | undefined): PropertyQueryState => {
  const [state, setState] = useState<PropertyQueryState>({ data: null, loading: true, error: null });

  useEffect(() => {
    let active = true;

    if (!id) {
      setState({ data: null, loading: false, error: 'Property identifier is missing.' });
      return () => {
        active = false;
      };
    }

    setState({ data: null, loading: true, error: null });
    propertyRepository
      .getById(id)
      .then((data) => active && setState({ data, loading: false, error: null }))
      .catch(() => active && setState({ data: null, loading: false, error: 'Unable to load this property.' }));

    return () => {
      active = false;
    };
  }, [id]);

  return state;
};
