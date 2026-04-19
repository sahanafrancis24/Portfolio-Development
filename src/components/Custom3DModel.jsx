import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { Box3, Vector3 } from 'three'

export function Custom3DModel({ url, scale = 1, position = [0, 0, 0], rotation = [0, 0, 0], animation = 'rotate' }) {
  const meshRef = useRef()
  const [normalizedOffset, setNormalizedOffset] = useState([0, 0, 0])

  // Load the GLTF model and animations
  const { scene, animations } = useGLTF(url)
  const { actions } = useAnimations(animations, scene)

  useEffect(() => {
    if (!scene) return
    const tempSize = new Vector3()

    scene.traverse((child) => {
      if (!child.isMesh) return

      child.castShadow = true
      child.receiveShadow = true

      const name = (child.name || '').toLowerCase()
      if (name.includes('ground') || name.includes('floor') || name.includes('plane') || name.includes('tile') || name.includes('base')) {
        child.visible = false
        return
      }

      if (child.geometry) {
        if (!child.geometry.boundingBox) child.geometry.computeBoundingBox()
        const bbox = child.geometry.boundingBox
        if (bbox) {
          bbox.getSize(tempSize)
          // hide large flat meshes that look like a floor
          if (tempSize.y < 0.1 && tempSize.x > 2 && tempSize.z > 2) {
            child.visible = false
          }
        }
      }
    })

    const sceneBox = new Box3().setFromObject(scene)
    if (sceneBox.isEmpty() === false) {
      const center = new Vector3()
      sceneBox.getCenter(center)
      setNormalizedOffset([
        -center.x,
        -sceneBox.min.y,
        -center.z,
      ])
    }
  }, [scene])

  useEffect(() => {
    if (!actions) return

    const actionsArray = Object.values(actions)
    if (!actionsArray.length) return

    actionsArray.forEach((action) => {
      action.reset().fadeIn(0.2).play()
    })

    return () => {
      actionsArray.forEach((action) => action.stop())
    }
  }, [actions])

  useFrame((state, delta) => {
    if (!meshRef.current) return

    switch (animation) {
      case 'rotate':
        meshRef.current.rotation.y += delta * 0.5
        break
      case 'float':
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1
        meshRef.current.rotation.y += delta * 0.2
        break
      case 'pulse':
        const scaleFactor = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1
        meshRef.current.scale.setScalar(scale * scaleFactor)
        break
      case 'spin':
        meshRef.current.rotation.x += delta * 0.8
        meshRef.current.rotation.y += delta * 0.5
        break
      default:
        break
    }
  })

  return (
    <group
      ref={meshRef}
      scale={scale}
      position={[position[0], position[1], position[2]]}
      rotation={rotation}
    >
      <primitive
        object={scene}
        position={normalizedOffset}
      />
    </group>
  )
}

// Preload function to improve loading performance
export function preloadModel(url) {
  useGLTF.preload(url)
}
