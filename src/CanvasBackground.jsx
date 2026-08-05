import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Particles({ count = 200 }) {
  const mesh = useRef()
  const light = useRef()
  
  const particles = useMemo(() => {
    const temp = []
    const colors = ['#ec4899', '#0ea5e9', '#f59e0b']
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100
      const factor = 20 + Math.random() * 100
      const speed = 0.01 + Math.random() / 200
      const xFactor = -50 + Math.random() * 100
      const yFactor = -50 + Math.random() * 100
      const zFactor = -50 + Math.random() * 100
      const color = colors[Math.floor(Math.random() * colors.length)]
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0, color })
    }
    return temp
  }, [count])

  const dummy = useMemo(() => new THREE.Object3D(), [])
  const colorArray = useMemo(() => {
    const arr = new Float32Array(count * 3)
    particles.forEach((p, i) => {
      const c = new THREE.Color(p.color)
      arr[i * 3] = c.r
      arr[i * 3 + 1] = c.g
      arr[i * 3 + 2] = c.b
    })
    return arr
  }, [particles, count])

  useFrame((state) => {
    light.current.position.set(
      (state.pointer.x * state.viewport.width) / 2,
      (state.pointer.y * state.viewport.height) / 2,
      0
    )
    
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle
      t = particle.t += speed / 2
      const a = Math.cos(t) + Math.sin(t * 1) / 10
      const b = Math.sin(t) + Math.cos(t * 2) / 10
      const s = Math.cos(t)
      
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      )
      
      dummy.scale.set(s, s, s)
      dummy.rotation.set(s * 5, s * 5, s * 5)
      dummy.updateMatrix()
      
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <>
      <pointLight ref={light} distance={100} intensity={8} color="#ffffff" />
      <instancedMesh ref={mesh} args={[null, null, count]}>
        <dodecahedronGeometry args={[0.5, 0]} />
        <meshPhysicalMaterial 
          roughness={0.1}
          transmission={0.9}
          thickness={1}
        />
        <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
      </instancedMesh>
    </>
  )
}

export default function CanvasBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#fdfbfb] to-[#ebedee]">
      <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <Particles count={300} />
      </Canvas>
    </div>
  )
}
