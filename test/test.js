/// <reference path="../ts/path.ts" />

var assert = chai.assert;

describe('array', function() {
	describe('#indexof()', function() {
		it('should return -1', function() {
			assert.equal(-1, [1,2,3].indexOf(5));
		})		
	})
});

describe('paths', function() {
	it('add [2,1,0] in order', function() {
		var path = new Path(-1);
		var seg = new PathSegment(2);
		path.addHead(seg);
		path.addHead(new PathSegment(1));
		path.addHead(new PathSegment(0));
		
		var patharr = [];
		
		var last = path.pop();
		while( last != null ) {
			patharr.push(last.value);
			last = last.popNext();
		}
		
		assert.equal( '2,1,0,-1' , patharr.join(',') );	
		
		assert.equal( 4, path.size() )	
	});
});

describe('eat', function() {
	
	var obj1 = { name: 'obj1', x: 0, y:0, size: 1};
	var obj2 = { name: 'obj2',x: 0, y:0.5, size: 1};
	var obj3 = { name: 'obj3',x: 1.8, y:1.8, size: 1};
	var obj4 = { name: 'obj4',x: 4, y:0.5, size: 1};

	it('check AABB', function() {

		var eat = new EatManager();
		
		assert.isTrue(eat.checkAABB(obj1, obj1));
		assert.isTrue(eat.checkAABB(obj2, obj1));
		assert.isTrue(eat.checkAABB(obj3, obj1));
		
		// FALSE
		assert.isFalse(eat.checkAABB(obj4, obj1));				
	});
	
	it('check distance', function() {

		var eat = new EatManager();
		
		assert.isTrue(eat.checkDistance(obj1, obj1));
		assert.isTrue(eat.checkDistance(obj2, obj1));
		
		// FALSE
		assert.isFalse(eat.checkDistance(obj3, obj1));
		assert.isFalse(eat.checkDistance(obj4, obj1));
				
	});
	
	it('single check collision ', function() {
		
		var eatManager = new EatManager();
		var count = 0;
		
		var objEater = { name: 'eater', x:0, y:0, size: 1, oncollision: function(f) {			
			count++;	
		}};
		
		eatManager.registerEater(objEater);
		eatManager.register(obj1);
		eatManager.register(obj2);
		eatManager.register(obj3);
		eatManager.register(obj4);
		eatManager.check();
		
		assert.equal(count, 2); // obj1 + obj2
	});
	
	it('multiple eaters, check collision ', function() {
		
		var eatManager = new EatManager();
		var count = 0;
		
		var objEaters = [{ name: 'eater', x:0, y:0, size: 1, oncollision: function(f) {			
			count++;	
			}},
				{ name: 'eater2', x:4, y:0, size: 1, oncollision: function(f) {			
					console.log('eater++');
					count++;	
				}}
		];
		
		eatManager.registerEater(objEaters[0]);
		eatManager.registerEater(objEaters[1]);
		eatManager.register(obj1);
		eatManager.register(obj2);
		eatManager.register(obj3);
		eatManager.register(obj4);
		eatManager.check();
		
		assert.equal(count, 3); // obj1 + obj2
	});
	
	
	it('only eaters, check collision ', function() {
		
		var eatManager = new EatManager();
		var count1 = 0;
		var count2 = 0;
		
		var objEaters = [{ name: 'eater', x:0, y:0, size: 1, oncollision: function(f) {			
			count1++;	
			}},
				{ name: 'eater2', x:1, y:0, size: 1, oncollision: function(f) {			
					count2++;	
				}}
		];
		
		eatManager.registerEater(objEaters[0]);
		eatManager.registerEater(objEaters[1]);
		eatManager.check();
		
		assert.equal(count1, 2); // obj1 + obj2 (as eaters)
		assert.equal(count2, 2); // obj1 + obj2 (as food)
		
	});
});