import React from 'react'


const Experience = () => {
  return <>
    <mesh position={[-1,4,0]}>
        <boxGeometry args={[1,3,1]}/>
        <meshBasicMaterial color= {"red"}/>
    </mesh>

    <mesh position={[-1,4,4]}>
        <boxGeometry args={[1,3,1]}/>
        <meshBasicMaterial color= {"red"}/>
    </mesh>

    <mesh>
        <boxGeometry args={[1,3,1]}/>
        <meshBasicMaterial color= {"green"}/>
    </mesh>
  </>
}

export default Experience