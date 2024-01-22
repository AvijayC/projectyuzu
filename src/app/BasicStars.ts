import * as THREE from 'three';
import Core from "./Core.ts";
import {BufferGeometry, NormalBufferAttributes, TextureLoader} from "three";

export default class BasicStars {
    span: number;
    name: string;
    numStars: number;
    starCoords: number[];
    core: Core;
    starsGeometry: BufferGeometry<NormalBufferAttributes>;
    starsMaterial: THREE.PointsMaterial;
    stars: THREE.Points;
    constructor(
        core: Core,
        name: string,
        span: number,
        numStars: number,
    ) {
        this.core = core;
        this.name = name;
        this.span = span ?? 1000;
        this.numStars = numStars ?? 300;
        this.starCoords = <number[]>[]

        for(let i = 0; i < this.numStars; i++) {
            this.starCoords.push(...this.noiseGenerator3d());
        }
        console.debug(`BasicStars ${this.name}: completed coord init.`);

        this.starsGeometry = new THREE.BufferGeometry();
        this.starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(this.starCoords, 3));

        this.starsMaterial = new THREE.PointsMaterial({color: 0xaaaaaa});
        this.stars = new THREE.Points(this.starsGeometry, this.starsMaterial);
        this.stars.name = 'Starfield';

        this.attachToRenderer();
    }

    attachToRenderer() {
        this.core.scene.add(this.stars);
    }

    noiseGenerator3d() {
        const x = THREE.MathUtils.randFloatSpread(this.span);
        const y = THREE.MathUtils.randFloatSpread(this.span);
        const z = THREE.MathUtils.randFloatSpread(this.span);
        return [x, y, z];
    }
}