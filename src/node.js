class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (!this.left) {
			this.left = node;
			node.parent = this;
		} else if (!this.right) {
			this.right = node;
			node.parent = this;
		}
		return this;
	}

	removeChild(node) {
		if ((this.left.data === node.data) && (this.left.priority === node.priority)) {
			node.parent = null;
			this.left = null;
		} else if ((this.right.data === node.data) && (this.right.priority === node.priority)) {
			node.parent = null;
			this.right = null;
		} else {
			throw new Error();
		}
		return this;
	}

	remove() {
		if (this.parent) {
			this.parent.removeChild(this);
		}
		return this;
	}

	swapWithParent() {
		if (this.parent) {
			let parent = this.parent;
			let leftOfChild = this.left ? this.left : null;
			let rightOfChild = this.right ? this.right : null;
			this.parent = parent.parent;

			if (parent.left == this) {
				this.left = parent;
				this.right = parent.right;
				if (this.right) this.right.parent = this;
			} else if (parent.right == this) {
				this.left = parent.left;
				this.right = parent;
				this.left.parent = this.left ? this : this.left.parent;
			}
			if (this.parent) {
				this.parent.left = this.parent.left == parent ? this : this.parent.left;
				this.parent.right = this.parent.right == parent ? this : this.parent.right;
			}
			if (leftOfChild) leftOfChild.parent = parent;
			if (rightOfChild) rightOfChild.parent = parent;

			parent.parent = this;
			parent.left = leftOfChild;
			parent.right = rightOfChild;
		}
	}
}

module.exports = Node;