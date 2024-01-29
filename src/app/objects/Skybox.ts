import * as THREE from 'three';
import sbright from '../../assets/OpenGameArt_StumpyStrust_Skybox/right.png';
import sbleft from '../../assets/OpenGameArt_StumpyStrust_Skybox/left.png';
import sbtop from '../../assets/OpenGameArt_StumpyStrust_Skybox/top.png';
import sbbot from '../../assets/OpenGameArt_StumpyStrust_Skybox/bot.png';
import sbfront from '../../assets/OpenGameArt_StumpyStrust_Skybox/front.png';
import sbback from '../../assets/OpenGameArt_StumpyStrust_Skybox/back.png';


export class Skybox extends THREE.Mesh {
    constructor(size: number = 10000000,) {
        super();

        this.geometry = new THREE.BoxGeometry(size, size, size);
        // this.material = new THREE.MeshBasicMaterial({wireframe: true});
        this.material = this.createSkyboxMaterial(0.05);
        this.receiveShadow = false;
        this.name = 'Skybox';
        console.log('Init skybox.');
    }

    createSkyboxMaterial(colorVal: number = 0.01) {
        let sides = [sbright, sbleft, sbtop, sbbot, sbfront, sbback];
        const basePath = 'src/assets/OpenGameArt_StumpyStrust_Skybox/';
        return sides.map((x) => {
            console.log('Path: ', basePath + x + '.png');
            let texture = new THREE.TextureLoader().load(x, undefined, undefined,
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