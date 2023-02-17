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

// this function is creating torus mesh
const createTorus = (r, t, rs, ts, clr) => {
    const geometry = new THREE.TorusGeometry(r, t, rs, ts);
    const material = new THREE.MeshPhongMaterial({ color: clr });
    return new THREE.Mesh(geometry, material);
}

// this function is creating torus mesh
const createCone = (r, h, rs, clr) => {
    const geometry = new THREE.ConeGeometry(r, h, rs);
    const material = new THREE.MeshPhongMaterial({ color: clr });
    return new THREE.Mesh(geometry, material);
}

// this function is creating torus mesh
const createExtrude = (l, w, clr) => {

    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0, w);
    shape.lineTo(l, w);
    shape.lineTo(l, 0);
    shape.lineTo(0, 0);

    const extrudeSettings = {
        steps: 2,
        depth: 16,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 1,
        bevelOffset: 0,
        bevelSegments: 1
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const material = new THREE.MeshPhongMaterial({ color: clr });
    return new THREE.Mesh(geometry, material);
}

// this function is creating new pivot to rotate along object origin
const createPivot = (mesh, rot) => {

    const box = new THREE.Box3().setFromObject(mesh);
    box.getCenter(mesh.position);
    mesh.position.multiplyScalar(-1);

    const pivot = new THREE.Group();
    scene.add(pivot);
    pivot.add(mesh);

    pivot.rotation.y = rot;

    return pivot;
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

// back
const back = createCone(80, 300, 1000, 0x00ff00);
back.rotation.set(Math.PI / 2, Math.PI / 12, -Math.PI / 2);
back.position.set(290, 70, 0);
scene.add(back);

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

// top copter connector
const tCopCon = createCylinder(10, 10, 60, 64, 0x00ff00);
tCopCon.rotation.set(Math.PI / 2, Math.PI / 2, Math.PI / 2);
tCopCon.position.set(0, 120, 0);
scene.add(tCopCon);

// top copter holder
const tCopHold = createTorus(15, 10, 30, 200, 0x00ff00);
tCopHold.rotation.set(Math.PI / 2, 0, Math.PI / 2);
tCopHold.position.set(0, 160, 0);
scene.add(tCopHold);

// top copter holder cap
const tCopHoldCap = createCone(15, 20, 64, 0x00ff00);
tCopHoldCap.rotation.set(0, 0, 0);
tCopHoldCap.position.set(0, 175, 0);
scene.add(tCopHoldCap);

// top copter first blade
const tCopFBlade = createExtrude(480, 3, 0x00ff00);
tCopFBlade.position.set(0, -160, 0);
const tCopFBladePiv = createPivot(tCopFBlade, Math.PI / 4);

// top copter second blade
const tCopSBlade = createExtrude(480, 3, 0x00ff00);
tCopSBlade.position.set(0, -160, 0);
const tCopSBladePiv = createPivot(tCopSBlade, -Math.PI / 4);



// creating renderer DOM element
const canvas = document.querySelector("#c");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;


function animate() {
    requestAnimationFrame(animate);

    tCopFBladePiv.rotation.y += 0.01;
    tCopSBladePiv.rotation.y += 0.01;

    renderer.render(scene, camera);
    controls.update();
}

animate();