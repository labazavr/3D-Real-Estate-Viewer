import type { Room } from '@/entities/room/model/types';
import { Furniture } from './Furniture';
import { RoomMesh } from './RoomMesh';
import { Wall } from './Wall';

interface ProceduralApartmentProps {
  rooms: Room[];
}

export const ProceduralApartment = ({ rooms }: ProceduralApartmentProps) => (
  <group rotation={[0, -0.08, 0]}>
    <mesh receiveShadow position={[0, -0.15, 0]}>
      <boxGeometry args={[11.5, 0.22, 9]} />
      <meshStandardMaterial color="#111923" roughness={0.92} />
    </mesh>

    {rooms.map((room) => <RoomMesh key={room.id} room={room} />)}

    <Wall position={[0, 1.25, -4.35]} size={[11.2, 2.7, 0.16]} />
    <Wall position={[0, 1.25, 4.35]} size={[11.2, 2.7, 0.16]} />
    <Wall position={[-5.52, 1.25, 0]} size={[0.16, 2.7, 8.6]} />
    <Wall position={[5.52, 1.25, 0]} size={[0.16, 2.7, 8.6]} />
    <Wall position={[0, 1.25, 2.95]} size={[0.14, 2.7, 2.8]} />
    <Wall position={[0, 1.25, -2.85]} size={[0.14, 2.7, 2.7]} />
    <Wall position={[-3.4, 1.25, -1.05]} size={[4.2, 2.7, 0.14]} />
    <Wall position={[3.25, 1.25, -0.7]} size={[4.4, 2.7, 0.14]} />

    <Furniture />
  </group>
);
