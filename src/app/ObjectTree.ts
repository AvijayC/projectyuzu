import * as THREE from 'three';
import Core from "./Core.ts";
import {Object3D} from "three";
import {CelestialBody} from "./objects/CelestialObject.ts";
import {Skybox} from "./objects/Skybox.ts";
import {StarPathHandler} from "./StarPathHandler.ts";

export class ObjectTree extends THREE.Group{
    core: Core;
    starGroup: THREE.Group;
    cbList!: CelestialBody[];
    pathGroup: THREE.Group;
    // uiGroup: THREE.Group;
    starPathHandler: StarPathHandler;
    configs!: [];
    constructor(core: Core) {
        super();
        this.cbList = <CelestialBody[]>[];
        this.core = core;
        this.name = 'MAIN';
        [this.starGroup, this.pathGroup] = this.setupFirstLayer();
        this.setupSkybox();
        this.setupStarGroup();
        this.setupStarPaths();
        this.starPathHandler = new StarPathHandler(this.starGroup, this.pathGroup);
    }

    setupFirstLayer() {
        // Add star group. This will contain stars, aka the most used layer.
        const starGroup = new THREE.Group();
        starGroup.name = 'starGroup';
        this.add(starGroup);

        const pathGroup = new THREE.Group();
        pathGroup.name = 'pathGroup';
        this.add(pathGroup);

        const uiGroup = new THREE.Group();
        uiGroup.name = 'uiGroup';
        this.add(uiGroup);

        return [starGroup, pathGroup, uiGroup];
    }

    setupUIGroup() {
        
    }

    setupStarGroup() {
        // Check that starGroup exists.
        let searchRes = this.children.find(x => x.name === 'starGroup');
        if (searchRes == undefined) {throw new ReferenceError('Could not find a group named "starGroup".')} else {}

        // Append various elements to starGroup.
        // core: Core, name: string, pos: [number, number, number], args?: CBAttributes
        // TODO: Implement database instead of hardcode.
        let configs = this.hardcodedStars();
        configs.forEach((v) => {
            let cb = new CelestialBody(null, null, v.name, String(v.oid), v.pos as [number, number, number], this.core, 1);
            // @ts-ignore
            searchRes.add(cb);
            this.cbList.push(cb);
        })
    }

    setupStarPaths() {
        // Check that pathGroup exists.
        let searchRes = this.children.find(x => x.name === 'pathGroup');
        if (searchRes == undefined) {throw new ReferenceError('Could not find a group named "pathGroup".')} else {}

        // TODO: Implement database instead of hardcode.
        let configs = [
            {oid: "1", conns: ["2", "3"]},
            {oid: "2", conns: ["5"]},
            {oid: "3", conns: ["4"]}
        ];
        let cbs = <CelestialBody[]>this.starGroup.children;  // Get all stars.

        // For each cb / conn list combo:
        configs.forEach((v) => {
            let cb = <CelestialBody>cbs.find(x => v.oid === x.oid);  // Find the origin CB
            if (!cb) {console.error('Could not find CB to apply connections: ', v)}  // If origin missing, skip.
            else {  // If origin not missing, iterate through conns and append them if they don't .
                v.conns.forEach((y) => {
                    let destcb = <CelestialBody>cbs.find(z => z.oid === y);
                    this.tryToApplyConnectionToCB(cb, destcb);
                })
            }
        });

        console.log(cbs.map((x) => {
            return [x.oid, x.name, x.connections]
        }));
    }

    tryToApplyConnectionToCB(cb: CelestialBody, conn: CelestialBody) {
        if (!cb.checkIfConnectionExistsHere(conn) && !cb.checkIfIdentityConnection(conn)) {
            cb.connections.push(conn);
            cb.uniconnections.push(conn);
        } else {
            console.log('cb CheckConnectionHere returned false (already exists cb -> conn): ', cb.name, cb.oid, conn.name, conn.oid);
        }

        if (!conn.checkIfConnectionExistsHere(cb) && !conn.checkIfIdentityConnection(cb)) {
            conn.connections.push(cb);
        } else {
            console.log('cb CheckConnectionThere returned false (already exists conn -> cb): ', cb.name, cb.oid, conn.name, conn.oid);
        }
    }

