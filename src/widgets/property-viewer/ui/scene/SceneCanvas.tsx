import { ContactShadows, Environment, Html, Lightformer, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useRef, type ElementRef } from 'react';
import type { Property } from '@/entities/property/model/types';
import { CameraResetButton } from '@/features/camera-controls/ui/CameraResetButton';
import { ViewerErrorBoundary } from './ViewerErrorBoundary';
import { GlbApartmentModel } from './models/GlbApartmentModel';
import { ProceduralApartment } from './models/ProceduralApartment';

interface SceneCanvasProps {
  property: Property;
}

export const SceneCanvas = ({ property }: SceneCanvasProps) => {
  const controlsRef = useRef<ElementRef<typeof OrbitControls>>(null);

  const resetCamera = () => {
    const controls = controlsRef.current;
    if (!controls) return;
    controls.object.position.set(9.5, 8.2, 10.5);
    controls.target.set(0, 0, 0);
    controls.update();
  };

  return (
    <ViewerErrorBoundary>
      <Canvas
        shadows
        dpr={[1, 1.7]}
        camera={{ position: [9.5, 8.2, 10.5], fov: 38, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: false }}
        style={{ background: '#0a0f16', touchAction: 'none' }}
      >
        <color attach="background" args={['#0a0f16']} />
        <fog attach="fog" args={['#0a0f16', 16, 30]} />
        <ambientLight intensity={0.55} />
        <directionalLight
          castShadow
          position={[7, 10, 6]}
          intensity={2.1}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.0003}
        />
        <Suspense fallback={<Html center style={{ color: '#b9c3d0', whiteSpace: 'nowrap' }}>Preparing 3D scene…</Html>}>
          {property.modelSource.type === 'glb' ? (
            <GlbApartmentModel source={property.modelSource} />
          ) : (
            <ProceduralApartment rooms={property.rooms} />
          )}
          <ContactShadows position={[0, -0.18, 0]} opacity={0.45} scale={20} blur={2.5} far={10} />
          <Environment resolution={64}>
            <Lightformer form="rect" intensity={2.5} position={[5, 7, 4]} scale={[8, 8, 1]} />
            <Lightformer form="rect" intensity={1.5} position={[-5, 4, -4]} scale={[6, 5, 1]} />
          </Environment>
        </Suspense>
        <OrbitControls
          ref={controlsRef}
          makeDefault
          enableDamping
          dampingFactor={0.075}
          minDistance={7}
          maxDistance={23}
          maxPolarAngle={Math.PI / 2.08}
          minPolarAngle={0.3}
          panSpeed={0.7}
          rotateSpeed={0.6}
          zoomSpeed={0.85}
          target={[0, 0, 0]}
        />
      </Canvas>
      <CameraResetButton onReset={resetCamera} />
    </ViewerErrorBoundary>
  );
};
