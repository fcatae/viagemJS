/* global canvas */
/// <reference path="babylon.2.1.debug.js" />
/// <reference path="baby.js" />

var engine = new BABYLON.Engine(canvas);

var scene = new BABYLON.Scene(engine);

var camera = new BABYLON.ArcRotateCamera('camera', 1, 1, 10, new BABYLON.Vector3(0,0,0), scene); 
var light = new BABYLON.DirectionalLight('light', new BABYLON.Vector3(-1, -1, -1), scene);

createScene();

camera.attachControl(canvas);

engine.runRenderLoop(function() {
	scene.render();
	scene.update();
});

function createMeteor(pos) {
	var meteor = BABYLON.Mesh.CreateSphere('meteor', 8, 2, scene);
	var posz = pos;
	var velz = -.05;
	
	meteor.update = function() {
		meteor.position = new BABYLON.Vector3(posz, 0, 0);
		posz += velz;	
	};
	
	return meteor;	
}

function createScene() {
	//scene.clearColor = new BABYLON.Color3(.5, .5, 1);
	
	var sphere = BABYLON.Mesh.CreateSphere('sphere', 8, 2, scene);
	var met = createMeteor(1);
	
	var grid = BABYLON.Mesh.CreateGround('plane', 20, 20, 10, scene);
	grid.material = new BABYLON.StandardMaterial('grid_material', scene);
	grid.material.wireframe = true;
	grid.position = new BABYLON.Vector3(0, -1, 10);
	
	var posx = 0;
	var velx = .05;
	scene.update = function update() {
		sphere.position = new BABYLON.Vector3(posx, 0, 0);
		posx += velx;
		
		if(posx > 5) { velx = -velx; }
		if(posx < -5) { velx = -velx; }
		
		met.update();
	}
	
	return scene;
}

window.addEventListener('keydown', function(evt) {
	console.log('keydown: ' + evt.keyCode);
});

var s = new Shadow();
s.hello();