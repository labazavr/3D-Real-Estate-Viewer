interface WallProps {
  position: [number, number, number];
  size: [number, number, number];
}

export const Wall = ({ position, size }: WallProps) => (
  <mesh castShadow receiveShadow position={position}>
    <boxGeometry args={size} />
    <meshStandardMaterial color="#d8dde2" roughness={0.82} />
  </mesh>
);
