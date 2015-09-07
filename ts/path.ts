class Path {
	
	head: PathSegment = null;
	tail: PathSegment = null;	
	
	constructor(value) {
		this.head = new PathSegment(value);
		this.tail = new PathSegment(value);
		
		this.head.next = this.tail;
		this.tail.prev = this.head;
	}
	
	addHead(segment: PathSegment) {
		
		segment.insertAfter( this.head );
	}
	
	push(segment: PathSegment) {

		segment.insertBefore( this.tail );
				
	}

	pop() {
		
		return this.tail.prev;
		
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