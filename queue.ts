export class Queue {
    public count: number;
    // 第一个元素的键
    public lowestCount: number;
    // 使用对象存储在获取元素时更高效
    public items: object;

    constructor() {
        this.count = 0;
        this.lowestCount = 0;
        this.items = new Object();
    }

    public enqueue(element: any) {
        // 使用 count 做键
        this.items[this.count] = element;
        this.count++;
    }

    public isEmpty() {
        return this.count === this.lowestCount;
    }

    public size() {
        return this.count - this.lowestCount;
    }

    public dequeue() {
        if(this.isEmpty()) {
            return null;
        }
        let res = this.items[this.lowestCount];
        delete this.items[this.lowestCount];
        this.lowestCount++;
        return res;
    }

    public peek() {
        if(this.isEmpty()) {
            return null;
        }
        return this.items[this.lowestCount];
    }

    public clear() {
        this.items = new Object();
        this.count = 0;
        this.lowestCount = 0;
    }

    public toString() {
        if(this.isEmpty()) {
            return '';
        }
        
        let res = `${this.items[this.lowestCount]}`;
        for(let i = this.lowestCount + 1; i < this.count; i++) {
            res = `${res}, ${this.items[i]}`;
        }

        return res;
    }
}