// Priority queue implementation
class PriorityQueue {
    constructor(comparator) {
        this.heap = [];
        this.comparator = comparator;
    }

    size() {
        return this.heap.length;
    }

    isEmpty() {
        return this.size() === 0;
    }

    enqueue(value) {
        this.heap.push(value);
        this.heapifyUp();
    }

    dequeue() {
        const root = this.heap[0];
        const last = this.heap.pop();
        if (!this.isEmpty()) {
            this.heap[0] = last;
            this.heapifyDown();
        }
        return root;
    }

    heapifyUp() {
        let index = this.size() - 1;
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.comparator(this.heap[index], this.heap[parentIndex]) < 0) {
                break;
            }
            this.swap(index, parentIndex);
            index = parentIndex;
        }
    }

    heapifyDown() {
        let index = 0;
        while (this.hasLeftChild(index)) {
            let largerChildIndex = this.getLeftChildIndex(index);
            if (this.hasRightChild(index) && this.comparator(this.heap[this.getRightChildIndex(index)], this.heap[largerChildIndex]) > 0) {
                largerChildIndex = this.getRightChildIndex(index);
            }
            if (this.comparator(this.heap[index], this.heap[largerChildIndex]) > 0) {
                break;
            }
            this.swap(index, largerChildIndex);
            index = largerChildIndex;
        }
    }

    swap(i, j) {
        const temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }

    getLeftChildIndex(parentIndex) {
        return 2 * parentIndex + 1;
    }

    getRightChildIndex(parentIndex) {
        return 2 * parentIndex + 2;
    }

    hasLeftChild(parentIndex) {
        return this.getLeftChildIndex(parentIndex) < this.size();
    }

    hasRightChild(parentIndex) {
        return this.getRightChildIndex(parentIndex) < this.size();
    }
}