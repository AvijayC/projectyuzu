import * as THREE from 'three';
import {throttle} from "./utils.ts";
import {RaycastLogicHandler} from "./RaycastGroup.ts";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import {AnimationHandler} from "./AnimationHandler.ts";
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import {CelestialBody} from "./objects/CelestialObject.js";
import {Focus} from "./Focus.js";


export default class Core {
    constructor(
        uiRoot: HTMLElement,
        appRoot: HTMLElement,
        debugElems: HTMLElement[],
    ) {
        this.debugElems = debugElems;
        this.camera = new THREE.PerspectiveCamera();
        this.renderer = new THREE.WebGLRenderer({antialias: false});
        this.lights = <THREE.Light[]>[];
        this.uiRoot = uiRoot;
        this.appRoot = appRoot;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2(1, 1);
        this.bloom = false;
        this.fxaa = false;
        this.currentIntersections = [];
        this.initScene();
        this.initRenderer();
        this.initCSSRenderer();
        this.initCamera();
        this.initMouse();
        // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls = new OrbitControls(this.camera, this.labelRenderer.domElement);
        this.controls.enabled = true;
        this.controls.minDistance = 34;
        this.controls.maxDistance = 170;
        this.raycastLogicHandler = new RaycastLogicHandler(this);
        this.animationHandler = new AnimationHandler(this);
        this.focus = new Focus(this);

        // Mark init as complete. Can begin refreshing.
        this.initialized = true;

    }

    focus: Focus;
    animationHandler: AnimationHandler;
    controls: OrbitControls;
    currentIntersections: Array<THREE.Intersection<THREE.Object3D>>;
    initialized: boolean;
    raycastLogicHandler: RaycastLogicHandler;
    debugElems: HTMLElement[];
    camera: THREE.PerspectiveCamera;
    scene!: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    labelRenderer!: CSS2DRenderer;
    uiRoot: HTMLElement;
    appRoot: HTMLElement;
    raycaster: THREE.Raycaster;
    mouse: THREE.Vector2;
    lights!: THREE.Light[];
    bloom: boolean;
    fxaa: boolean;

    initCamera() {
        this.camera.fov = 45;
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.near = 1;
        this.camera.far = 50000000;
        this.camera.updateProjectionMatrix();
        this.camera.position.set(20, 20, 20);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.layers.enableAll(); // TODO: fix this.

        // this.camera.layers.enableAll();

        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
        })
    }

    initScene() {
        this.scene = new THREE.Scene(); // CORE scene. MAIN should be added to this.
        this.scene.name = "CORE";
        // this.scene.background = new THREE.Color(0x000000);

        // TODO: Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
        ambientLight.name = 'ambientLight';
        this.scene.add(ambientLight);

    }

    initRenderer() {
        // Config
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.appRoot.appendChild(this.renderer.domElement);
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        window.addEventListener('resize', () => {
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        })
    }

    initCSSRenderer() {
        this.labelRenderer = new CSS2DRenderer;
        this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
        this.labelRenderer.domElement.style.position = 'absolute';
        this.labelRenderer.domElement.classList.add('labelRenderer');
        this.appRoot.appendChild(this.labelRenderer.domElement);
        window.addEventListener('resize', () => {
            this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
        })
    }

    initMouse() {
        window.addEventListener('mousemove', (event) => {
            event.preventDefault();
            this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
            this.raycaster.setFromCamera(this.mouse, this.camera);
        });
    }

    refreshRaycaster() {
        // FRAMELOOP: This runs EVERY FRAME.
        // If init order bad, error out.
        if (!this.initialized) {throw new Error('Refresh method called before initialization of core was complete.')}

        // Refresh raycaster in RaycastGroup.
        this.raycastLogicHandler.update();
        // console.log('Orbitcontrols zooms: ', this.controls.zoom0, this.controls.minZoom, this.controls.maxZoom, this.controls.getAzimuthalAngle(), this.controls.getDistance());
    }

    update() {
        this.refreshRaycaster();
        // this.controls.update();
    }

}