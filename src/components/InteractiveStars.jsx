import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const starsVertexShader = `
uniform float uTime;
uniform vec3 uPointer;
uniform float uScroll;
uniform float uSpeed;

attribute float aSize;
attribute vec3 aColor;
attribute vec3 aOriginalPos;

varying vec3 vColor;

void main() {
  vColor = aColor;
  
  // Base position from the spherical geometry
  vec3 pos = aOriginalPos;
  
  // Rotate the entire globe slowly over time
  float c = cos(uTime * 0.15);
  float s = sin(uTime * 0.15);
  mat2 rotY = mat2(c, -s, s, c);
  mat2 rotX = mat2(cos(uTime * 0.08), -sin(uTime * 0.08), sin(uTime * 0.08), cos(uTime * 0.08));
  
  pos.xz = rotY * pos.xz;
  pos.yz = rotX * pos.yz;
  
  // Add some individual organic swirling motion
  pos.x += sin(uTime * 2.0 + aOriginalPos.y * 0.5) * 0.3;
  pos.y += cos(uTime * 1.8 + aOriginalPos.z * 0.5) * 0.3;
  pos.z += sin(uTime * 2.2 + aOriginalPos.x * 0.5) * 0.3;
  
  vec4 worldPos = modelMatrix * vec4(pos, 1.0);
  
  // The center of repulsion is exactly at the mouse cursor
  vec3 pointerPos = vec3(uPointer.x * 18.0, uPointer.y * 18.0, 0.0);
  
  // Calculate distance, reducing Z-depth importance so we repel the front and back of the sphere equally
  vec3 delta = worldPos.xyz - pointerPos;
  delta.z *= 0.2; 
  float dist = length(delta);
  
  float repelRadius = 4.5;
  if (dist < repelRadius) {
    vec3 dir = normalize(delta);
    // Smooth quadratic falloff for a soft "hole"
    float force = pow(1.0 - (dist / repelRadius), 2.0) * 4.5;
    pos += dir * force;
  }
  
  // Parallax effect: as we scroll, the globe moves up gently
  pos.y += uScroll * 15.0;

  vec4 mvPosition = viewMatrix * modelMatrix * vec4(pos, 1.0);
  
  // Calculate point size based on depth and base size
  float depth = max(-mvPosition.z, 0.1);
  float rawSize = aSize * (50.0 / depth);
  
  // Clamp max point size for safety
  gl_PointSize = clamp(rawSize, 0.0, 150.0);
  gl_Position = projectionMatrix * mvPosition;
}
`

const starsFragmentShader = `
varying vec3 vColor;

void main() {
  // Make the particles circular and soft
  float dist = distance(gl_PointCoord, vec2(0.5));
  if (dist > 0.5) discard;
  
  float alpha = smoothstep(0.5, 0.1, dist);
  
  gl_FragColor = vec4(vColor, alpha);
}
`

export function InteractiveStars({ count = 8000 }) {
  const pointsRef = useRef()
  const materialRef = useRef()
  const { viewport } = useThree()

  // Generate star positions arranged in a spherical swarm
  const [positions, colors, sizes, originalPos] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const siz = new Float32Array(count)
    const orig = new Float32Array(count * 3)

    // Colors matching the screenshot (orange, pink, gold, deep red, purple)
    const color1 = new THREE.Color('#ff4e00') // Bright Orange
    const color2 = new THREE.Color('#f953c6') // Pink
    const color3 = new THREE.Color('#FFD700') // Gold
    const color4 = new THREE.Color('#ff0055') // Deep Red/Pink
    const color5 = new THREE.Color('#7b2ff7') // Deep Purple
    const color6 = new THREE.Color('#ff9000') // Light Orange

    for (let i = 0; i < count; i++) {
      // Golden ratio spiral on a sphere for even distribution
      const phi = Math.acos(1 - 2 * (i + 0.5) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
      
      // Radius of the sphere (dense hollow shell with depth)
      const r = 5.0 + Math.random() * 3.0; 
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      pos[i * 3] = x
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = z
      
      orig[i * 3] = x
      orig[i * 3 + 1] = y
      orig[i * 3 + 2] = z

      const randColor = Math.random()
      let finalColor;
      if (randColor < 0.2) finalColor = color1;
      else if (randColor < 0.4) finalColor = color2;
      else if (randColor < 0.6) finalColor = color3;
      else if (randColor < 0.75) finalColor = color4;
      else if (randColor < 0.9) finalColor = color5;
      else finalColor = color6;
      
      col[i * 3] = finalColor.r
      col[i * 3 + 1] = finalColor.g
      col[i * 3 + 2] = finalColor.b

      // Random sizes for depth variation
      siz[i] = Math.random() * 2.0 + 1.0 
    }

    return [pos, col, siz, orig]
  }, [count])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector3() },
      uScroll: { value: 0 },
      uSpeed: { value: 0 },
    }),
    []
  )

  useFrame((state) => {
    if (!materialRef.current || !pointsRef.current) return

    const scrollY = window.scrollY
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    const scrollProgress = scrollY / maxScroll

    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    
    materialRef.current.uniforms.uPointer.value.lerp(
      new THREE.Vector3(state.pointer.x, state.pointer.y, 0),
      0.1
    )
    
    // Calculate speed (difference between current uniform scroll and target scroll)
    const currentScroll = materialRef.current.uniforms.uScroll.value
    const speed = Math.abs(scrollProgress - currentScroll)
    
    // Smooth the speed uniform
    materialRef.current.uniforms.uSpeed.value = THREE.MathUtils.lerp(
      materialRef.current.uniforms.uSpeed.value,
      speed,
      0.1
    )
    
    materialRef.current.uniforms.uScroll.value = THREE.MathUtils.lerp(
      currentScroll,
      scrollProgress,
      0.05
    )
    
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aOriginalPos"
          count={count}
          array={originalPos}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aColor"
          count={count}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aSize"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={starsVertexShader}
        fragmentShader={starsFragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
