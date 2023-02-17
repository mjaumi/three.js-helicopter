import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';

// this function is creating capsule mesh
const createCapsule = (r, l, cs, rs, clr) => {
    const geometry = new THREE.CapsuleGeometry(r, l, cs, rs);
    const material = new THREE.MeshPhongMaterial({ color: clr });
    return new THREE.Mesh(geometry, material);
}

// this function is creating cylinder mesh
const createCylinder = (rt, rb, h, rs, clr) => {
    const geometry = new THREE.CylinderGeometry(rt, rb, h, rs);
    const material = new THREE.MeshPhongMaterial({ color: clr });
    return new THREE.Mesh(geometry, material);
}

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

// body
const body = createCapsule(90, 300, 4, 1000, 0x00ff00);
body.rotation.set(Math.PI / 2, 0, Math.PI / 2);
body.position.set(-10, 40, 0);
scene.add(body);

// tail
const tail = createCapsule(25, 300, 4, 1000, 0x00ff00);
tail.rotation.set(Math.PI / 2, Math.PI / 25, Math.PI / 2);
tail.position.set(300, 110, 0);
scene.add(tail);

// left foot
const lFoot = createCapsule(25, 300, 4, 1000, 0x00ff00);
lFoot.rotation.set(Math.PI / 2, 0, Math.PI / 2);
lFoot.position.set(0, -80, 100);
scene.add(lFoot);

// left foot front connector
const lFootFCon = createCylinder(10, 10, 120, 64, 0x00ff00);
lFootFCon.rotation.set(Math.PI / 2, Math.PI / 2, Math.PI / 2.5);
lFootFCon.position.set(-120, -20, 90);
scene.add(lFootFCon);

// left foot back connector
const lFootBCon = createCylinder(10, 10, 120, 64, 0x00ff00);
lFootBCon.rotation.set(Math.PI / 2, Math.PI / 2, Math.PI / 2.5);
lFootBCon.position.set(120, -20, 90);
scene.add(lFootBCon);

// right foot
const rFoot = createCapsule(25, 300, 4, 1000, 0x00ff00);
rFoot.rotation.set(Math.PI / 2, 0, Math.PI / 2);
rFoot.position.set(0, -80, -100);
scene.add(rFoot);

// left foot front connector
const rFootFCon = createCylinder(10, 10, 120, 64, 0x00ff00);
rFootFCon.rotation.set(Math.PI / 2, Math.PI / 2, -Math.PI / 2.5);
rFootFCon.position.set(-120, -20, -90);
scene.add(rFootFCon);

// left foot back connector
const rFootBCon = createCylinder(10, 10, 120, 64, 0x00ff00);
rFootBCon.rotation.set(Math.PI / 2, Math.PI / 2, -Math.PI / 2.5);
rFootBCon.position.set(120, -20, -90);
scene.add(rFootBCon);


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