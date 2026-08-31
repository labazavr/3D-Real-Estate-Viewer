import type { FloorOption } from './types';

export const floorOptions: FloorOption[] = Array.from({ length: 12 }, (_, index) => ({
  value: index + 1,
  label: String(index + 1),
}));
