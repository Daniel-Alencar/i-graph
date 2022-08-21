import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';

const fontURL = new URL('../assets/droid_serif_regular.typeface.json', import.meta.url);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  // proportion
  window.innerWidth / window.innerHeight,
  // minimum visualization
  0.1,
  // maximum visualization
  1000
);
const orbit = new OrbitControls(camera, renderer.domElement);


// define the axis X, Y and Z
const axesHelper = new THREE.AxesHelper(15);
scene.add(axesHelper);
axesHelper.computeLineDistances()
camera.position.set(-10,30,30);
orbit.update();


const directionalLigth = new THREE.DirectionalLight(0xffffff, 0.8);
scene.add(directionalLigth);
directionalLigth.position.set(50, 50, 50);

// const directionLightHelper = new THREE.DirectionalLightHelper(directionalLigth, 5);
// scene.add(directionLightHelper);


const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshBasicMaterial({ 
  color: 0xffffff, 
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = 0.5 * Math.PI;


// const material = new THREE.LineBasicMaterial({
// 	color: 0x0000ff
// });

// const points = [];
// points.push( new THREE.Vector3(0, 0, 0) );
// points.push( new THREE.Vector3(0, 10, 0) );
// points.push( new THREE.Vector3(10, 10, 0) );

// const geometry = new THREE.BufferGeometry().setFromPoints( points );
// const line = new THREE.Line( geometry, material );
// scene.add( line );


// const fontLoader = new FontLoader();
// fontLoader.load(
//   fontURL.href,
//   (droidFont) => {
//     const textGeometry = new TextGeometry('three.js', {
//       size: 50,
//       height: 100,
//       font: droidFont,
//     });
//     const textMaterial = new THREE.MeshNormalMaterial({ color: 0xff00ff });
//     const text = new THREE.Mesh(textGeometry, textMaterial);
//     text.position.set(0, 10, 0);
//     scene.add(text);
//   },
//   undefined,
//   undefined
// );


const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);


function animate() {
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
