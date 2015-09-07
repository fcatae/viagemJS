/// <reference path="typings/babylon.2.1.d.ts" />

function createSceneObjects(scene) {
	
	// player
	var player = new Player(scene);
	
	// shadow
	var shadow = new Shadow(scene);

	// camera, lights		
	var camera = new BABYLON.ArcRotateCamera('camera', 0, 0, 15, new BABYLON.Vector3(0,0,0), scene);
	var light = new BABYLON.DirectionalLight('light', new BABYLON.Vector3(-1,-1,-1), scene); light.intensity = .7;
	var light2 = new BABYLON.DirectionalLight('light', new BABYLON.Vector3(1,-1, +1), scene); light2.intensity = .3;	

	// ground
	var ground = createGround(scene);
	
	ground['onclick'] = function (point) {
		createTorus(scene, point);
		player.trail_position = point;
		};
	
	// input manager start
	InputManager.init(camera, scene);

	
	scene.update = function() {
		player.update();
		
		var followstep = player.trail.followstep();
		if( followstep ) {
			
			player.move_object(followstep, shadow.mesh, .08);
			
			//shadow.mesh.position = followstep;
			console.log('follow step');
		}
	}; 
	
	return scene;	
	
	function createMiniSphere(scene, point) {
		var newObject = BABYLON.Mesh.CreateSphere('sph-trail', 4, .2, scene);
		newObject.position = point;			
		
		var newobj_mat = new BABYLON.StandardMaterial('gold_mat', scene);		
		newobj_mat.diffuseColor = new BABYLON.Color3(1,1,.1);
		newobj_mat.emissiveColor = new BABYLON.Color3(.4,.4,.2);
		newObject.material = newobj_mat;
		
		return newObject;
	}
	
	// create torus
	function createTorus(scene, point) {
		var newObject = BABYLON.Mesh.CreateTorus('torus', .5, .2, 10, scene);
		newObject.position = point;			
		
		var newobj_mat = new BABYLON.StandardMaterial('gold_mat', scene);		
		newobj_mat.diffuseColor = new BABYLON.Color3(1,1,.1);
		newobj_mat.emissiveColor = new BABYLON.Color3(.4,.4,.2);
		newObject.material = newobj_mat;
		
		return newObject;
	}
	
	// create ground
	function createGround(scene) {
		var ground = BABYLON.Mesh.CreateGround('ground', 20, 20, 20, scene);
		ground.position.y = -1;
		
		ground.material = new BABYLON.StandardMaterial('ground_mat', scene);
		ground.material.wireframe = true;
		
		return ground;
	}
		
}




