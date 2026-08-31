import { getPropertyById, properties } from '@/entities/property/model/mockProperties';
import type { Property } from '@/entities/property/model/types';

const MOCK_NETWORK_DELAY_MS = 180;

const delay = () => new Promise<void>((resolve) => window.setTimeout(resolve, MOCK_NETWORK_DELAY_MS));

export const propertyRepository = {
  async getAll(): Promise<Property[]> {
    await delay();
    return properties;
  },

  async getById(id: string): Promise<Property | null> {
    await delay();
    return getPropertyById(id) ?? null;
  },
};
