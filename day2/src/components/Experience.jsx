import React from 'react'


const Experience = () => {
    return <>
        <group position={[1,2,0]}>
            <mesh position={[-1, 4, 0]}>
                <boxGeometry args={[1, 3, 1]} />
                <meshBasicMaterial color={"red"} />
            </mesh>

            <mesh>
                <boxGeometry args={[1, 3, 1]} /> 
                <meshBasicMaterial color={"green"} />
            </mesh>
        </group>
    </>
}

export default Experience