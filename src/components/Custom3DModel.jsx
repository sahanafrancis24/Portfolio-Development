import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Center, useGLTF, useAnimations } from '@react-three/drei'
import { Box3, Vector3 } from 'three'

export function Custom3DModel({ url, scale = 1, position = [0, 0, 0], rotation = [0, 0, 0], animation = 'rotate' }) {
  const meshRef = useRef()
  const [offsetY, setOffsetY] = useState(0)

  // Load the GLTF model and animations
  const { scene, animations } = useGLTF(url)
  const { actions } = useAnimations(animations, scene)

  useEffect(() => {
    if (!scene) return
    const tempSize = new Vector3()
    const sceneBox = new Box3().setFromObject(scene)

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

    if (sceneBox.isEmpty() === false) {
      const size = new Vector3()
      sceneBox.getSize(size)
      setOffsetY(size.y * 0.55)
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
    <Center>
      <primitive
        ref={meshRef}
        object={scene}
        scale={scale}
        position={[position[0], position[1] + offsetY, position[2]]}
        rotation={rotation}
      />
    </Center>
  )
}

// Preload function to improve loading performance
export function preloadModel(url) {
  useGLTF.preload(url)
}