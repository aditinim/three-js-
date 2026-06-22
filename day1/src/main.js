import './style.css'
import * as THREE from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const size= {
    width: window.innerWidth,
    height: window.innerHeight
}

//Scene
const scene = new THREE.Scene();

//clock
const clock= new THREE.Clock();


//camera
const camera = new THREE.PerspectiveCamera(
    75,  
    size.width/size.height, 
    0.01, 
    100,
)

camera.position.z= 5;



const geometry= new THREE.BoxGeometry(1, 1, 1) //width, height, depth -> shape
const material = new THREE.MeshBasicMaterial({ color: "#5be8f5" }); //kapde
const cube= new THREE.Mesh(geometry, material); //actor



scene.add(cube);


//canvas (parda)
const canvas= document.querySelector("canvas");


//renderer -> projector
const renderer= new THREE.WebGLRenderer({
    canvas, 
});

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping= true;

//projector ka aspect ratio
renderer.setSize(size.width, size.height);
window.addEventListener('resize', ()=>{
    size.width= window.innerWidth;
    size.height= window.innerHeight;

    camera.aspect= size.width/ size.height;
    camera.updateProjectionMatrix();

    renderer.setSize(size.width, size.height);

})


const animate= ()=>{
    // cube.rotation.x+= 0.01;

    const delta= clock.getElapsedTime();

    cube.rotation.y= delta;

    controls.update();
    renderer.render(scene, camera) ;
    requestAnimationFrame(animate);

}

animate();
