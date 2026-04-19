import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { Custom3DModel } from './Custom3DModel'

export function ModelViewer({
  modelUrl,
  animation = 'rotate',
  scale = 1,
  position = [0, 0, 0],
  enableControls = true,
}) {
  return (
    <div
      className="model-viewer-shell"
      style={{ width: '100%', height: '100%', minHeight: '400px', overflow: 'visible' }}
    >
      <Canvas
        className="model-viewer-canvas"
        camera={{ position: [0, 4, 10], fov: 45 }}
        style={{ background: 'transparent', overflow: 'visible' }}
      >
        {/* Lighting setup */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        {/* Environment for reflections */}
        <Environment preset="studio" />

        {/* The 3D model */}
        <Custom3DModel
          url={modelUrl}
          scale={scale}
          position={position}
          animation={animation}
        />
      </Canvas>
    </div>
  )
}
