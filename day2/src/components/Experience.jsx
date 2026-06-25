import { useFrame, useLoader } from '@react-three/fiber';
import React, { useRef } from 'react'
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import * as THREE from 'three'
import { texture } from 'three/tsl';
import { useTexture } from '@react-three/drei';


const Experience = () => {

    const cubeRef= useRef(null);

    useFrame((state, delta)=>{
        //delta is the time , jo do frame k beech me lag raha hai
        cubeRef.current.rotation.y += delta;

    })

    // const dreiTexture= useTexture("https://plus.unsplash.com/premium_photo-1672944876342-4090164e1c04?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")

    const {texture1, texture2}= useTexture( {
        texture1: "https://plus.unsplash.com/premium_photo-1672944876342-4090164e1c04?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        texture2: "https://images.unsplash.com/photo-1521459467264-802e2ef3141f?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    })

    const texture= useLoader(THREE.TextureLoader, "https://plus.unsplash.com/premium_photo-1672944876342-4090164e1c04?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");

    return <>
        <mesh ref={cubeRef}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial map={texture2} />
        </mesh>
    </>
}

export default Experience