import './styles.scss';
import Core from "./app/Core.ts";
import * as THREE from "three";
import {Clock} from "three";
import BasicStars from "./app/objects/BasicStars.ts";
import {ObjectTree} from "./app/ObjectTree.ts";

export const mixerList = <THREE.AnimationMixer[]>[];
const uiRoot = document.getElementById('ui')!;
const appRoot = document.getElementById('app')!;
const debugElems = [
    document.getElementById('debugDiv1')!
]
let FPS = 100000;
let frameCount = 0;

const clock = new Clock();
const core = new Core(uiRoot, appRoot, debugElems);
const scene = core.scene;
const camera = core.camera;
const renderer = core.renderer;
const labelRenderer = core.labelRenderer;
const raycaster = core.raycaster;
const mouse = core.mouse;
console.debug('core: ', core);
console.debug(scene);

// Add stars
// const starfield = new BasicStars(core,'stars1', 1000, 1000);

// Add perfcounter
// const stats = new Stats();
// document.body.appendChild(stats.dom);

// IMPORTANT: Contains our 3D objects.
const objTree = new ObjectTree(core);
scene.add(objTree);

// Print graph.
scene.traverse(function(obj) {
    let s = '';
    let obj2 = obj;
    while(obj2 !== scene) {
        s += '---> ';
        // @ts-ignore
        obj2 = obj2.parent;
    }
    console.log(s + obj.type + ' ' + obj.name + ' ');
});

console.log("Start");
console.log(scene);
sandbox();


// -------------------------------- ANIMATION LOOP ---------------------------------
function animate() {
    setTimeout( function() {
        requestAnimationFrame( animate );
    }, 1000 / FPS );

    core.update();
    frameLog();
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
    // stats.update();
}
animate();
// -------------------------------- -------------- ---------------------------------



// ---------- SANDBOX for testing only ------------
function frameLog() {

}

function sandbox() {

}







