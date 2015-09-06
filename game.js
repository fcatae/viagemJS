/* global canvas */
/// <reference path="babylon.2.1.d.ts" />
var canvas; // = <HTMLCanvasElement>document.querySelector('canvas');
var engine; // = new BABYLON.Engine(canvas, true);
var scene; // = createScene();
function baby_init() {
    canvas = document.querySelector('canvas');
    engine = new BABYLON.Engine(canvas, true);
    scene = new BABYLON.Scene(engine);
    createSceneObjects(scene);
}
//var player;
//var target_position;
//var target = { position: null };
function createSceneObjects(scene) {
    var sphere = BABYLON.Mesh.CreateSphere('sphere', 32, 2, scene);
    var sph_mat = new BABYLON.StandardMaterial('sph-mat', scene);
    sph_mat.diffuseColor = new BABYLON.Color3(1, .5, .5);
    sphere.material = sph_mat;
    var player = sphere;
    player.update = player_update;
    player.trail_position = null;
    var shadow_obj = new CShadow('a');
    var shadow = shadow_obj.createMesh(scene);
    var camera = new BABYLON.ArcRotateCamera('camera', 0, 0, 15, new BABYLON.Vector3(0, 0, 0), scene);
    var light = new BABYLON.DirectionalLight('light', new BABYLON.Vector3(-1, -1, -1), scene);
    light.intensity = .7;
    var light2 = new BABYLON.DirectionalLight('light', new BABYLON.Vector3(1, -1, +1), scene);
    light2.intensity = .3;
    var ground = BABYLON.Mesh.CreateGround('ground', 20, 20, 20, scene);
    ground.position.y = -1;
    ground.material = new BABYLON.StandardMaterial('ground_mat', scene);
    ground.material.wireframe = true;
    InputManager.init(camera, scene, player);
    scene.player = player;
    return scene;
}
document.addEventListener('DOMContentLoaded', function () {
    baby_init();
    engine.runRenderLoop(gameloop);
});
function gameloop() {
    scene.render();
    scene.player.update(scene.player);
}
;
function player_update(player) {
    var target_position = player.trail_position;
    if (target_position) {
        var dx = target_position.x - player.position.x;
        var dz = target_position.z - player.position.z;
        var direction = new BABYLON.Vector3(dx, 0, dz);
        if (direction.lengthSquared() > 1) {
            direction = direction.normalize();
        }
        else {
        }
        var velocity = .1;
        player.translate(direction, velocity);
    }
}
