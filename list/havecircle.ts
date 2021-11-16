import { LinkedList, Node } from "./linkedlist";

// 判断单链表是否有环，若有环则返回第一个入环节点
export class HaveCircle {

    // 使用额外辅助空间
    public static havecircle1(linkedList: LinkedList) {
        let node = linkedList.getHeadNode();
        let arr: Node[] = new Array();

        // 若链表无环则必定遇到 null 值
        while(node != null) {
            if(arr.includes(node)) {
                return node;
            }
            arr.push(node);
            node = node.next;
        }

        return null;
    }

    // 使用快慢指针
    // 一开始快指针走两步，慢指针走一步，若无环快指针必走到 null，若有环快慢指针必在两圈内相遇
    // 在快慢指针相遇时，让快指针回到第一个节点，此后，快慢指针都一次走一步，二者再次相遇的节点即为第一个入环节点
    public static havecircle2(linkedList: LinkedList) {
        let node = linkedList.getHeadNode();
        let s = node.next;
        let f = node.next.next;

        while(true){
            // 有环
            if(s === f) {
                break;
            }
            // 无环
            if(f == null) {
                return null;
            }
            s = s.next;
            f = f.next ? f.next.next : null;
        }

        f = node;
        while(f != s) {
            f = f.next;
            s = s.next;
        }

        return f;
    }
}

// let linkedList = new LinkedList();
// linkedList.push(9);
// linkedList.push(8);
// linkedList.push(2);
// linkedList.push(6);
// linkedList.push(3);
// linkedList.push(5);
// linkedList.push(1);

// linkedList.getElementAt(6).next = linkedList.getElementAt(3);
// console.log(HaveCircle.havecircle1(linkedList));
