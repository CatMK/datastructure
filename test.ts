import { Queue } from "./queue";

let queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.enqueue(4);
queue.enqueue(5);
queue.enqueue(6);
queue.enqueue(7);
console.log(queue.toString());
console.log(queue.dequeue());
console.log(queue.toString());

