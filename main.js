import * as THREE from 'https://unpkg.com/three@0.154.0/build/three.module.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202533);

const camera = new THREE.PerspectiveCamera(60, innerWidth/innerHeight, 0.1, 100);
camera.position.set(3, 2.2, 5);
camera.lookAt(0, 0.5, 0);

const renderer = new THREE.WebGLRenderer({ antialias:true });
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0xffffff, 0.4));

const dir = new THREE.DirectionalLight(0xffffff, 0.9);
dir.position.set(4, 6, 3);
dir.castShadow = true;
scene.add(dir);

// Suelo
const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(10,10),
  new THREE.MeshStandardMaterial({ color: 0x404040 })
);
plane.rotation.x = -Math.PI/2;
plane.receiveShadow = true;
scene.add(plane);

// Cubo verde
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshStandardMaterial({ color: 0x00ff00 })
);
cube.position.y = 0.5;
cube.castShadow = true;
scene.add(cube);

let t = 0;
function animate(){
  requestAnimationFrame(animate);
  t += 0.02;

  // rotación
  cube.rotation.x += 0.02;
  cube.rotation.y += 0.03;

  // movimiento circular suave
  cube.position.x = Math.cos(t) * 1.2;
  cube.position.z = Math.sin(t) * 1.2;

  renderer.render(scene, camera);
}
animate();

addEventListener('resize', ()=>{
  camera.aspect = innerWidth/innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});
