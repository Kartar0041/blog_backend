class PriorityQueue<T> {
  private heap: { item: T; priority: number }[] = [];

  enqueue(item: T, priority: number) {
    this.heap.push({ item, priority });
    this.heap.sort((a, b) => a.priority - b.priority);
  }
  dequeue(): T | null {
    return this.heap.length ? this.heap.shift()?.item || null : null;
  }
  isEmpty(): boolean {
    return this.heap.length === 0;
  }
}

export default PriorityQueue;
