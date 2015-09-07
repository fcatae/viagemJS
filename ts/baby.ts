/* global canvas */
/// <reference path="babylon.2.1.d.ts" />
var canvas; // = <HTMLCanvasElement>document.querySelector('canvas');
var engine;// = new BABYLON.Engine(canvas, true);
var scene; // = createScene();

document.addEventListener('DOMContentLoaded', function() {
	baby_init();
	engine.runRenderLoop(gameloop);
});

function baby_init() {
	canvas = <HTMLCanvasElement>document.querySelector('canvas');
	engine = new BABYLON.Engine(canvas, true);
	scene = new BABYLON.Scene(engine);
	createSceneObjects(scene);
}

function gameloop() {
	scene.render();
	
	if(scene.update) {
		scene.update();
	}
};