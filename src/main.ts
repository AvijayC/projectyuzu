import './styles.scss';
import Core from "./app/Core.ts";
import * as THREE from "three";
import {Clock} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import BasicStars from "./app/BasicStars.ts";
import sandboxFunction from "./sandbox.ts";
import {ObjectTree} from "./app/ObjectTree.ts";
// import Core from "./app/Core.ts";

export const mixerList = <THREE.AnimationMixer[]>[];
const uiRoot = document.getElementById('ui')!;
const appRoot = document.getElementById('app')!;
const debugElems = [
    document.getElementById('debugDiv1')!
]
let FPS = 1000;
let frameCount = 0;

const clock = new Clock();
const core = new Core(uiRoot, appRoot, debugElems);
const scene = core.scene;
const camera = core.camera;
const renderer = core.renderer;
const raycaster = core.raycaster;
const mouse = core.mouse;
console.debug('core: ', core);
console.debug(scene);

// Add stars
const starfield = new BasicStars(core,'stars1', 2000, 10000);

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
    console.log(s + obj.type + ' ' + obj.name);
});

console.log("Start");
console.log(scene);


// -------------------------------- ANIMATION LOOP ---------------------------------
function animate() {
    setTimeout( function() {
        requestAnimationFrame( animate );
    }, 1000 / FPS );

    core.update();
    frameLog();
    renderer.render(scene, camera);
}
animate();
// -------------------------------- -------------- ---------------------------------



// ---------- SANDBOX for testing only ------------
function frameLog() {

}







