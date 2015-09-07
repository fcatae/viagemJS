class Player {
	
	mesh: any = null;
	trail_position: any = null;
	
	constructor(scene) {
		var sphere = BABYLON.Mesh.CreateSphere('sphere', 32, 2, scene);
		var sph_mat = new BABYLON.StandardMaterial('sph-mat', scene);
		sph_mat.diffuseColor = new BABYLON.Color3(1, .5, .5);
		sphere.material = sph_mat;
		this.mesh = sphere;
	}
	
	update() {
		
		var target_position = this.trail_position ;

		if(target_position) {		
			var dx = target_position.x - this.mesh.position.x;
			var dz = target_position.z - this.mesh.position.z;
			
			var direction = new BABYLON.Vector3(dx, 0, dz);
			
			if( direction.lengthSquared() > 1) {
				direction = direction.normalize();
			} else {
				// chegou!	
			}
			
			var velocity = .1;
			
			this.mesh.translate( direction, velocity );
		}	
	}
		
}