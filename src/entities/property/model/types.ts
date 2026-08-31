import type { Room } from '@/entities/room/model/types';

export type PropertyModelSource =
  | { type: 'procedural' }
  | { type: 'glb'; path: string; scale?: number };

export interface PropertyPhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
}

export interface Property {
  id: string;
  name: string;
  residence: string;
  location: string;
  area: number;
  floor: number;
  totalFloors: number;
  roomCount: number;
  price: number;
  currency: 'EUR';
  preview: string;
  status: 'Available' | 'Reserved';
  rooms: Room[];
  photos: PropertyPhoto[];
  modelSource: PropertyModelSource;
}
