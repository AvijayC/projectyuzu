// Create event listeners for the UI elements.

import Core from "./Core.js";

export class UIHandler {
    core: Core;
    sidebar!: HTMLElement;
    sidebarBtn!: HTMLElement;
    constructor(core: Core) {
        this.core = core;
        this.initSidebar();
    }

    initSidebar() {
        this.sidebar = document.getElementById("sidebar")!;
        this.sidebarBtn = document.getElementById("sidebarBtn")!;
    }

    onSearchEnter() {

    }

}