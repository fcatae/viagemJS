/* global canvas */
/// <reference path="babylon.2.1.d.ts" />
function createSceneObjects(scene) {
    var player = createPlayer();
    // shadow
    var shadow_obj = new CShadow('a');
    var shadow = shadow_obj.createMesh(scene);
    // camera, lights		
    var camera = new BABYLON.ArcRotateCamera('camera', 0, 0, 15, new BABYLON.Vector3(0, 0, 0), scene);
    var light = new BABYLON.DirectionalLight('light', new BABYLON.Vector3(-1, -1, -1), scene);
    light.intensity = .7;
    var light2 = new BABYLON.DirectionalLight('light', new BABYLON.Vector3(1, -1, +1), scene);
    light2.intensity = .3;
    // ground
    var ground = BABYLON.Mesh.CreateGround('ground', 20, 20, 20, scene);
    ground.position.y = -1;
    ground.material = new BABYLON.StandardMaterial('ground_mat', scene);
    ground.material.wireframe = true;
    // input manager start
    InputManager.init(camera, scene, player);
    scene.update = function () {
        player.update();
    };
    return scene;
}
