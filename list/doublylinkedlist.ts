export class DoublyNode {
    public previous: DoublyNode;
    public element: any;
    public next: DoublyNode;

    constructor(element?: any) {
        this.element = element || null;
        this.next = null;
        this.previous = null;
    }
}

export class DoublyLinkedList {
    private count: number;
    // 头指针，指向第一个元素之前
    private head: DoublyNode;
    // 尾指针，指向最后一个元素
    private tail: DoublyNode;

    constructor() {
        this.count = 0;
        this.head = new DoublyNode();
        this.tail = new DoublyNode();
    }

    // 在特定位置插入新元素
    public insert(element: any, index: number) {
        if (index < 0 || index > this.count) {
            return false;
        }
        let previous: DoublyNode;
        let current: DoublyNode;
        let node = new DoublyNode(element);
        if (index === 0) {
            previous = this.head;
            current = previous.next;
            if (current == null) {
                previous.next = node;
                node.previous = previous;
                node.next = current;
                this.tail = node;
            } else {
                previous.next = node;
                node.previous = previous;
                node.next = current;
                current.previous = node;
            }
        } else if (index === this.count) {
            previous = this.getElementAt(index - 1);
            current = previous.next;
            previous.next = node;
            node.previous = previous;
            node.next = current;
            this.tail = node;
        } else {
            previous = this.getElementAt(index - 1);
            current = previous.next;
            previous.next = node;
            node.previous = previous;
            node.next = current;
            current.previous = node;
        }
        this.count++;
        return true;
    }

    // 在特定位置移除元素
    public removeAt(index: number) {
        if(index < 0 || index >= this.count) {
            return undefined;
        }
        let previous: DoublyNode;
        let current: DoublyNode;
        if(index === 0){
            previous = this.head;
            current = previous.next;
            previous.next = current.next;
            if(this.count === 1) {
                this.tail = undefined;
            }else{
                current.next.previous = current.previous;
            }
        }else if(index === this.count-1) {
            current = this.tail;
            previous = current.previous;
            previous.next = current.next;
            this.tail = previous;
        }else {
            previous = this.getElementAt(index - 1);
            current = previous.next;
            previous.next = current.next;
            current.next.previous = current.previous;
        }
        this.count--;
        return current.element;
    }

    // 迭代链表到目标位置节点
    public getElementAt(index: number) {
        if (index < 0 || index >= this.count) {
            return;
        }
        let current: DoublyNode = this.head.next;
        let i = 0;
        while (i < index) {
            current = current.next;
            i++;
        }
        return current;
    }

    // 获取头节点
    public getHeadNode() {
        return this.head.next;
    }

    // 把链表中的对象转换成字符串返回
    public toString() {
        let current = this.getHeadNode();
        if (current == null) {
            return '';
        }
        let resStr = `${current.element}`;
        current = current.next;
        while (current != null) {
            resStr = `${resStr}, ${current.element}`;
            current = current.next;
        }
        return resStr;
    }
}