import { HaveCircle } from "./havecircle";
import { LinkedList } from "./linkedlist";

// 给定两个可能有环也可能无环的单链表，若两链表相交返回第一个相交的节点，若不相交返回 null
class FindFirstIntersect {

    // 两链表均无环
    public static noloop(linkedList1: LinkedList, linkedList2: LinkedList) {
        let node1 = linkedList1.getHeadNode();
        let node2 = linkedList2.getHeadNode();

        let end1 = linkedList1.getElementAt(linkedList1.size() - 1);
        let end2 = linkedList2.getElementAt(linkedList2.size() - 1);

        // 若两链表相交，则最后一个节点一定是同一个
        if (end1 !== end2) {
            return null;
        }

        // 长链表节点
        let cur1 = linkedList1.size() > linkedList2.size() ? node1 : node2;
        // 短链表节点
        let cur2 = cur1 === node1 ? node2 : node1;
        // 长链表先走两链表的长度差值
        let i = Math.abs(linkedList1.size() - linkedList2.size());
        while (i > 0) {
            cur1 = cur1.next;
            i--;
        }

        // 走到相等元素
        while (cur1 !== cur2) {
            cur1 = cur1.next;
            cur2 = cur2.next;
        }

        return cur1;
    }

    // 两链表均有环
    public static bothloop(linkedList1: LinkedList, linkedList2: LinkedList) {
        let loop1 = HaveCircle.havecircle2(linkedList1);
        let loop2 = HaveCircle.havecircle2(linkedList2);

        if (loop1 === loop2) {
            // 1. 两链表的入环节点相同，则将两链表看作以入环节点作为终止节点的无环链表
            return this.noloop(linkedList1, linkedList2);
        } else {
            let node = loop1.next;
            while (node !== loop1) {
                if (node === loop2) {
                    // 2. 两链表的入环节点不同，返回两入环节点之一即可
                    return loop2;
                }
                node = node.next;
            }
            return null;
        }
    }

    // 主方法
    public static getIntersectNode(linkedList1: LinkedList, linkedList2: LinkedList) {
        let loop1 = HaveCircle.havecircle2(linkedList1);
        let loop2 = HaveCircle.havecircle2(linkedList2);

        if (loop1 == null && loop2 == null) {
            return this.noloop(linkedList1, linkedList2);
        } else if (loop1 != null && loop2 != null) {
            return this.bothloop(linkedList1, linkedList2);
        }
        return null;
    }

    // test
    public static test() {
        let linkedList1 = new LinkedList();
        linkedList1.push(9);
        linkedList1.push(8);
        linkedList1.push(2);
        linkedList1.push(6);
        linkedList1.push(3);
        linkedList1.push(5);
        linkedList1.push(1);

        let linkedList2 = new LinkedList();
        linkedList2.push(9);
        linkedList2.push(8);
        linkedList2.push(11);
        linkedList2.push(6);
        linkedList2.push(3);
        linkedList2.push(5);
        linkedList2.push(1);

        linkedList1.getElementAt(6).next = linkedList1.getElementAt(3);
        linkedList2.getElementAt(6).next = linkedList1.getElementAt(1);
        linkedList2.setSize(linkedList2.size() + 6);

        console.log(FindFirstIntersect.getIntersectNode(linkedList1, linkedList2));
    }
}

FindFirstIntersect.test();