    setupSkybox() {
        const skybox = new Skybox();
        this.add(skybox);
    }

    hardcodedStars() {
        return [
            {name: 'Star1', pos: [-4, 5, 4], oid: 1},
            {name: 'Star2', pos: [-8, -5, -5], oid: 2},
            {name: 'Star3', pos: [4, 3, -4], oid: 3},
            {name: 'Star4', pos: [8, 1, 2], oid: 4},
            {name: 'Star5', pos: [0, -7, 7], oid: 5},
            {name: "Star6", pos: [-26.73932068596818, 38.62607907523608, 16.619080582907706], oid: 6},
            {name: "Star7", pos: [14.612990558416373, -6.50117096473034, 41.125134007031136], oid: 7},
            {name: "Star8", pos: [36.46338047380235, 35.944537991347616, 30.647307983865304], oid: 8},
            {name: "Star9", pos: [-22.424553165033643, -0.6791542713872167, -17.03152610824793], oid: 9},
            {name: "Star10", pos: [41.51787546998358, -1.3088529630944978, 45.846385233635246], oid: 10},
            {name: "Star11", pos: [-42.235747093701825, 1.450823014222491, -22.68472202546419], oid: 11},
            {name: "Star12", pos: [-31.961798053364642, -27.58748474472612, -44.31871875899235], oid: 12},
            {name: "Star13", pos: [-8.220500295694444, -4.022262423992595, 30.929442097670723], oid: 13},
            {name: "Star14", pos: [35.36800182937064, 3.3130488985776974, 37.6733110376619], oid: 14},
            {name: "Star15", pos: [11.730127185396832, 15.168939219323274, 0.62607185288438], oid: 15},
            {name: "Star16", pos: [20.929424472361568, 21.93468738083677, -40.01571789664171], oid: 16},
            {name: "Star17", pos: [25.411588456561486, 19.451335084922295, 11.913929289905012], oid: 17},
            {name: "Star18", pos: [17.961812746557236, 39.14329027262583, -38.74184924871131], oid: 18},
            {name: "Star19", pos: [15.419668346894266, -17.91421336288287, 49.739802349690066], oid: 19},
            {name: "Star20", pos: [-5.78637085816589, 36.041202055080134, -1.8760467529426728], oid: 20},
            {name: "Star21", pos: [42.09260634560091, -46.90740698324123, 6.937198839574965], oid: 21},
            {name: "Star22", pos: [0.9613471579442923, -36.72935173713908, 5.4960896205374805], oid: 22},
            {name: "Star23", pos: [13.516953196474235, 25.232705174036518, -33.78346953959844], oid: 23},
            {name: "Star24", pos: [-18.464887242163684, -34.964227214389844, 36.6525001591081], oid: 24},
            {name: "Star25", pos: [-32.1368119710122, 22.815783692226322, 30.075022329058456], oid: 25},
            {name: "Star26", pos: [-22.45130566400616, 31.54388205356954, 33.551097753500116], oid: 26},
            {name: "Star27", pos: [-47.06935460964286, -11.718740401589633, 46.22677337110525], oid: 27},
            {name: "Star28", pos: [10.78964061436728, 10.091361951475186, 49.72908250428476], oid: 28},
            {name: "Star29", pos: [-4.141365556975818, 47.18395135737546, 10.22570268943699], oid: 29},
            {name: "Star30", pos: [34.00445526317013, -26.619817598430252, -27.549127179522493], oid: 30},
            {name: "Star31", pos: [30.81759506000393, -12.710933510342414, 42.76824129668826], oid: 31},
            {name: "Star32", pos: [-22.03538514641069, -23.192517393919754, 13.31200563923478], oid: 32},
            {name: "Star33", pos: [-47.50130409899158, -2.8159356925789747, -44.27774868530325], oid: 33},
            {name: "Star34", pos: [48.70882924858662, 26.42999410942649, -35.08983543283257], oid: 34},
            {name: "Star35", pos: [12.752242802774482, 12.809619604094868, 43.3980049060867], oid: 35},
            {name: "Star36", pos: [-26.418712899586982, -30.059616965729184, -30.5810079319047], oid: 36},
            {name: "Star37", pos: [-0.46738779605371983, 1.4204407370248084, 14.140903985015784], oid: 37},
            {name: "Star38", pos: [25.629199976786165, -7.22382595395894, 38.83240764927216], oid: 38},
            {name: "Star39", pos: [-11.279878057322879, -30.1867201061789, -6.167102028899352], oid: 39},
            {name: "Star40", pos: [33.645859944582135, -41.67388302426011, -17.887541255229756], oid: 40},
            {name: "Star41", pos: [-31.67850892808812, -20.71627820693813, 27.673290375003536], oid: 41},
            {name: "Star42", pos: [32.03479167120894, -31.30225079778286, -34.79253156197677], oid: 42},
            {name: "Star43", pos: [46.76449169020411, -27.885725270305095, -10.381406280208916], oid: 43},
            {name: "Star44", pos: [-38.03194803217481, -29.471237475453083, 46.883479792961715], oid: 44},
            {name: "Star45", pos: [-14.024751760665112, 32.431419646814206, 5.841323931081222], oid: 45},
            {name: "Star46", pos: [-3.409406095793921, -14.304618603602226, -45.66906279491698], oid: 46},
            {name: "Star47", pos: [1.9165713102051285, 26.80649685457791, 41.56069068595089], oid: 47},
            {name: "Star48", pos: [-28.80935029772653, 45.048667738635714, 13.167965860264385], oid: 48},
            {name: "Star49", pos: [-3.7811596816837767, -30.818390983752586, 37.18056239720289], oid: 49},
            {name: "Star50", pos: [-40.254789276345704, 10.117859495973214, 8.604434531871586], oid: 50},
            {name: "Star51", pos: [31.30971159966387, 49.3663163945655, -8.982777381678165], oid: 51},
            {name: "Star52", pos: [-26.824008063729444, 10.371132221011337, 37.99080615939021], oid: 52},
            {name: "Star53", pos: [36.43706829325666, -8.959874165403159, -46.989471542300684], oid: 53},
            {name: "Star54", pos: [0.40050311771021585, -14.067454710937167, -14.968225863121587], oid: 54},
            {name: "Star55", pos: [21.98292687370578, 40.52807901203489, 41.76647584155696], oid: 55},
            {name: "Star56", pos: [36.237955142574364, 19.778692579416724, 2.7347511015835213], oid: 56},
            {name: "Star57", pos: [-19.24597900136168, 34.18342239698272, 11.048200594757851], oid: 57},
            {name: "Star58", pos: [-13.0503550818855, -16.414804269636463, -24.202722728730663], oid: 58},
            {name: "Star59", pos: [-1.8993765502551385, -29.189106624190874, 27.89005655529042], oid: 59},
            {name: "Star60", pos: [16.42954817928746, 30.738096854563324, -20.54143723398617], oid: 60},
            {name: "Star61", pos: [-2.326422920883131, -21.400809537561617, 34.39065503290427], oid: 61},
            {name: "Star62", pos: [-29.887491689625378, -4.1330590115087436, -23.209871130830084], oid: 62},
            {name: "Star63", pos: [-23.56265732129407, -43.32129110624167, -47.556153875407745], oid: 63},
            {name: "Star64", pos: [-49.86413194526826, 4.271081292988487, 18.444942498485805], oid: 64},
            {name: "Star65", pos: [-13.75796677132508, -1.812540591908407, -35.48352867968764], oid: 65},
            {name: "Star66", pos: [-2.9885560880011375, -3.904849342837069, 0.556886681458546], oid: 66},
            {name: "Star67", pos: [-33.92851225043301, 32.484517484258525, -28.828251176859876], oid: 67},
            {name: "Star68", pos: [-9.260493962355799, 31.857594791120935, 14.600507969027621], oid: 68},
            {name: "Star69", pos: [48.606363569277754, -43.65247844551385, -27.275582621684713], oid: 69},
            {name: "Star70", pos: [38.902695806649255, 41.68989436023479, 20.806873355732392], oid: 70},
            {name: "Star71", pos: [-21.87602789510301, 40.96665072202919, 27.30406414927358], oid: 71},
            {name: "Star72", pos: [21.988612875692624, -25.266558724808753, 1.7562910292276745], oid: 72},
            {name: "Star73", pos: [-5.052699038959563, 25.806543439065088, 7.215693762448094], oid: 73},
            {name: "Star74", pos: [-2.2483985316128385, 22.42804347567322, -41.948126096395235], oid: 74},
            {name: "Star75", pos: [-7.068524299738588, 16.364798437123028, -25.528213026903135], oid: 75},
            {name: "Star76", pos: [47.80436048001779, 44.11663938960573, -47.41499222484975], oid: 76},
            {name: "Star77", pos: [-16.13441713375787, -21.657399653685804, 18.346274053515156], oid: 77},
            {name: "Star78", pos: [39.05143108621964, -3.2927918219647356, -3.7007323744034037], oid: 78},
            {name: "Star79", pos: [39.37930385398768, -2.0652416836898224, -34.187704943363265], oid: 79},
            {name: "Star80", pos: [30.788631084315632, 17.312806255270573, 31.375976324796095], oid: 80},
            {name: "Star81", pos: [-5.169632074241537, 42.34797483974838, 23.056475814590794], oid: 81},
            {name: "Star82", pos: [-39.577014921451216, 34.43776636102002, 31.38992802747156], oid: 82},
            {name: "Star83", pos: [-8.725216243183976, 44.2785429155929, 26.138275619932806], oid: 83},
            {name: "Star84", pos: [-2.75780583792814, 32.173448467984876, -47.649188167507376], oid: 84},
            {name: "Star85", pos: [8.981757740343621, -32.5663308504218, -42.629944683367285], oid: 85},
            {name: "Star86", pos: [20.05755446877602, -16.54080187901864, -31.74838494827358], oid: 86},
            {name: "Star87", pos: [-7.181343727369772, -13.296886474330993, 2.3577456190692736], oid: 87},
            {name: "Star88", pos: [-43.151580742732435, -39.94138135496815, 33.44056699592925], oid: 88},
            {name: "Star89", pos: [14.749979788741019, 14.671001252309523, 1.4322516623420545], oid: 89},
            {name: "Star90", pos: [-28.788603780432876, 21.91863116887889, -45.540934851243385], oid: 90},
            {name: "Star91", pos: [-13.243392119353391, 49.1812111816732, 17.446013149367158], oid: 91},
            {name: "Star92", pos: [-48.989410994789026, -4.80099153665996, -28.445040170367264], oid: 92},
            {name: "Star93", pos: [-1.7474779571887367, -47.76796501205409, -24.06097128372514], oid: 93},
            {name: "Star94", pos: [46.751334989306145, -46.19027082590951, -39.20416698954242], oid: 94},
            {name: "Star95", pos: [15.58617306855361, 33.14068594310435, -17.72794058584629], oid: 95},
            {name: "Star96", pos: [-32.88809137171983, 39.576814517820544, 24.042319438943082], oid: 96},
            {name: "Star97", pos: [-4.4485440755986705, 28.91236029302895, -29.351798608350666], oid: 97},
            {name: "Star98", pos: [-28.17315226207422, 34.86969976318558, -4.295867296615585], oid: 98},
            {name: "Star99", pos: [7.8083875679534565, -1.1424799109073014, -30.82896454044025], oid: 99},
        ]
    }
}