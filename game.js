/* global canvas */
/// <reference path="babylon.2.1.d.ts" />

var engine = new BABYLON.Engine(canvas, true);

var scene = createScene();

var player;
var target_position;

function createScene() {
	var scene = new BABYLON.Scene(engine);
	
	var sphere = BABYLON.Mesh.CreateSphere('sphere', 32, 2, scene);
	var sph_mat = new BABYLON.StandardMaterial('sph-mat', scene);
	sph_mat.diffuseColor = new BABYLON.Color3(1, .5, .5);
	sphere.material = sph_mat;
	player = sphere;
	
	var camera = new BABYLON.ArcRotateCamera('camera', 0, 0, 15, new BABYLON.Vector3(0,0,0), scene);
	var light = new BABYLON.DirectionalLight('light', new BABYLON.Vector3(-1,-1,-1), scene);

	var ground = BABYLON.Mesh.CreateGround('ground', 20, 20, 20, scene);
	ground.position.y = -1;
	
	ground.material = new BABYLON.StandardMaterial('ground_mat', scene);
	ground.material.wireframe = true;
	
	// input manager
	window.addEventListener('keyup', function(evt) {
		
		switch(evt.keyCode) {
			case 67: // C
				camera.attachControl(canvas);
				break;
			case 86: // V
				camera.detachControl(canvas);
				break;
			default:
				//alert('key: ' + evt.keyCode);
		}
	});
	
	window.addEventListener('click', function(evt) {
		var pickResult = scene.pick(scene.pointerX, scene.pointerY);
		
		if( pickResult && pickResult.pickedPoint ) {		
			var point = pickResult.pickedPoint;
			
			createTarget(point);
		}
	});	
	
	// f
	function createTarget(point) {
		var newObject = BABYLON.Mesh.CreateTorus('torus', .5, .2, 10, scene);
		newObject.position = point;			
		
		target_position = point;
	}

	return scene;
}

engine.runRenderLoop(function() {
	scene.render();

	if(target_position) {		
		var dx = target_position.x - player.position.x;
		var dz = target_position.z - player.position.z;
		
		var direction = new BABYLON.Vector3(dx, 0, dz);
		
		if( direction.lengthSquared() > 1) {
			direction = direction.normalize();
		}
		var velocity = .1;
		
		player.translate( direction, velocity );
	}

});