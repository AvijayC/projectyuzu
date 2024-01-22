import * as THREE from 'three';
import Core from "./Core.ts";
import {Object3D} from "three";
import {CelestialBody} from "./objects/CelestialObject.ts";

export class ObjectTree extends THREE.Group{
    core: Core;
    constructor(core: Core) {
        super();
        this.core = core;
        this.name = 'MAIN';
        this.setupFirstLayer();
        this.setupStarGroup();
    }

    setupFirstLayer() {
        // Add star group. This will contain stars, aka the most used layer.
        const starGroup = new THREE.Group();
        starGroup.name = 'starGroup';
        this.add(starGroup);
    }

    setupStarGroup() {
        // Check that starGroup exists.
        let searchRes = this.children.find(x => x.name === 'starGroup');
        if (searchRes == undefined) {throw new ReferenceError('Could not find a group named "starGroup".')} else {}

        // Append various elements to starGroup.
        // core: Core, name: string, pos: [number, number, number], args?: CBAttributes
        // TODO: Implement database instead of hardcode.
        let configs = [
            {name: 'Star1', pos: [-4, 0, 0]},
            {name: 'Star2', pos: [-8, 0, 0]},
            {name: 'Star3', pos: [4, 0, 0]},
            {name: 'Star4', pos: [8, 0, 0]},
            {name: 'Star5', pos: [0, 0, 0]},
        ];
        configs.forEach((v) => {
            let cb = new CelestialBody(null, null, v.name, v.pos as [number, number, number]);
            // @ts-ignore
            searchRes.add(cb);
        })
    }

    setupStarVector() {
        // TODO: Implement connections between stars.
    }
}