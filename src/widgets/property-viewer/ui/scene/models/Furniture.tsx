const BoxPiece = ({
  position,
  size,
  color,
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
}) => (
  <mesh castShadow receiveShadow position={position}>
    <boxGeometry args={size} />
    <meshStandardMaterial color={color} roughness={0.68} />
  </mesh>
);

export const Furniture = () => (
  <group>
    <BoxPiece position={[-2.85, 0.42, 1.5]} size={[2.4, 0.65, 0.9]} color="#555d66" />
    <BoxPiece position={[-1.9, 0.28, 0]} size={[1.35, 0.42, 0.7]} color="#8b745f" />
    <BoxPiece position={[2.3, 0.3, 1.2]} size={[2.2, 0.45, 1.65]} color="#77756f" />
    <BoxPiece position={[2.3, 0.58, 2.25]} size={[2.2, 0.55, 0.25]} color="#4c525a" />
    <BoxPiece position={[-3.45, 0.5, -3.35]} size={[1.65, 0.9, 0.55]} color="#4b5558" />
    <BoxPiece position={[-1.65, 0.5, -3.35]} size={[1.55, 0.9, 0.55]} color="#4b5558" />
    <BoxPiece position={[2.55, 0.3, -2.35]} size={[1.6, 0.5, 0.85]} color="#73858e" />
    <mesh castShadow position={[-2.1, 0.72, -2.3]}>
      <cylinderGeometry args={[0.58, 0.58, 0.08, 32]} />
      <meshStandardMaterial color="#8a6d54" roughness={0.7} />
    </mesh>
    <mesh castShadow position={[-2.1, 0.38, -2.3]}>
      <cylinderGeometry args={[0.08, 0.08, 0.65, 16]} />
      <meshStandardMaterial color="#222a31" roughness={0.45} metalness={0.3} />
    </mesh>
  </group>
);
