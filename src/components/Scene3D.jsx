import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import { Custom3DModel } from './Custom3DModel'

import dragonModel from '../assets/black_dragon_with_idle_animation.glb'

function MultiverseDragon() {
  const groupRef = useRef()
  const { viewport } = useThree()
  
  // Dimensional Colors
  const colors = useMemo(() => [
    { main: new THREE.Color('#4facfe'), accent: new THREE.Color('#00f5ff') }, // Hero: Space Blue
    { main: new THREE.Color('#ff4e00'), accent: new THREE.Color('#ff9000') }, // About: Fiery Dimension
    { main: new THREE.Color('#00ff87'), accent: new THREE.Color('#60efff') }, // Skills: Toxic Neon
    { main: new THREE.Color('#7b2ff7'), accent: new THREE.Color('#f953c6') }  // GameDev: Cyberpunk Purple
  ], [])

  // Lights refs for dynamic coloring
  const mainLight = useRef()
  const accentLight = useRef()

  useFrame((state) => {
    const scrollY = window.scrollY
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    const scrollProgress = scrollY / maxScroll

    if (groupRef.current) {
      // 1. Calculate Dimensional Lighting
      // Find which segment we are in (0-1, 1-2, 2-3)
      const segment = scrollProgress * 3
      const index = Math.min(Math.floor(segment), 2)
      const t = segment - index // 0 to 1 progress within the segment

      if (mainLight.current && accentLight.current) {
        mainLight.current.color.lerpColors(colors[index].main, colors[index + 1].main, t)
        accentLight.current.color.lerpColors(colors[index].accent, colors[index + 1].accent, t)
      }

      // 2. Flight Path Waypoints
      // [x, y, z] and [rotX, rotY, rotZ]
      const waypoints = [
        { pos: new THREE.Vector3(0, -1, 0), rot: new THREE.Euler(0, 0, 0) },         // Hero: Center
        { pos: new THREE.Vector3(3.5, 0, -2), rot: new THREE.Euler(0, -0.6, 0.1) },    // About: Right side
        { pos: new THREE.Vector3(-3.5, 0, -2), rot: new THREE.Euler(0, 0.6, -0.1) },   // Skills: Left side
        { pos: new THREE.Vector3(3.5, -2, -1), rot: new THREE.Euler(0, -0.8, 0) }      // Projects: Right side, lower
      ]

      // Interpolate between waypoints
      const w1 = waypoints[index]
      const w2 = waypoints[index + 1]

      // Smooth step for cinematic flight curve
      const smoothT = THREE.MathUtils.smoothstep(t, 0, 1)

      const targetPos = new THREE.Vector3().copy(w1.pos).lerp(w2.pos, smoothT)
      const targetRotY = THREE.MathUtils.lerp(w1.rot.y, w2.rot.y, smoothT)
      const targetRotZ = THREE.MathUtils.lerp(w1.rot.z, w2.rot.z, smoothT)

      // Apply positions with smooth damping
      groupRef.current.position.lerp(targetPos, 0.1)
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY + (state.pointer.x * 0.3), 0.1)
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, 0.1)
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, state.pointer.y * 0.2, 0.1)
      
      // Hover effect (simulating flight)
      groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 2) * 0.005
    }
  })

  // Responsive scale
  const scale = viewport.width < 5 ? 0.45 : 0.85

  return (
    <group ref={groupRef}>
      <directionalLight ref={mainLight} position={[10, 10, 5]} intensity={2.5} />
      <spotLight ref={accentLight} position={[-5, 5, -5]} intensity={300} angle={0.6} penumbra={0.5} />
      <pointLight position={[0, -5, 5]} intensity={100} color="#ffffff" distance={10} />
      
      <Custom3DModel
        url={dragonModel}
        animation="idle"
        scale={scale}
        position={[0, -2, 0]}
      />
    </group>
  )
}

function CameraRig() {
  const { viewport } = useThree()
  
  useFrame((state) => {
    // Subtle parallax
    const targetX = (state.pointer.x * viewport.width) / 30
    const targetY = (state.pointer.y * viewport.height) / 30
    
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.05)
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05)
    state.camera.lookAt(0, 0, 0)
  })
  
  return null
}

export function Scene3D() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
      <CameraRig />
      <ambientLight intensity={0.15} />
      <MultiverseDragon />
    </>
  )
}
