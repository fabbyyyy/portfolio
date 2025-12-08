'use client';

import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

// props
interface Scene3DProps {
  activeSection: string | null;
}

function Model({ mouse, active }: { mouse: React.MutableRefObject<[number, number]>, active: boolean }) {
  // load f1 model
  const { scene } = useGLTF('/models/f1_final.glb');
  const groupRef = useRef<THREE.Group>(null);
  
  // smooth transition targets
  const targetPos = useRef(new THREE.Vector3(0, 0, 0));
  const targetRot = useRef(new THREE.Euler(0, 0, 0));

  useFrame((state, delta) => {
    if (groupRef.current) {
        if (active) {
            // content view: move to bottom right
            // scale is huge, keep pos units small
            targetPos.current.set(3, -1.5, 0); 
            targetRot.current.set(0, -Math.PI / 2, 0); // profile view
        } else {
            // home view: offset to the right
            targetPos.current.set(1.5, 0, 0);
            
            // mouse parallax
            // clamp y so looking down doesn't rotate model
            const mouseX = mouse.current[0] * 0.5;
            const mouseY = Math.max(0, mouse.current[1] * 0.5); // only look up/neutral

            // default rot: 3/4 view
            targetRot.current.set(mouseY, mouseX - 0.5, 0);
        }

      // lerp position
      groupRef.current.position.lerp(targetPos.current, delta * 2);
      
      // lerp rotation
      // manual euler lerp strict range avoids gimbal lock
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRot.current.x, delta * 2);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRot.current.y, delta * 2);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRot.current.z, delta * 2);
    }
  });

  return (
    <group ref={groupRef} dispose={null}>
      {/* center and scale model */}
      <primitive object={scene} scale={90} position={[0, 0, 0]} />
    </group>
  );
}

export default function Scene3D({ activeSection }: Scene3DProps) {
  const mouse = useRef<[number, number]>([0, 0]);

  const handleMouseMove = (event: React.MouseEvent) => {
    // normalize changes
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
        dpr={[1, 2]} // handle high dpi
      >
        <Suspense fallback={null}>
            {/* dark aesthetic lighting */}
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={1} />
            
            {/* environment reflections */}
            <Environment preset="city" />

            {/* float active when not active section */}
            <Float 
                speed={activeSection ? 0 : 2} // stop floating when locked in profile
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

// global mouse tracker
function MouseTracker({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
    // window event listener for mouse
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
