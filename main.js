import * as THREE from 'three';
import './style.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.setZ(30);
  camera.position.setX(-3);
  
  renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

const jeffTexture = new THREE.TextureLoader().load('jeff.png');

const box = new THREE.BoxGeometry(3,3,3);
const mat = new THREE.MeshBasicMaterial({map: jeffTexture});
const jeff = new THREE.Mesh(box,mat);

scene.add(jeff);

const moonTexture = new THREE.TextureLoader().load('moon.jpg');//učitavanje teksture meseca
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.setX(-5);
moon.position.setZ(30);
function moveCamera(){
  const t = document.body.getBoundingClientRect().top; //funkcija vraca trenutnu poziciju na browseru
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  jeff.rotation.y += 0.01;
  jeff.rotation.z += 0.01;
  // na svaki scroll se moon i jeff rotiraju za navedene vrednosti
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
  //definisanje pomeranja kamere

}
document.body.onscroll = moveCamera;


function animate() {
    requestAnimationFrame(animate);//zahtev za slanje animacije iz browsera kojoj rekurzivno prosledjujemo kreiranu funkciju
    torus.rotation.x += 0.01; //rotacija po x osi
    torus.rotation.y += 0.005;//rotacija po y osi
    torus.rotation.z += 0.01;//rotacija po z osi
    //controls.update();
    renderer.render(scene, camera);
  }
 animate();


