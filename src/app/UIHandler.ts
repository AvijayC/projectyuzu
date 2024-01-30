// Create event listeners for the UI elements.

import Core from "./Core.js";

export class UIHandler {
    core: Core;
    constructor(core: Core) {
        this.core = core;
    }

    initSidebar() {
        let sidebar = document.getElementById("sidebar");
        let sidebarBtn = document.getElementById("sidebarBtn");
    }

}