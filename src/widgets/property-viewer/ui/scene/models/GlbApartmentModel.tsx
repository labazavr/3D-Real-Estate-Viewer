import { useGLTF } from '@react-three/drei';
import type { PropertyModelSource } from '@/entities/property/model/types';

interface GlbApartmentModelProps {
  source: Extract<PropertyModelSource, { type: 'glb' }>;
}

export const GlbApartmentModel = ({ source }: GlbApartmentModelProps) => {
  const gltf = useGLTF(source.path);

  return (
    <primitive
      object={gltf.scene}
      scale={source.scale ?? 1}
      castShadow
      receiveShadow
      dispose={null}
    />
  );
};
