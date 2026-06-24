import './style.css'
import * as THREE from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {GLTFLoader, RGBELoader} from "three/examples/jsm/Addons.js";



const size= {
    width: window.innerWidth,
    height: window.innerHeight
}

//Scene
const scene = new THREE.Scene();

//clock
const clock= new THREE.Clock();

//texture loader
const textureLoader= new THREE.TextureLoader();
const texture= textureLoader.load("https://images.unsplash.com/photo-1621423028742-e6f7256405d8?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ()=>{
        console.log("texture is loaded");
        
    },

    ()=>{
        console.log("Text is loading");
        
    },
    ()=>{
        console.log("some error is there");
        
    }
);


// rgbEloader

const envMap= new RGBELoader();

envMap.load('./envMap.hdr', (envMap)=>{
    envMap.mapping=  THREE.EquirectangularReflectionMapping;
    // scene.background= envMap;
    scene.environment= envMap;

})


//gltf loader

let mixer;

const gltfLoader= new GLTFLoader();
gltfLoader.load("./robot.glb", (gltf)=>{
    const model= gltf.scene;
    model.position.y= -3;

    mixer= new THREE.AnimationMixer(model);
    const action= mixer.clipAction(gltf.animations[0]);

    action.play();
    

    // scene.add(model);
})

//camera
const camera = new THREE.PerspectiveCamera(
    75,  
    size.width/size.height, 
    0.01, 
    100,
)

camera.position.z= 5;


//lights

const ambientLight= new THREE.AmbientLight("0xffffff", 1.5);
const directionalLight= new THREE.DirectionalLight(0xffffff, 1);
const pointLight= new THREE.PointLight("#ffff", 4, 10, 40);
scene.add(ambientLight);
// scene.add(directionalLight);
// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
// directionalLight.position.set(2,2,2);

// scene.add(directionalLightHelper);

// const pointLightHelper = new THREE.PointLightHelper(pointLight);

scene.add(pointLight);
// scene.add(pointLightHelper);



// const geometry = new THREE.CylinderGeometry( 5, 5, 20, 32 );
const geometry= new THREE.BoxGeometry(1, 1, 1) //width, height, depth -> shape
// const material = new THREE.MeshBasicMaterial({ color: "#5be8f5" }); //kapde
// const material = new THREE.MeshBasicMaterial({
//     map: texture,
//     color: "red"
// });
const material = new THREE.MeshStandardMaterial({
     color: "red" ,
     metalness: 0,
     roughness: 0.1
    }); 

const cube= new THREE.Mesh(geometry, material); //actor

// cube.position.set(1.5, -2, -1.4);



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

const raycaster= new THREE.Raycaster();
const mouse = new THREE.Vector2();


window.addEventListener('mousemove', (e)=>{
    mouse.x= (e.clientX / window.innerWidth) *2 -1;
    mouse.y= -((e.clientY/ window.innerHeight) *2 -1);



})

window.addEventListener("click", ()=>{
    raycaster.setFromCamera(mouse, camera);

    const intersect= raycaster.intersectObject(cube);

    if(intersect.length){
        cube.material.color.set("green")
    }
})




const animate= ()=>{
    // cube.rotation.x+= 0.01;

    const delta= clock.getElapsedTime();

    // const newDelta= clock.getDelta();



    // cube.rotation.y= delta;

    // if(mixer){
    //     mixer.update(0.01);
    // }

    controls.update();
    renderer.render(scene, camera) ;
    requestAnimationFrame(animate);

}

animate();
