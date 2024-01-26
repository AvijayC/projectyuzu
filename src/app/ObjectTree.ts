import * as THREE from 'three';
import Core from "./Core.ts";
import {Object3D} from "three";
import {CelestialBody} from "./objects/CelestialObject.ts";
import {Skybox} from "./objects/Skybox.ts";
import {StarPathHandler} from "./StarPathHandler.ts";

export class ObjectTree extends THREE.Group{
    core: Core;
    starGroup: THREE.Group;
    pathGroup: THREE.Group;
    starPathHandler: StarPathHandler;
    constructor(core: Core) {
        super();
        this.core = core;
        this.name = 'MAIN';
        [this.starGroup, this.pathGroup] = this.setupFirstLayer();
        this.setupSkybox();
        this.setupStarGroup();
        this.setupStarPaths();
        this.starPathHandler = new StarPathHandler(this.starGroup, this.pathGroup);
    }

    setupFirstLayer() {
        // Add star group. This will contain stars, aka the most used layer.
        const starGroup = new THREE.Group();
        starGroup.name = 'starGroup';
        this.add(starGroup);

        const pathGroup = new THREE.Group();
        pathGroup.name = 'pathGroup';
        this.add(pathGroup);

        return [starGroup, pathGroup];
    }

    setupStarGroup() {
        // Check that starGroup exists.
        let searchRes = this.children.find(x => x.name === 'starGroup');
        if (searchRes == undefined) {throw new ReferenceError('Could not find a group named "starGroup".')} else {}

        // Append various elements to starGroup.
        // core: Core, name: string, pos: [number, number, number], args?: CBAttributes
        // TODO: Implement database instead of hardcode.
        let configs = [
            {name: 'Star1', pos: [-4, 0, 4], oid: 1},
            {name: 'Star2', pos: [-8, 0, -5], oid: 2},
            {name: 'Star3', pos: [4, 0, -4], oid: 3},
            {name: 'Star4', pos: [8, 0, 2], oid: 4},
            {name: 'Star5', pos: [0, 0, 7], oid: 5},
        ];
        configs.forEach((v) => {
            let cb = new CelestialBody(null, null, v.name, String(v.oid), v.pos as [number, number, number], this.core, 1);
            // @ts-ignore
            searchRes.add(cb);
        })
    }

    setupStarPaths() {
        // Check that pathGroup exists.
        let searchRes = this.children.find(x => x.name === 'pathGroup');
        if (searchRes == undefined) {throw new ReferenceError('Could not find a group named "pathGroup".')} else {}

        // TODO: Implement database instead of hardcode.
        let configs = [
            {oid: "1", conns: ["2", "3"]},
            {oid: "2", conns: ["4", "5"]},
            {oid: "3", conns: ["2", "1", "3"]}
        ];
        let cbs = <CelestialBody[]>this.starGroup.children;  // Get all stars.

        // For each cb / conn list combo:
        configs.forEach((v) => {
            let cb = <CelestialBody>cbs.find(x => v.oid === x.oid);  // Find the origin CB
            if (!cb) {console.error('Could not find CB to apply connections: ', v)}  // If origin missing, skip.
            else {  // If origin not missing, iterate through conns and append them if they don't .
                v.conns.forEach((y) => {
                    let destcb = <CelestialBody>cbs.find(z => z.oid === y);
                    this.tryToApplyConnectionToCB(cb, destcb);
                })
            }
        });

        console.log(cbs.map((x) => {
            return [x.oid, x.name, x.connections]
        }));
    }

    tryToApplyConnectionToCB(cb: CelestialBody, conn: CelestialBody) {
        if (!cb.checkIfConnectionExistsHere(conn) && !cb.checkIfIdentityConnection(conn)) {
            cb.connections.push(conn);
            cb.uniconnections.push(conn);
        } else {
            console.log('cb CheckConnectionHere returned false (already exists cb -> conn): ', cb.name, cb.oid, conn.name, conn.oid);
        }

        if (!conn.checkIfConnectionExistsHere(cb) && !conn.checkIfIdentityConnection(cb)) {
            conn.connections.push(cb);
        } else {
            console.log('cb CheckConnectionThere returned false (already exists conn -> cb): ', cb.name, cb.oid, conn.name, conn.oid);
        }
    }

    setupSkybox() {
        const skybox = new Skybox();
        this.add(skybox);
    }

    setupStarVector() {
        // TODO: Implement connections between stars.
    }
}