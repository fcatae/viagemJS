/// <reference path="typings/babylon.2.1.d.ts" />
/// <reference path="global.ts" />

function createSceneObjects(scene) {
	
	collisionMgr = new EatManager();
	
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
		var torus = createTorus(scene, point);
		player.trail_position = point;
		player.target_position = { x: point.x, y: point.z};
		collisionMgr.register({x: point.x, y: point.z, size: .1, name:'torus'
			,oncollision: function() { torus.material.diffuseColor = new BABYLON.Color3(.1,.1,.5); }
		});
	};
	
	// input manager start
	InputManager.init(camera, scene);

	var followstep = null;
	player.init();
	
	// eat test
	player.position.name = 'sphere';
	collisionMgr.registerEater(player.position);
	var minisph = createMiniSphere(scene, new BABYLON.Vector3(3,0,3));
	collisionMgr.register({x: 3, y: 3, size: .2, name:'minisph', oncollision: function() { minisph.position = new BABYLON.Vector3(3,3,3)}
	});
	
	scene.update = function() {
				
		player.update();
		
		if( followstep ) {			
			var finished = move_shadow_object(followstep, shadow.mesh, .08);
			
			if( finished ) {
				followstep = null;
			}
		} else {
			followstep = player.trail.followstep();
		}

		collisionMgr.check();
	}; 
	
	return scene;		
	
	function move_shadow_object(target_position, this_mesh, velocity) {

		var finished_movement = false;
		
		var mesh_position = this_mesh.position;
		
		var dx = target_position.x - mesh_position.x;
		var dz = target_position.z - mesh_position.z;
		
		var direction = new BABYLON.Vector3(dx, 0, dz);
		
		if( direction.length() > velocity) {
			direction = direction.normalize();
		} else {
			finished_movement = true;
		}
		
		this_mesh.translate( direction, velocity );
		
		return finished_movement;
	}
	
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




