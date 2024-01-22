import * as THREE from 'three';

export class CelestialBody extends THREE.Mesh {
    constructor(geo: THREE.BufferGeometry | null, mat: THREE.Material | null, name: string, pos: [number, number, number]) {
        const defaultMat = new THREE.MeshPhongMaterial({color: 0xffffff});
        // defaultMat.side = THREE.DoubleSide;
        const defaultGeo = new THREE.SphereGeometry(1);
        super(geo ?? defaultGeo, mat ?? defaultMat);
        [this.position.x, this.position.y, this.position.z] = pos;
        this.name = name;
    }

}