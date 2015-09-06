/// <reference path="babylon.2.1.d.ts" />

class CShadow {
	_name: string;
	constructor(name: string) {
		this._name = name;
	}
	
	createMesh(scene) : BABYLON.Mesh {		
		var shadow = BABYLON.Mesh.CreateSphere('sphere', 32, 1.5, scene);
		var shadow_mat = new BABYLON.StandardMaterial('sph-mat', scene);
		shadow_mat.diffuseColor = new BABYLON.Color3(1, .5, .5);
		shadow_mat.alpha = .8;
		shadow.material = shadow_mat;
		
		return shadow;
	}
}

class InputManager {
	
	static init(camera : BABYLON.Camera, scene: BABYLON.Scene, player: any) {
			
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
			
			var newobj_mat = new BABYLON.StandardMaterial('gold_mat', scene);		
			newobj_mat.diffuseColor = new BABYLON.Color3(1,1,.1);
			newobj_mat.emissiveColor = new BABYLON.Color3(.4,.4,.2);
			newObject.material = newobj_mat;
			
			//target_position = point;
			player.trail_position = point;
		}
		
	}
}
