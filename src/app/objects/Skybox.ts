import * as THREE from 'three';
import image from '../../assets/OpenGameArt_StumpyStrust_Skybox/back.png';


export class Skybox extends THREE.Mesh {
    constructor(size: number = 10000000,) {
        super();

        this.geometry = new THREE.BoxGeometry(size, size, size);
        // this.material = new THREE.MeshBasicMaterial({wireframe: true});
        this.material = this.createSkyboxMaterial(0.05);
        this.receiveShadow = false;
        this.name = 'Skybox';
        console.log('Init skybox.');
        console.log('Image: ', image);
    }

    createSkyboxMaterial(colorVal: number = 0.01) {
        let sides = ['right', 'left', 'top', 'bot', 'front', 'back'];
        const basePath = 'src/assets/OpenGameArt_StumpyStrust_Skybox/';
        return sides.map((x) => {
            console.log('Path: ', basePath + x + '.png');
            let texture = new THREE.TextureLoader().load(basePath + x + '.png', undefined, undefined,
                (e) => {
                    console.error(e)
                });
            return new THREE.MeshBasicMaterial({
                map: texture,
                side: THREE.BackSide,
                color: new THREE.Color(colorVal, colorVal, colorVal)
            });
        });
    }

}