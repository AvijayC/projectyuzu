import Core from "./Core.ts";
import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import {CelestialBody} from "./objects/CelestialObject.js";

export class AnimationHandler {
    constructor(core: Core) {
        this.core = core;
        this.setupEventHandlers();
    }
    core: Core;

    // Animating the camera.
    onClickStar(_e: MouseEvent | TouchEvent) {
        // Check if intersection has a CB object as first elem.
        if (!this.core.raycastLogicHandler.firstCBIntersection || this.core.controls.enabled == false)
        {console.log('No CB intersect found.'); return;}

        // Continue: calculate diff between firstCBIntersection pos and curr pos.
        let currTarget = new THREE.Vector3(
            this.core.controls.target.x,
            this.core.controls.target.y,
            this.core.controls.target.z,
        );
        let intersectPos = new THREE.Vector3(
            this.core.raycastLogicHandler.firstCBIntersection.object.position.x,
            this.core.raycastLogicHandler.firstCBIntersection.object.position.y,
            this.core.raycastLogicHandler.firstCBIntersection.object.position.z
        );
        let delta = new THREE.Vector3(
            intersectPos.x - currTarget.x,
            intersectPos.y - currTarget.y,
            intersectPos.z - currTarget.z
        )
        let l2Dist = delta.length();
        console.log('Current target: ', currTarget);
        console.log('Intersect position: ', intersectPos);
        console.log('Length: ', l2Dist);

        // Generate animation.
        new TWEEN.Tween(this.core.camera.position)
            .to(this.core.camera.position.clone().add(delta), l2Dist*1000/(5 + l2Dist*0.2))
            .easing(TWEEN.Easing.Sinusoidal.InOut)
            .onStart(() => {
                this.core.controls.enabled = false;
                console.log('Started move anim.');
            })
            .onComplete(() => {
                this.core.camera.lookAt(intersectPos);
                this.core.controls.target = intersectPos;
                this.core.controls.enabled = true;
                console.log('Finished move anim.');
            })
            .start();

        // Update focus.
        this.core.focus.updateCB(<CelestialBody>this.core.raycastLogicHandler.firstCBIntersection.object);
    }

    update() {
        // FRAMELOOP: Runs every frame.

    }

    // Setup event handlers.
    setupEventHandlers() {
        window.addEventListener('click', (e) => {this.onClickStar(e); console.log(e.target);})
        window.addEventListener('touchend', (e) => {this.onClickStar(e); console.log(e.target);})
    }
}