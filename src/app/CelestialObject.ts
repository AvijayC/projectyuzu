// import * as THREE from 'three';
// import 'uuid';
// import Core from "./Core.ts";
//
// export class CelestialObject {
//     core: Core;
//     id: string;
//     name: string;
//     x: number;
//     y: number;
//     z: number;
//     color: number;
//     texturePath: string | null;
//     geo!: THREE.SphereGeometry;
//     obj!: THREE.Object3D;
//     material!: THREE.Material;
//
//
//     constructor(
//         core: Core,
//         name: string,
//         posArr: [number, number, number],
//         color: number,
//         geo: THREE.SphereGeometry,
//         texturePath: string | null,
//     ) {
//         this.geo = geo;
//         this.core = core;
//         this.texturePath = texturePath;
//         [this.x, this.y, this.z] = posArr;
//         this.color = color;
//         this.name = name;
//         this.id = THREE.MathUtils.generateUUID();
//         this.obj = this.createGeo();
//         this.obj.position.x = this.x;
//         this.obj.position.y = this.y;
//         this.obj.position.z = this.z;
//         console.debug('Created CelestialObject: ', this);
//         this.attachToRenderer();
//     }
//
//     createGeo() {
//         if (typeof(this.texturePath) === 'string') {
//             const objectTexture = new THREE.TextureLoader().load(this.texturePath);
//             this.material = new THREE.MeshPhongMaterial({map: objectTexture});
//         } else {
//             this.material = new THREE.MeshPhongMaterial({color: this.color});
//         }
//         return new THREE.Mesh(this.geo, this.material);
//     }
//
//     attachToRenderer() {
//         this.core.scene.add(this.obj);
//     }
// }
//
// class Star extends CelestialObject {
//     constructor(
//         core: Core,
//         name: string,
//         posArr: [number, number, number],
//         color: number,
//         geo: THREE.SphereGeometry,
//         texturePath: string | null,
//     ) {
//         super(
//             core,
//             name,
//             posArr,
//             color,
//             geo,
//             texturePath
//         );
//     }
//
//
// }
//
