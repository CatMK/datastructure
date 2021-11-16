export class NodeWithRand {
    public element: any;
    public next: NodeWithRand;
    // 每个节点的 rand 可能指向链表中的任何一个节点，也可能指向 null
    public rand: NodeWithRand;

    constructor(element?: any) {
        this.element = element || null;
        this.next = null;
        this.rand = null;
    }
}
export class ListWithRand {
    public count: number;
    // 头指针，指向第一个元素之前
    private head: NodeWithRand;

    constructor() {
        this.count = 0;
        this.head = new NodeWithRand();
    }
    // 获取头节点
    public getHeadNode() {
        if (this.size() > 0) {
            return this.head.next;
        }
        return this.head;
    }

    // 链表元素个数
    public size() {
        return this.count;
    }

    // 向链表尾部添加元素
    public push(element: any, randIndex: number) {
        let node: NodeWithRand = {
            element: element,
            next: null,
            rand: this.getElementAt(randIndex)
        }
        if (this.head.next == null) { // 若只有头节点
            this.head.next = node;
        } else {
            let current: NodeWithRand = this.head.next;
            while (current.next != null) {
                current = current.next;
            }
            current.next = node;
        }
        this.count++;
    }

    // 返回目标位置节点
    public getElementAt(index: number) {
        if (index < 0 || index >= this.count) {
            return null;
        }
        let current: NodeWithRand = this.head.next;
        let i = 0;
        while (i < index) {
            current = current.next;
            i++;
        }
        return current;
    }
}

// 给定一个由 NodeWithRand 节点类型组成的无环单链表，完成这个链表的复制，并返回新链表
// 借助 map 完成
function copylistwithrand1(listWithRand: ListWithRand): ListWithRand {
    let resList = new ListWithRand();
    let nodeMap: Map<NodeWithRand, NodeWithRand> = new Map();
    let node = listWithRand.getHeadNode();

    // 将原链表的每一个节点做键，复制的新节点（element 与键节点相同，next 和 rand 为空）做值存入 map
    // 主要作用是将每对节点对应，以及将克隆节点的地址确定
    while (node != null) {
        let copyNode = new NodeWithRand(node.element);
        nodeMap.set(node, copyNode);
        node = node.next;
    }

    node = listWithRand.getHeadNode();
    let resListNode = resList.getHeadNode();
    // 克隆节点间有对应关系就可以很方便找出新节点的 next 和 rand 指向
    while (node != null) {
        resListNode.next = nodeMap.get(node);
        resListNode.next.next = nodeMap.get(node.next);
        resListNode.next.rand = nodeMap.get(node.rand);
        resList.count++;
        resListNode = resListNode.next;
        node = node.next;
    }
    return resList;
}

// 不使用额外空间完成
function copylistwithrand2(listWithRand: ListWithRand): ListWithRand{
    let resList = new ListWithRand();
    let node = listWithRand.getHeadNode();

    // 将每个节点的克隆节点（rand 为空）接在原节点之后
    while(node != null){
        // 这里拼接 ' 仅作标识
        let copyNode = new NodeWithRand(node.element + '\'');
        copyNode.next = node.next;
        node.next = copyNode;
        node = copyNode.next;
    }

    node = listWithRand.getHeadNode();
    let copyNode = node.next;
    // 为克隆节点设置 rand 指针
    while(node != null) {
        copyNode.rand = node.rand ? node.rand.next : null;
        node = copyNode.next;
        copyNode = node ? node.next : null;
    }
    // 将链表分割为原链表和克隆链表
    node = listWithRand.getHeadNode();
    copyNode = node.next;
    let resListNode = resList.getHeadNode();
    while(node != null){
        let nextNode = node.next.next;
        resListNode.next = copyNode;
        node.next = copyNode.next;

        resList.count++;

        node = nextNode;
        copyNode = node ? node.next : null;
        resListNode = resListNode.next;
    }
    return resList;
}

let listWithRand = new ListWithRand();
listWithRand.push(1, -1);
listWithRand.push(2, -1);
listWithRand.push(3, -1);
listWithRand.push(4, 2);
listWithRand.push(5, -1);
listWithRand.push(6, -1);
listWithRand.push(7, 5);
listWithRand.getElementAt(0).rand = listWithRand.getElementAt(1);
let listWithRand1 = copylistwithrand2(listWithRand);

console.log(listWithRand.getElementAt(3));
console.log(listWithRand1.getElementAt(0));
console.log(listWithRand1.getElementAt(3));
console.log(listWithRand1.getElementAt(6));
