const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.heapSize = 0;
	}

	push(data, priority) {
		const newNode = new Node(data, priority)
		this.heapSize++
		this.insertNode(newNode);
		this.shiftNodeUp(newNode);

	}

	pop() {
		if (!this.isEmpty()) {
			const detachedRoot = this.detachRoot();
			this.restoreRootFromLastInsertedNode(detachedRoot);
			this.shiftNodeDown(this.root);
			return detachedRoot.data;
		}
	}

	detachRoot() {
		const detachedRoot = this.root;
		if (this.parentNodes.includes(this.root)) this.parentNodes.shift();
		this.root = null;
		this.heapSize--;
		return detachedRoot;
	}

	restoreRootFromLastInsertedNode(detached) {
		if (!this.isEmpty()) {
			this.root = this.parentNodes.pop();
			if (this.root.parent) {
				if (this.root.parent !== detached && this.root.parent.right === this.root) this.parentNodes.unshift(this.root.parent);
				this.root.remove();
				if (detached.left !== this.root && detached.left) this.root.appendChild(detached.left);
				if (detached.right !== this.root && detached.right) this.root.appendChild(detached.right);
				if (!this.root.right) this.parentNodes.unshift(this.root);
			}
		}
	}

	size() {
		return this.heapSize;
	}

	isEmpty() {
		return this.root === null && this.parentNodes.length === 0;
	}

	clear() {
		this.heapSize = 0;
		this.parentNodes = [];
		this.root = null;
	}

	insertNode(node) {
		if (!this.root) {
			this.root = node;
			this.parentNodes.push(node);
		} else {
			let nodeParent = this.parentNodes[0];
			if (nodeParent.left) this.parentNodes.shift()
			this.parentNodes.push(node)
			nodeParent.appendChild(node)
		}
	}

	shiftNodeUp(node) {
		if (node.parent && node.priority > node.parent.priority) {
			const nodeIndex = this.parentNodes.findIndex(item => item === node);
			const parentIndex = this.parentNodes.findIndex(item => item === node.parent);
			if (~nodeIndex) {
				if (~parentIndex) this.parentNodes[parentIndex] = node;
				this.parentNodes[nodeIndex] = node.parent;
			}
			node.swapWithParent();
			this.shiftNodeUp(node)
		}
		if (!node.parent) this.root = node;
	}

	shiftNodeDown(node) {
		if (!this.isEmpty()) {
			let childToSwap;
			if (node.left && node.right) {
				childToSwap = node.left.priority > node.right.priority ? node.left : node.right;
			} else {
				childToSwap = node.left;
			}

			if (childToSwap && node.priority < childToSwap.priority) {
				const nodeIndex = this.parentNodes.findIndex(item => item === node);
				const childIndex = this.parentNodes.findIndex(item => item === childToSwap);
				if (node === this.root) this.root = childToSwap;
				if (~childIndex) {
					if (~nodeIndex) this.parentNodes[nodeIndex] = this.parentNodes[childIndex];
					this.parentNodes[childIndex] = node;
				}
				childToSwap.swapWithParent();
				this.shiftNodeDown(node);
			}
		}
	}
}

module.exports = MaxHeap;