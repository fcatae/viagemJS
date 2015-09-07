/// <reference path="typings/babylon.2.1.d.ts" />

class InputManager {
	
	static init(camera : BABYLON.Camera, scene: BABYLON.Scene) {
			
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
			
			if( pickResult && pickResult.pickedMesh && (<any>pickResult.pickedMesh).onclick) {
				var point = pickResult.pickedPoint;
				
				(<any>pickResult.pickedMesh).onclick(point);
			}
			
		});	
		
	}
}
