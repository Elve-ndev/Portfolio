import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Soft round sprite for additive "bloom-like" particles (no postprocessing needed → lighter).
function makeDotTexture() {
  const s = 64
  const c = document.createElement('canvas')
  c.width = c.height = s
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.25, 'rgba(0,245,255,0.9)')
  g.addColorStop(1, 'rgba(0,245,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, s, s)
  const tex = new THREE.CanvasTexture(c)
  return tex
}

function ParticleField({ count = 1400 }) {
  const ref = useRef()
  const { pointer } = useThree()
  const tex = useMemo(makeDotTexture, [])

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 26
      arr[i * 3 + 1] = (Math.random() - 0.5) * 16
      arr[i * 3 + 2] = (Math.random() - 0.5) * 18
    }
    return arr
  }, [count])

  useFrame((state, delta) => {
    if (!ref.current) return
    // slow drift + react to mouse
    ref.current.rotation.y += delta * 0.03
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      pointer.y * 0.25,
      0.04,
    )
    ref.current.rotation.z = THREE.MathUtils.lerp(
      ref.current.rotation.z,
      -pointer.x * 0.15,
      0.04,
    )
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.14}
        map={tex}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color="#00f5ff"
      />
    </points>
  )
}

// Infinite-feel holographic grid receding to the horizon.
function HoloGrid() {
  const ref = useRef()
  useFrame((state, delta) => {
    if (!ref.current) return
    // scroll the grid toward the camera, wrap for endless motion
    ref.current.position.z = (ref.current.position.z + delta * 1.2) % 4
  })
  return (
    <group rotation={[-Math.PI / 2.2, 0, 0]} position={[0, -3.5, 0]}>
      <gridHelper
        ref={ref}
        args={[60, 60, '#ff006e', '#0a3a44']}
        position={[0, 0, 0]}
      />
    </group>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 60 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={['#020408']} />
      <fog attach="fog" args={['#020408', 6, 22]} />
      <ParticleField />
      <HoloGrid />
    </Canvas>
  )
}
