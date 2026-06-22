import './style.css'
import * as THREE from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


console.log(THREE);

//Scene
const scene = new THREE.Scene();


//camera
const camera = new THREE.PerspectiveCamera(
    75,  //fov -> field of view -> vertical angle- > side view 
    window.innerWidth/window.innerHeight, //aspect ratio -> w/h
    0.01, //min distance
    100, //max distance
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
    //kis project ko project krwana hai 
    // canvas: canvas,
    canvas, //coz both key and value are same
});

const controls = new OrbitControls( camera, renderer.domElement );

controls.enableDamping= true;

//projector ka aspect ratio
renderer.setSize(window.innerWidth, window.innerHeight);

// renderede ko chalu krna pdega 
//ho gya on



const animate= ()=>{
    // cube.rotation.y+= 0.01;
    // cube.rotation.x+= 0.01;

    controls.update();

    renderer.render(scene, camera) ;

    requestAnimationFrame(animate);
}


animate();
