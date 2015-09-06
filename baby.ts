/// <reference path="babylon.2.1.debug.js" />

var c;

class BabyJS {
	engine: any;
		
	static init(canvas) {
		canvas = canvas || document.querySelector('canvas');
		engine = new BABYLON.Engine(canvas);	
	}
}

class Shadow {
	init() {
		
	}
	
	hello() {
		console.log('hello');	
	}
}