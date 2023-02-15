import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';

// creating camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
);
camera.position.z = 300;

// creating scene
const scene = new THREE.Scene();

// directional lighting
const color = 0xffe5ff;
const intensity = 1;

const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 1);

scene.add(light);

// adding sky background
const skyTexture = new THREE.TextureLoader().load("./textures/sky.png");
scene.fog = new THREE.Fog(0xffe5ff, 2, 1);
scene.background = skyTexture;

// creating the ground
const groundGeometry = new THREE.PlaneGeometry(
    2000,
    2000
);
const groundTexture = new THREE.TextureLoader().load(
    "./textures/ground.jpg",
    (texture) => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set(0, 0);
        texture.repeat.set(8, 8);
    }
);
const groundMaterial = new THREE.MeshPhongMaterial({
    map: groundTexture,
    side: THREE.DoubleSide,
});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -100;
scene.add(ground);

// nose
const geometry = new THREE.CapsuleGeometry(40, 5, 4, 1000);
const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const nose = new THREE.Mesh(geometry, material);
nose.rotation.set(-Math.PI / 3, 0, -Math.PI / 3);
nose.position.set(-10, -20, 0);
scene.add(nose);



// creating renderer DOM element
const canvas = document.querySelector("#c");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;


function animate() {
    requestAnimationFrame(animate);

    //cube.rotation.y += 0.01;
    renderer.render(scene, camera);
    controls.update();
}

animate();