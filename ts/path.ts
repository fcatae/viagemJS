class Path {
	
	head: PathSegment = null;
	tail: PathSegment = null;
	
	constructor() {
		var currentPath = new PathSegment(0);
		
		this.head = this.tail = currentPath;			
	}
	
	append(segment: PathSegment) {
		
		var lastSegment = this.tail;
		segment.insertAfter(lastSegment);

		this.tail = segment;
	}

}

class PathSegment {
	prev: PathSegment = null;
	next: PathSegment = null;
	value: any;
	
	constructor(value: any) {
		this.value = value;
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
}