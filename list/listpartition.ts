import { LinkedList, Node } from "./linkedlist";

class ListPartition {
    // 将单向链表按某值划分为左边小、中间相等、右边大的形式
    // 将链表中的元素先存到数组中，对数组进行 partition 后，再将数组元素 push 回链表
    public partition1(linkedList: LinkedList, element: number){
        let node = linkedList.getHeadNode();
        let arr: Node[] = new Array();
        while(node != null) {
            arr.push(node);
            node = node.next;
        }

        let lIndex = -1;
        let rIndex = arr.length;
        let index = 0;
        while(index < rIndex) {
            if(arr[index].element < element) {
                lIndex++;
                [arr[index], arr[lIndex]] = [arr[lIndex], arr[index]];
                index++;
            }else if(arr[index].element === element){
                index++;
            }else {
                rIndex--;
                [arr[index], arr[rIndex]] = [arr[rIndex], arr[index]];
            }
        }

        linkedList.clear();
        for(let n of arr){
            linkedList.push(n.element);
        }
    }

    // 不使用额外空间，为三部分区域分别设置两个指针，最后将三部分头尾指针连接
    public partition2(linkedList: LinkedList, element: number){
        if(linkedList.size() === 0) {
            return;
        }
        let sHead: Node = null;
        let sTail: Node = null;

        let eHead: Node = null;
        let eTail: Node = null;

        let bHead: Node = null;
        let bTail: Node = null;

        let node = linkedList.getHeadNode();
        // 将节点分为三部分
        while(node != null) {
            if(node.element < element){
                if(sHead == null){
                    sHead = node;
                }else{
                    sTail.next = node;
                }
                sTail = node;
            }else if(node.element === element){
                if(eHead == null){
                    eHead = node;
                }else{
                    eTail.next = node;
                }
                eTail = node;
            }else {
                if(bHead == null){
                    bHead = node;
                }else{
                    bTail.next = node;
                }
                bTail = node;
            }
            node = node.next;
        }

        // 合并三部分节点前，需要考虑为空的情况，例如链表中只有比临界值大的元素
        if(sHead != null) {
            linkedList.getHead().next = sHead;
            if(eHead != null) {
                sTail.next = eHead;
                eTail.next = bHead;
            }else {
                sTail.next = bHead;
            }
            if(bTail != null) {
                bTail.next = null;
            }
        }else {
            if(eHead != null) {
                linkedList.getHead().next = eHead;
                eTail.next = bHead;
                if(bTail != null) {
                    bTail.next = null;
                }
            }else {
                linkedList.getHead().next = bHead;
                bTail.next = null;
            }
        }
    }
}

let linkedList = new LinkedList();
linkedList.push(64);
linkedList.push(7);
linkedList.push(8);
linkedList.push(92);
linkedList.push(9);
linkedList.push(78);
linkedList.push(98);

let listPartition = new ListPartition();
listPartition.partition2(linkedList, 6);
console.log(linkedList.toString());

