import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';

import Calculator from './latex';

import * as dat from 'dat.gui';

const gui = new dat.GUI();
const options = {
  cameraPositionX: -10, 
  cameraPositionY: 40, 
  cameraPositionZ: 30, 
};

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
camera.lookAt(new THREE.Vector3(0, 15, 0));
camera.position.set(
  options.cameraPositionX,
  options.cameraPositionY,
  options.cameraPositionZ
);

// const cameraHelper = new THREE.CameraHelper(camera);
// scene.add(cameraHelper);

// gui.add(options, 'cameraPositionX').onChange((property) => {
//   camera.position.x = property;
// });
// gui.add(options, 'cameraPositionY').onChange((property) => {
//   camera.position.y = property;
// });
// gui.add(options, 'cameraPositionZ').onChange((property) => {
//   camera.position.z = property;
// });

const orbit = new OrbitControls(camera, renderer.domElement);






const axesLeghth = 15;
// Define the axis X, Y and Z
const axesHelper = new THREE.AxesHelper(axesLeghth);
scene.add(axesHelper);

const materialsForAxes = [
  new THREE.LineBasicMaterial({
    color: 0xff0000,
    linewidth: 1
  }),
  new THREE.LineBasicMaterial({
    color: 0x00ff00,
    linewidth: 1
  }),
  new THREE.LineBasicMaterial({
    color: 0x0000ff,
    linewidth: 1
  })
]
const pointsForAxes = [
  new THREE.Vector3(-axesLeghth, 0, 0),
  new THREE.Vector3(0, -axesLeghth, 0),
  new THREE.Vector3(0, 0, -axesLeghth)
];

for(let i = 0; i < pointsForAxes.length; i++) {
  const negativeAxeGeometry = new THREE.BufferGeometry();
  negativeAxeGeometry.setFromPoints([new THREE.Vector3(0,0,0), pointsForAxes[i]]);
  
  const negativeAxe = new THREE.Line(negativeAxeGeometry, materialsForAxes[i]);
  scene.add(negativeAxe);
}
orbit.update();






const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);
ambientLight.position.set(0, 0, 0);

// Equations
const F1 = "y=x^2";
const calculator = new Calculator(F1);

let points0 = [];
let points1 = [];

const material = new THREE.LineBasicMaterial({
  color: 0xf3f6f4,
  linewidth: 1
});

for(let x = -15, i = 0; x < axesLeghth; x = x + 0.01, i++) {
  let y = calculator.eval(x);

  points0.push(new THREE.Vector3(x, y, - axesLeghth));
  points1.push(new THREE.Vector3(x, y, + axesLeghth));
}

for(let i = 0; i < points0.length; i++) {
  if(points0[i].y > + axesLeghth || points0[i].y < - axesLeghth) continue;

  const geometryZLine = new THREE.BufferGeometry().setFromPoints([points0[i], points1[i]]);
  const ZLine = new THREE.Line(geometryZLine, material);
  scene.add(ZLine);
}

// const directionLightHelper = new THREE.DirectionalLightHelper(ambientLight, 5);
// scene.add(directionLightHelper);


// const planeGeometry = new THREE.PlaneGeometry(30, 30); 
// const planeMaterial = new THREE.MeshBasicMaterial({ 
//   color: 0xffffff, 
//   side: THREE.DoubleSide,
// });
// const plane = new THREE.Mesh(planeGeometry, planeMaterial);
// scene.add(plane);
// plane.rotation.x = 0.5 * Math.PI;


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

let font;
const fontURL = "./droid_serif_regular.json";
const fontLoader = new FontLoader();
fontLoader.load(
  fontURL,
  function(droidFont) {
    font = droidFont;

    for(let value = -axesLeghth; value <= axesLeghth; value++) {
      let textGeometry = new TextGeometry(value.toString(), {
        size: 0.3,
        height: 0,
        font: droidFont,
      });

      let textMaterial0 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      let text0 = new THREE.Mesh(textGeometry, textMaterial0);
      text0.position.set(value, 0, 0);
      scene.add(text0);

      let textMaterial1 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      let text1 = new THREE.Mesh(textGeometry, textMaterial1);
      text1.position.set(0, value, 0);
      scene.add(text1);

      let textMaterial2 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
      let text2 = new THREE.Mesh(textGeometry, textMaterial2);
      text2.position.set(0, 0, value);
      scene.add(text2);
    }
  }
);


// const gridHelper = new THREE.GridHelper(30);
// scene.add(gridHelper);


function animate() {
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
