import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';

import Calculator from './latex';

import * as dat from 'dat.gui';
import { operation_R1_I, operation_R2_R } from './functions';

// constants
const step = 0.01;
const axesLength = 15;

// Interface auxiliar
const gui = new dat.GUI();
const options = {
  index_variation: 0,
  cameraPositionX: -10,
  cameraPositionY: +40,
  cameraPositionZ: +30,
};

// Configurações padrões
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
  options.cameraPositionZ,
);

const orbit = new OrbitControls(camera, renderer.domElement);

// Define os eixos X, Y e Z
// const axesHelper = new THREE.AxesHelper(axesLength);
// scene.add(axesHelper);

const materialsForAxes = [
  new THREE.LineBasicMaterial({
    color: 0xff0000,
    linewidth: 2
  }),
  new THREE.LineBasicMaterial({
    color: 0x00ff00,
    linewidth: 2
  }),
  new THREE.LineBasicMaterial({
    color: 0x0000ff,
    linewidth: 2
  })
]
const pointsForAxes = [
  new THREE.Vector3(-axesLength, 0, 0),
  new THREE.Vector3(0, -axesLength, 0),
  new THREE.Vector3(0, 0, -axesLength),
];
const pointsForAxesEnd = [
  new THREE.Vector3(+axesLength, 0, 0),
  new THREE.Vector3(0, +axesLength, 0),
  new THREE.Vector3(0, 0, +axesLength),
];

for(let i = 0; i < pointsForAxes.length; i++) {
  const negativeAxeGeometry = new THREE.BufferGeometry();
  negativeAxeGeometry.setFromPoints([pointsForAxesEnd[i], pointsForAxes[i]]);
  
  const negativeAxe = new THREE.Line(negativeAxeGeometry, materialsForAxes[i]);
  scene.add(negativeAxe);
}
orbit.update();

// Define o plano de orientação dos eixos
// const planeGeometry = new THREE.PlaneGeometry(30, 30); 
// const planeMaterial = new THREE.MeshBasicMaterial({ 
//   color: 0xff00ff, 
//   side: THREE.DoubleSide,
// });
// const plane = new THREE.Mesh(planeGeometry, planeMaterial);
// scene.add(plane);
// plane.rotation.x = 0.5 * Math.PI;

// Faz o GRID no plano
const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

// Define a criação do texto
let text0, text1, text2;
const textMaterial0 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const textMaterial1 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const textMaterial2 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
let firstTime = false;

function createText(font) {
  if(firstTime === false) {

    for(let value = -axesLength; value <= axesLength; value++) {
      let textGeometry = new TextGeometry(value.toString(), {
        size: 0.3,
        height: 0,
        font: font,
      });

      text0 = new THREE.Mesh(textGeometry, textMaterial0);
      text0.position.set(value, 0, 0);
      text0.lookAt(camera.position);
      scene.add(text0);

      text1 = new THREE.Mesh(textGeometry, textMaterial1);
      text1.position.set(0, value, 0);
      text1.lookAt(camera.position);
      scene.add(text1);

      text2 = new THREE.Mesh(textGeometry, textMaterial2);
      text2.position.set(0, 0, value);
      text2.lookAt(camera.position);
      scene.add(text2);
    }

    firstTime = true;
  } else {
    text0.lookAt(camera.position);
    text1.lookAt(camera.position);
    text2.lookAt(camera.position);
  }
}

// Define a fonte
let font;
const fontURL = "./droid_serif_regular.json";
const fontLoader = new FontLoader();
fontLoader.load(
  fontURL,
  function(droidFont) {
    font = droidFont;
  }
);

// Define um BOX de referência
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);


// Define a luz ambiente da cena
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);
ambientLight.position.set(0, 0, 0);

// Define uma luz direcional na cena 
// const directionLightHelper = new THREE.DirectionalLightHelper(ambientLight, 5);
// scene.add(directionLightHelper);









addEventListener('click', () => {
  console.log(camera.position);
});









// Equations
// const graphMaterial = new THREE.LineBasicMaterial({
//   color: 0xf3f6f4,
//   linewidth: 1
// });

// let points0 = [];
// f: R -> R
// f: R -> I

// for(let x = -axesLength; x <= axesLength; x = x + step) {
//   let result = operation_R1_I(x);

//   if(typeof(result) == "object") {
  //     points0.push(new THREE.Vector3(x, result.re, result.im));
  //   } else {
    //     points0.push(new THREE.Vector3(x, result, 0));
//   }
// }

// const graphGeometry = new THREE.BufferGeometry().setFromPoints(points0);
// const graph = new THREE.Line(graphGeometry, graphMaterial);
// scene.add(graph);



// f: R2 -> R
// for(let x = -axesLength; x <= axesLength; x = x + step) {
//   for(let y = -axesLength; y <= axesLength; y = y + step) {

//     let result = operation_R2_R(x, y);
//     if(typeof(result) == "number") {
//       points0.push(new THREE.Vector3(x, y, result));
//     }
//   }
// }

// const graphGeometry = new THREE.BufferGeometry().setFromPoints(points0);
// const graph = new THREE.Line(graphGeometry, graphMaterial);
// scene.add(graph);



// f: R2 -> I
// let points = [];
// for(let x = -axesLength; x <= axesLength; x = x + step) {
//   for(let y = -axesLength, i = 0; y <= axesLength; y = y + step, i++) {

//     // Primeira iteração do FOR da variável X 
//     if(x === -axesLength) {
//       points.push(y);
//       points[i] = [];
//     }
    
//     let result = operation_R2_R(x, y);
//     if(typeof(result) == "number") {
//       points[i].push(new THREE.Vector3(x, result, 0));
//     } else {
//       points[i].push(new THREE.Vector3(x, result.re, result.im));
//     }
//   }
// }

// let indexVariationComponent = gui.add(options, 'index_variation', 0, points.length - 1, 1);
// indexVariationComponent.onChange((property) => {
//   graphGeometry.setFromPoints(points[property]);
// });

// const graphGeometry = new THREE.BufferGeometry().setFromPoints(points[options.index_variation]);
// const graph = new THREE.Line(graphGeometry, graphMaterial);
// scene.add(graph);










function animate() {
  box.lookAt(camera.position);
  if(font) {
    createText(font);
  }

  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
