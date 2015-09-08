class PlayerPath {
	path: Path = new Path(null);
	total_distance: number = 0;
	last_position: BABYLON.Vector3;
	isSync: boolean = true;
	delta_distance: number = 1;
	
	init(position) {
		this.isSync = true;
		this.last_position = position;	
	}
	
	add(position) {
		
		if( this.isSync && this.last_position ) {
			
			var distance = BABYLON.Vector3.Distance(position, this.last_position);
			this.total_distance += distance;
			
			if( this.total_distance > this.delta_distance ) {		
				this.addSegment(position);
				this.total_distance -= this.delta_distance;
				console.log('PlayerPath: add-segment-position');
			}

		}
		
		this.last_position = position;
	}
	
	addSegment(position) {
		this.path.addHead(new PathSegment(position));
	}
	
	followstep() {
		var stepSegment = this.path.popValue();
		
		return stepSegment;
	}
}

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

	popValue() {
		var value = null;
		var segment = <PathSegment>this.tail.prev;
		
		if( segment != this.head && this.tail.prev) {
			value =  segment.value;
			segment.remove();	
		}	
		
		return value;
	}
	
	pop() {

		return this.tail.prev;
		
	}
	
	size() {
		
		var count = 0;
		var current = this.pop();
		
		while(current != null) {
			current = current.popNext();
			count++;
		}
		
		return count;
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
	
	remove() {
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