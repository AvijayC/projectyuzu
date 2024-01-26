import {CelestialBody} from "./objects/CelestialObject.ts";
import * as THREE from 'three';

export class StarPathHandler {
    starGroup: THREE.Group;
    pathGroup: THREE.Group;
    parsedCBList: CelestialBody[];

    constructor(starGroup: THREE.Group, pathGroup: THREE.Group) {
        this.starGroup = starGroup;
        this.pathGroup = pathGroup;
        this.parsedCBList = <CelestialBody[]>[];
        this.starGroup.children.forEach((cb) => {
            this.createStarPathsForCB(<CelestialBody>cb);
        })
    }

    createStarPathsForCB(cb: CelestialBody) {
        if (cb.connections.length === 0 || this.parsedCBList.find(x => cb === x)) {return;} // No children.
        cb.connections.forEach((x) => {
            this.parsedCBList.push(cb);
            this.createStarPathsForCB(x);
            this.createSingleStarPath(cb, x);
        });
    }

    createSingleStarPath(fromCB: CelestialBody, toCB: CelestialBody) {
        new StarPath(fromCB, toCB, this);
    }
}

export class StarPath extends THREE.Line {
    points: THREE.Vector3[];
    spHandler: StarPathHandler;
    fromCB: CelestialBody;
    toCB: CelestialBody;
    constructor(fromCB: CelestialBody, toCB: CelestialBody, spHandler: StarPathHandler) {
        super();
        this.fromCB = fromCB;
        this.toCB = toCB;
        this.spHandler = spHandler;
        this.points = <THREE.Vector3[]>[];
        this.points.push(fromCB.position);
        this.points.push(toCB.position);
        this.geometry = new THREE.BufferGeometry().setFromPoints(this.points);
        this.material = new THREE.LineBasicMaterial({color: 0xaaaaaa, opacity: 0.05, linewidth: 100});
        this.addToScene();
    }

    addToScene() {
        this.spHandler.pathGroup.add(this);
    }
}