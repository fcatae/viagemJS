/// <reference path="typings/babylon.2.1.d.ts" />
/// <reference path="path.ts" />

class PlayerPath {
	path: Path = new Path(null);
	total_distance: number = 0;
	last_position: BABYLON.Vector3;
	isSync: boolean = true;
	delta_distance: number = 1;
	
	init(position) {
		this.isSync = true;
		this.last_position = position;	
	}
	
	add(position) {
		
		if( this.isSync && this.last_position ) {
			
			var distance = BABYLON.Vector3.Distance(position, this.last_position);
			this.total_distance += distance;
			
			if( this.total_distance > this.delta_distance ) {		
				this.addSegment(position);
				this.total_distance -= this.delta_distance;
				console.log('PlayerPath: add-segment-position');
			}

		}
		
		this.last_position = position;
	}
	
	addSegment(position) {
		this.path.addHead(new PathSegment(position));
	}
	
	followstep() {
		var stepSegment = this.path.popValue();
		
		return stepSegment;
	}
}

class Player {
	
	trail: PlayerPath = new PlayerPath();
	mesh: any = null;
	trail_position: any = null;
	
	constructor(scene) {
		var sphere = BABYLON.Mesh.CreateSphere('sphere', 32, 2, scene);
		var sph_mat = new BABYLON.StandardMaterial('sph-mat', scene);
		sph_mat.diffuseColor = new BABYLON.Color3(1, .5, .5);
		sphere.material = sph_mat;
		this.mesh = sphere;
	}
	
	init() {
		this.trail.init(this.mesh.position);
	}
	
	update() {
		
		var target_position = this.trail_position ;
		var this_mesh = this.mesh;
		
		if( target_position ) {
			this.move_object(target_position, this_mesh, .1);		
			this.trail.add(target_position);
		}
	}
	
	move_object(target_position, this_mesh, velocity) {

		var finished_movement = false;
		
		var mesh_position = this_mesh.position;
		
		var dx = target_position.x - mesh_position.x;
		var dz = target_position.z - mesh_position.z;
		
		var direction = new BABYLON.Vector3(dx, 0, dz);
		
		if( direction.lengthSquared() > velocity) {
			direction = direction.normalize();
		} else {
			finished_movement = true;
		}
		
		this_mesh.translate( direction, velocity );
		
		return finished_movement;
	}
		
}