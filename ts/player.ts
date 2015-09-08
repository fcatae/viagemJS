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

interface xy {
	x: number;
	y: number;
}

class Player {

	position: MeshPosition;
	trail: PlayerPath = new PlayerPath();
	mesh: any = null;
	trail_position: any = null;
	target_position: any = null;
	
	constructor(scene) {
		var sphere = BABYLON.Mesh.CreateSphere('sphere', 32, 2, scene);
		var sph_mat = new BABYLON.StandardMaterial('sph-mat', scene);
		sph_mat.diffuseColor = new BABYLON.Color3(1, .5, .5);
		sph_mat.alpha = .8;
		sphere.material = sph_mat;
		this.mesh = sphere;
		
		this.position = new MeshPosition(sphere,2);
	}
	
	init() {
		this.trail.init(this.mesh.position);
	}
	
	update() {
		
		var target_position = this.trail_position ;
		
		if( target_position ) {
			this.move_object(.1); // remove this_mesh		
			this.trail.add(target_position);
		}
	}
	
	private move_object(velocity) {

		var finished_movement = false;
		
		var dx = this.target_position.x - this.position.x;
		var dz = this.target_position.y - this.position.y;		
		
		var path = subtract(this.target_position, this.position);
		if( distanceSquared(path) > square(velocity) ) {
			path = mult(velocity, norm(path));
		}
		this.position.translate(path);		
		
		return finished_movement;
		
		function subtract(a:xy, b:xy) {
			return [a.x-b.x, a.y-b.y];
		}
		function distanceSquared(vect) {
			return vect[0]*vect[0]+vect[1]*vect[1];
		}
		function square(n) {
			return n*n;
		}
		function norm(vect) {
			var distance = Math.sqrt( distanceSquared(vect) );
			return [ vect[0]/distance, vect[1]/distance ];			
		}
		function mult(val, vect) {
			return [ vect[0]*val, vect[1]*val ];
		}
	}
	

		
}