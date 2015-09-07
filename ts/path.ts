class Path {
	
	head: PathSegment = null;
	tail: PathSegment = null;	
	
	addHead(segment: PathSegment) {
		
		if( this.head ) {
			var firstSegment = this.head;
			segment.insertBefore(firstSegment);
		}
		else {
			this.head = this.tail = segment;
		}
	}
	
	push(segment: PathSegment) {
		
		if( this.tail ) {
			var lastSegment = this.tail;
			segment.insertAfter(lastSegment);
			this.tail = segment;
		} 
		else {
			this.head = this.tail = segment;
		}		
	}

}

class PathSegment {
	prev: PathSegment = null;
	next: PathSegment = null;
	value: any;
	
	constructor(value: any) {
		this.value = value;
	}

	insertBefore(nextPath: PathSegment) {
		var prevPath = nextPath.prev;
		 
		prevPath && (prevPath.next = this);
		this.next = nextPath;		
		
		nextPath.prev = this;
		this.prev = prevPath;
	}
		
	insertAfter(prevPath: PathSegment) {
		var nextPath = prevPath.next;
		 
		prevPath.next = this;
		this.next = nextPath;		
		
		nextPath && (nextPath.prev = this);
		this.prev = prevPath;
	}
	
	remote() {
		var prevPath = this.prev;
		var nextPath = this.next;
		
		prevPath && (prevPath.next = nextPath);
		nextPath && (nextPath.prev = prevPath);
		
		this.prev = this.next = null;
	}
	
	popNext() {
		return this.prev;
	}
}