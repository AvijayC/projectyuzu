import * as THREE from 'three';
import {CelestialBody} from "./objects/CelestialObject.js";
import Core from "./Core.js";

export class Focus {
    cb: CelestialBody | undefined;
    core: Core;
    sysInfoDiv: HTMLDivElement;
    sysHeaderDiv: HTMLDivElement;
    sysDetailDiv: HTMLDivElement;


    constructor(core: Core) {
        this.core = core;
        this.cb = undefined;
        this.sysInfoDiv = <HTMLDivElement>document.getElementById('systemcontainer');
        this.sysDetailDiv = <HTMLDivElement>document.getElementById('systemdetails');
        this.sysHeaderDiv = <HTMLDivElement>document.getElementById('systemheader');
        console.log('Init Focus with: ', this);
    }

    updateCB(cb: CelestialBody) {
        this.cb = cb;
        // TODO: Add other Focus update / context functionality
        this.updateSysContentUI(cb);
    }

    initStarContextUI() {
        // Data is this.cb. If undefined, replace with default values.
        /*
        const labelDiv = document.createElement('div');
        labelDiv.classList.add('label', 'cssFrom3d', 'celestialBody');
        labelDiv.textContent = this.name;
        const labelLabel = new CSS2DObject(labelDiv);
        labelLabel.position.set(1.5 * this.radius, 0, 0);
        labelLabel.center.set(0, 1);
        this.add(labelLabel);
        // labelLabel.layers.set(0);
        console.log(`Label set for ${this.name}. `, labelDiv, labelLabel);
         */
    }

    updateSysContentUI(cb: CelestialBody) {
        this.sysHeaderDiv.textContent = `System: ${cb.name ?? 'undefined'}`;
    }
}