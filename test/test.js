var assert = require('assert');

describe('array', function() {
	describe('#indexof()', function() {
		it('should return -1', function() {
			assert.equal(-1, [1,2,3].indexOf(5));
		})		
	})
})