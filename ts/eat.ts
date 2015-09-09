/// <reference path="typings/babylon.2.1.d.ts" />

interface ObjectPosition {
	name?: string;
	x: number;
	y: number;
	h: number;
	size: number;
	oncollision: (hit) => void;
}

class MeshPosition {

	get x(): number { return this.mesh.position.x; };
	get y(): number { return this.mesh.position.z; };
	get h(): number { return this.mesh.position.y; };
	
	get mx(): number { return this.mesh.position.x; };
	get my(): number { return this.mesh.position.y; };
	get mz(): number { return this.mesh.position.z; };
	
	size: number;
	mesh: BABYLON.Mesh;
	
	constructor(mesh,size) {
		this.mesh = mesh;
		this.size = size;
	}
	
	change(action : (mesh) => void) {
	
		action && action(this.mesh);
		
	}
	
	translate(vect : Array<number>) {
		var dx = vect[0];
		var dy = vect[1];
		
		this.mesh.position.x += dx;
		this.mesh.position.z += dy;		
	}
}

class EatManager {

	logBuffer: Array<string> = [];
	
	foodList: Array<ObjectPosition> = [];
	eaterList: Array<ObjectPosition> = [];
	
	registerEater(eater) {
		eater.size = eater.size || 0;
		this.eaterList.push(eater);		
		this.register(eater);
	}
	
	register(food) {
		food.size = food.size || 0;
		this.foodList.push(food);
	}
	
	check() {
			
		this.eaterList.forEach(eater => {
			this.foodList.forEach(food => {
				
				var fastCheck = this.checkAABB(eater, food);
				this.logBuffer.push('check: fastCheck ' + eater.name + ', ' + food.name);
				
				if( fastCheck ) {					
					var exactCheck = this.checkDistance(eater, food);
					
					if( exactCheck ) {
						if( eater !== food ) {
							eater.oncollision && eater.oncollision(food);
							food.oncollision && food.oncollision(eater);
						}  
					}
				}					

			});						
		});
	}
	
	checkAABB(obj1: ObjectPosition, obj2: ObjectPosition) {
		var distance = obj1.size + obj2.size;
		
		return ((Math.abs(obj1.x - obj2.x) <= distance) && 
			(Math.abs(obj1.y - obj2.y) <= distance)); 
	}
	
	checkDistance(obj1: ObjectPosition, obj2: ObjectPosition) {
		var distanceSquared = (obj1.size + obj2.size)*(obj1.size + obj2.size);
		
		return ((obj1.x - obj2.x)*(obj1.x - obj2.x) +
			(obj1.y - obj2.y)*(obj1.y - obj2.y)) <= distanceSquared;
	}
}