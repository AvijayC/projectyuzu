import * as THREE from 'three';
import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass";
import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer";
import Core from "./Core.ts";
import {UnrealBloomPass} from "three/examples/jsm/postprocessing/UnrealBloomPass";
import {ShaderPass} from "three/examples/jsm/postprocessing/ShaderPass";
import {FXAAShader} from "three/examples/jsm/shaders/FXAAShader";
import {SMAAPass} from "three/examples/jsm/postprocessing/SMAAPass";
import {SSAOPass} from "three/examples/jsm/postprocessing/SSAOPass";

export function setupRenderPass(
    core: Core,
) {

    const renderScene = new RenderPass(core.scene, core.camera);
    const composer = new EffectComposer(core.renderer);

    // TODO: Configure bloom params here.
    const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        1.6, 0.1, 0.0
    );

    // TODO: AA config
    // const aaPass = new Pass

    composer.addPass(renderScene);
    if (core.bloom) {composer.addPass(bloomPass)}
    if (core.fxaa) {
        // composer.addPass(new SMAAPass(window.innerWidth, window.innerHeight));
        // composer.addPass(new SSAOPass(core.scene, core.camera, window.innerWidth, window.innerHeight));
    }
    console.debug('renderPass.ts: core.bloom: ', core.bloom, ' composer: ', composer.passes);

    // window.addEventListener('resize', () => {
    //     bloomPass.resolution = new THREE.Vector2(window.innerWidth, window.innerHeight);
    // })

    return composer;
}

