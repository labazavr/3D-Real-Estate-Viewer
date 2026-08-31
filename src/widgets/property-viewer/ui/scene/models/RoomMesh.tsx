import { Edges, Html } from '@react-three/drei';
import { useState } from 'react';
import type { ThreeEvent } from '@react-three/fiber';
import { useViewerStore } from '@/app/store/viewerStore';
import type { Room } from '@/entities/room/model/types';

interface RoomMeshProps {
  room: Room;
}

export const RoomMesh = ({ room }: RoomMeshProps) => {
  const [hovered, setHovered] = useState(false);
  const selectedRoomId = useViewerStore((state) => state.selectedRoomId);
  const setSelectedRoom = useViewerStore((state) => state.setSelectedRoom);
  const selected = selectedRoomId === room.id;
  const [x, , z] = room.layout.position;
  const [width, depth] = room.layout.size;

  const stop = (event: ThreeEvent<MouseEvent>) => event.stopPropagation();

  return (
    <group position={[x, 0, z]}>
      <mesh
        receiveShadow
        position={[0, 0.02, 0]}
        onPointerOver={(event) => {
          stop(event);
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'default';
        }}
        onPointerDown={stop}
        onClick={(event) => {
          stop(event);
          setSelectedRoom(selected ? null : room.id);
        }}
      >
        <boxGeometry args={[width, 0.14, depth]} />
        <meshStandardMaterial
          color={selected ? '#7ce7d5' : hovered ? '#8da6a2' : room.color}
          roughness={0.72}
          metalness={0.04}
          emissive={selected ? '#1a655d' : hovered ? '#263f3d' : '#000000'}
          emissiveIntensity={selected ? 0.58 : hovered ? 0.3 : 0}
        />
        <Edges color={selected ? '#bafff4' : hovered ? '#d7f7f0' : '#273341'} threshold={15} />
      </mesh>
      {(selected || hovered) && (
        <Html position={[0, 0.55, 0]} center distanceFactor={12} style={{ pointerEvents: 'none' }}>
          <div
            style={{
              padding: '7px 10px',
              borderRadius: 10,
              background: 'rgba(7,12,18,.88)',
              border: '1px solid rgba(255,255,255,.13)',
              color: '#f4f7fb',
              fontSize: 12,
              whiteSpace: 'nowrap',
              boxShadow: '0 10px 30px rgba(0,0,0,.3)',
            }}
          >
            {room.name} · {room.area.toFixed(1)} m²
          </div>
        </Html>
      )}
    </group>
  );
};
