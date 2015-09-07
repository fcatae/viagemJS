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
	it('add', function() {
		var path = new Path();
		var seg = new PathSegment(0);
		path.addHead(seg);
		path.addHead(new PathSegment(1));
		path.addHead(new PathSegment(2));		
	});
});

