import * as THREE from 'three';
import Core from "../Core.ts";
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

export class CelestialBody extends THREE.Mesh {
    connections: CelestialBody[];
    uniconnections: CelestialBody[];
    cbModel!: THREE.Mesh;
    oid: String;
    core: Core;
    labelLabel: CSS2DObject | undefined;
    radius: number;

    constructor(geo: THREE.BufferGeometry | null,
                mat: THREE.Material | null,
                name: string,
                oid: string,
                pos: [number, number, number],
                core: Core,
                radius: number) {
        const loader = new THREE.TextureLoader();
        const defaultMat = new THREE.MeshStandardMaterial({color: 0xff0000, opacity: 0.1, transparent: true});
        const defaultGeo = new THREE.SphereGeometry(radius);

        super(geo ?? defaultGeo, mat ?? defaultMat);
        [this.position.x, this.position.y, this.position.z] = pos;

        this.radius = radius;
        this.core = core;
        this.oid = oid;
        this.name = name;
        this.connections = <CelestialBody[]>[];
        this.uniconnections = <CelestialBody[]>[];
        this.generateCBModel();
        // this.addTextLabel();
        this.generateCBModel();
    }

    checkIfConnectionExistsHere(conn: CelestialBody) {
        let temp = this.connections.find(x => x.oid === conn.oid);
        return !!temp;
    }

    checkIfIdentityConnection(conn: CelestialBody) {
        return conn === this;
    }

    addTextLabel() {
        const labelDiv = document.createElement('div');
        labelDiv.classList.add('label', 'cssFrom3d', 'celestialBody');
        labelDiv.id = "CBLabel" + <string>this.oid;
        labelDiv.textContent = this.name;
        const labelLabel = new CSS2DObject(labelDiv);
        labelLabel.position.set(1.5 * this.radius, 0, 0);
        labelLabel.center.set(0, 1);
        this.add(labelLabel);
        this.labelLabel = labelLabel;
        // labelLabel.layers.set(0);
        console.log(`Label set for ${this.name}. `, labelDiv, labelLabel);
    }

    removeTextLabel() {
        if (this.labelLabel === undefined) {return;}
        this.remove(this.labelLabel);
    }

    generateCBModel() {
        let mat = new THREE.MeshBasicMaterial({color: 0xffff00});
        let geo = new THREE.SphereGeometry(this.radius * 0.2);
        this.cbModel = new THREE.Mesh(geo, mat);
        this.add(this.cbModel);
    }

}