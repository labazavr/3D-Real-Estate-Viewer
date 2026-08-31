export type RoomType = 'Living' | 'Bedroom' | 'Kitchen' | 'Bathroom';

export interface Room {
  id: string;
  name: string;
  area: number;
  floor: number;
  ceilingHeight: number;
  orientation: string;
  type: RoomType;
  color: string;
  layout: {
    position: [number, number, number];
    size: [number, number];
  };
}
