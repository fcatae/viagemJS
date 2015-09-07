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

