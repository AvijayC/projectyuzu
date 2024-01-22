import * as THREE from 'three';
import Core from "./Core.ts";
import {Raycaster} from "three";
import * as TWEEN from '@tweenjs/tween.js'
import {CelestialBody} from "./objects/CelestialObject.ts";

// Define common raycast methods.
export class RaycastLogicHandler {
    raycaster: THREE.Raycaster;
    currentIntersections: Array<THREE.Intersection<THREE.Object3D>>;
    camera: THREE.Camera;
    mouse: THREE.Vector2;
    scene: THREE.Scene | THREE.Group;
    debugElems: HTMLElement[];
    CBIntersections: Array<THREE.Intersection<THREE.Object3D>>;
    firstCBIntersection: THREE.Intersection | undefined;

    constructor(core: Core) {
        this.raycaster = core.raycaster;
        this.camera = core.camera;
        this.currentIntersections = [];
        this.CBIntersections = [];
        this.mouse = core.mouse;
        this.scene = core.scene;
        this.debugElems = core.debugElems;
        this.raycaster.setFromCamera(this.mouse, this.camera);
    }

    update() {
        // FRAMELOOP: This should run every Frame.
        // Initialize and update raycaster.
        this.currentIntersections = this.raycaster.intersectObjects([this.scene], true);
        this.CBIntersections = this.currentIntersections.filter(x => x.object instanceof CelestialBody);
        this.firstCBIntersection = (this.CBIntersections.length == 0) ? undefined : this.CBIntersections[0];

        // this.debugRefreshRaycasterLogging('Intersects: ' + JSON.stringify(this.currentIntersections.map(x => x.object.name)))

        TWEEN.update();
        // Run raycaster logic handler's update function.
        this.checkLogic();
    }

    checkLogic() {
        // FRAMELOOP: This should run every frame.
    }

    debugRefreshRaycasterLogging(content: string) {
        console.log(content);
        this.debugElems[0].innerText = content;
    }


}