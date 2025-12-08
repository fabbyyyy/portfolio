'use client';

import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

// Define props
interface Scene3DProps {
  activeSection: string | null;
}

function Model({ mouse, active }: { mouse: React.MutableRefObject<[number, number]>, active: boolean }) {
  // Load the model from the public directory
  const { scene } = useGLTF('/models/f1.glb');
  const groupRef = useRef<THREE.Group>(null);
  
  // Target values for smooth transition
  const targetPos = useRef(new THREE.Vector3(0, 0, 0));
  const targetRot = useRef(new THREE.Euler(0, 0, 0));

  useFrame((state, delta) => {
    if (groupRef.current) {
        if (active) {
            // content view: Move to bottom right (adjust these values based on 15x scale)
            // Scale 15 is huge, so position units need to be relatively small or camera far away.
            targetPos.current.set(3, -1.5, 0); 
            targetRot.current.set(0, -Math.PI / 2, 0); // Profile view
        } else {
            // Home view: Offset to the right (X=1.5)
            targetPos.current.set(1.5, 0, 0);
            
            // Mouse Parallax Logic
            // Clamp Y so moving mouse down (negative values) doesn't affect rotation
            const mouseX = mouse.current[0] * 0.5;
            const mouseY = Math.max(0, mouse.current[1] * 0.5); // Only allow looking up/neutral

            // Default rotation offset: slightly turned (Y -0.5) to look like 3/4 view
            targetRot.current.set(mouseY, mouseX - 0.5, 0);
        }

      // Lerp Position
      groupRef.current.position.lerp(targetPos.current, delta * 2);
      
      // Lerp Rotation (using distinct axis for clarity, or quaternion slerp for perfection but Euler lerp is fine here)
      // We manually lerp Euler values to avoid gimbal lock issues with simple lerps if we were doing full 360, but restricted range is fine.
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRot.current.x, delta * 2);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRot.current.y, delta * 2);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRot.current.z, delta * 2);
    }
  });

  return (
    <group ref={groupRef} dispose={null}>
      {/* Center and scale model appropriately */}
      <primitive object={scene} scale={90} position={[0, 0, 0]} />
    </group>
  );
}

export default function Scene3D({ activeSection }: Scene3DProps) {
  const mouse = useRef<[number, number]>([0, 0]);

  const handleMouseMove = (event: React.MouseEvent) => {
    // Normalize mouse coordinates to -1 to 1
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;
    mouse.current = [x, y];
  };

  return (
    <div 
      className="fixed inset-0 z-0 pointer-events-none" 
      onMouseMove={handleMouseMove}
    >
      <MouseTracker mouse={mouse} />
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]} // Handle high DPI screens
      >
        <Suspense fallback={null}>
            {/* Lighting setup to match the dark aesthetic */}
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={1} />
            
            {/* Environment for reflections if model has metallic parts */}
            <Environment preset="city" />

            {/* Float only active when NOT activeSection? No, keeping float is nice, or maybe remove it for 'status' profile view? */ }
            <Float 
                speed={activeSection ? 0 : 2} // Stop floating when locked in profile
                rotationIntensity={activeSection ? 0 : 0.5} 
                floatIntensity={activeSection ? 0 : 0.5}
            >
                <Model mouse={mouse} active={!!activeSection} />
            </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}

// Helper to track mouse globally since the div is behind content
function MouseTracker({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
    // We can't really use useThree for DOM events easily unless we are inside Canvas, which we are.
    // But we want window events.
    React.useEffect(() => {
        const updateMouse = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = -(e.clientY / window.innerHeight) * 2 + 1;
            mouse.current = [x, y];
        }
        window.addEventListener('mousemove', updateMouse);
        return () => window.removeEventListener('mousemove', updateMouse);
    }, [mouse]);
    return null;
}
