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
	x: number;
	y: number;
	h: number;
	size: number;
	mesh: BABYLON.Mesh;
	
	constructor(mesh) {
		this.mesh = mesh;
	}
	
	change(action : (mesh) => void) {
	
		action && action(this.mesh);
		
	}
}

class EatManager {
	
	foodList: Array<ObjectPosition> = [];
	eaterList: Array<ObjectPosition> = [];
	
	registerEater(eater) {
		this.eaterList.push(eater);		
		this.register(eater);
	}
	
	register(food) {
		this.foodList.push(food);
	}
	
	check() {
			
		this.eaterList.forEach(eater => {
			this.foodList.forEach(food => {
				
				var fastCheck = this.checkAABB(eater, food);
				
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