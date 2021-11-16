export class Node {
    public element: any;
    public next: Node;

    constructor(element?: any) {
        this.element = element || null;
        this.next = null;
    }
}

export class LinkedList {
    private count: number;
    // 头指针，指向第一个元素之前
    private head: Node;

    constructor() {
        this.count = 0;
        this.head = new Node();
    }

    // 向链表尾部添加元素
    public push(element: any) {
        let node: Node = {
            element: element,
            next: null
        }
        if (this.head.next == null) { // 若只有头节点
            this.head.next = node;
        } else {
            let current: Node = this.head.next;
            while (current.next != null) {
                current = current.next;
            }
            current.next = node;
        }
        this.count++;
    }

    // 在特定位置插入元素
    public insert(element: any, index: number) {
        if (index < 0 || index > this.count) {
            return false;
        }
        let node = new Node(element);
        let previous = this.head;
        let current = previous.next;
        if (index > 0) {
            previous = this.getElementAt(index - 1);
            current = previous.next;
        }
        previous.next = node;
        node.next = current;
        this.count++;

        return true;
    }

    // 移除链表特定位置的元素
    public removeAt(index: number) {
        if (index < 0 || index >= this.count) {
            return;
        }

        let previous: Node = this.head;
        let current: Node = this.head.next;
        if (index > 0) {
            previous = this.getElementAt(index - 1);
            current = previous.next;
        }

        // 当前节点会被丢弃在内存中，等待 JS 垃圾回收器回收
        previous.next = current.next;
        this.count--;
        return current.element;
    }

    // 移除指定元素（有多个相同元素移除第一个）
    public remove(element: any){
        let index = this.indexOf(element);
        return this.removeAt(index);
    }

    // 返回目标位置节点
    public getElementAt(index: number) {
        if (index < 0 || index >= this.count) {
            return;
        }
        let current: Node = this.head.next;
        let i = 0;
        while (i < index) {
            current = current.next;
            i++;
        }
        return current;
    }

    // 返回一个元素的位置（有多个相同元素返回第一个位置）
    public indexOf(element: any){
        let current = this.head.next;
        for(let i = 0; i < this.count-1; i++){
            if(current.element === element){
                return i;
            }
            current = current.next;
        }
        return -1 ;
    }

    // 链表元素个数
    public size() {
        return this.count;
    }

    public setSize(count: number) {
        this.count = count;
    }

    // 链表是否为空
    public isEmpty() {
        return this.count === 0;
    }

    // 获取头节点
    public getHeadNode() {
        if(this.size() > 0){
            return this.head.next;
        }
        return this.head;
    }

    // 获取头指针
    public getHead() {
        return this.head;
    }

    // 把链表中的对象转换成字符串返回
    public toString() {
        let current = this.getHeadNode();
        if(current == null) {
            return '';
        }
        let resStr = `${current.element}`;
        current = current.next;
        while(current != null){
            resStr = `${resStr}, ${current.element}`;
            current = current.next;
        }
        return resStr;
    }

    // 将链表元素逆序
    public reverse() {
        let lNode = this.getHeadNode();
        let mNode = lNode.next;
        let rNode = mNode.next;
        lNode.next = null;
        
        while(rNode != null){
            mNode.next = lNode;
            lNode = mNode;
            mNode = rNode;
            rNode = rNode.next;
        }
        mNode.next = lNode;
        this.head.next = mNode;
    }

    // 清空链表
    public clear() {
        while(this.size() > 0){
            this.removeAt(0);
        }
        this.head.next = null;
    }
}