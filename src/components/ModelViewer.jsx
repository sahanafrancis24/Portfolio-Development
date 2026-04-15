import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { Custom3DModel } from './Custom3DModel'

export function ModelViewer({ modelUrl, animation = 'rotate', scale = 1, enableControls = true }) {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '400px' }}>
      <Canvas
        camera={{ position: [0, 4, 10], fov: 45 }}
        style={{ background: 'transparent' }}
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
          position={[0, 0, 0]}
          animation={animation}
        />

        {/* Camera controls (optional) */}
        {enableControls && (
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={2}
            maxDistance={12}
            maxPolarAngle={Math.PI}
          />
        )}
      </Canvas>
    </div>
  )
}