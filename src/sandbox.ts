import Core from "./app/Core.ts";
import {CelestialBody} from "./app/objects/CelestialObject.ts";

function sandboxFunction(
    uiRoot: HTMLElement,
    _appRoot: HTMLElement,
    core: Core,
) {

    // Add a toggle to change bloom.
    const bloomToggleHTML = `
        <input type="checkbox" name="Enable bloom" checked >
    `
    let tempContainer = document.createElement('div');
    tempContainer.innerHTML = bloomToggleHTML;
    let bloomToggleElement = tempContainer.firstElementChild;
    uiRoot.appendChild(bloomToggleElement!);

    // Create mesh for CB.
    core.starObjGroup.add()


}

export default sandboxFunction;