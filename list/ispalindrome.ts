import { Stack } from "../stack";
import { LinkedList, Node } from "./linkedlist";

class IsPalindrome {

    // 使用栈判断链表是否是回文结构，在不考虑空间复杂度的情况下可用
    public ispalindrome1(linkedList: LinkedList): boolean {
        let stack: Stack = new Stack();
        let node: Node = linkedList.getHeadNode();
        // 将链表元素全部入栈
        while (node !== null) {
            stack.push(node);
            node = node.next;
        }
        node = linkedList.getHeadNode();
        // 将栈元素依次出栈与链表元素进行比对
        while (node !== null) {
            let element = stack.pop().element;
            if (node.element !== element) {
                return false;
            }
            node = node.next;
        }
        return true;
    }

    // 使用快慢指针，只将链表后半部分进栈，会略微节省空间
    public ispalindrome2(linkedList: LinkedList): boolean {
        let stack = new Stack();
        let node = linkedList.getHeadNode();
        let s: Node = node;
        let f: Node = node;

        if (linkedList.size() % 2 === 0) {
            while (f != null) {
                s = s.next;
                f = f.next.next;
            }
        } else {
            while (f.next != null) {
                s = s.next;
                f = f.next.next;
            }
            s = s.next;
        }

        while (s != null) {
            stack.push(s);
            s = s.next;
        }

        while (!stack.isEmpty()) {
            let element = stack.pop().element;
            if (element !== node.element) {
                return false;
            }
            node = node.next;
        }

        return true;
    }

    // 使用快慢指针，将链表后半部分逆序，记录链表第一个和最后一个元素，双向遍历比较
    public ispalindrome3(linkedList: LinkedList): boolean {
        let res = true;
        if (linkedList.size() === 1) {
            return res;
        }
        // 获取第一个节点和最后一个节点
        let hNode = linkedList.getHeadNode();
        let tNode = linkedList.getElementAt(linkedList.size() - 1);
        // 设置快慢指针
        let s: Node = hNode;
        let f: Node = hNode;

        if (linkedList.size() % 2 === 0) { // 偶数节点数，慢指针停在前半部分的最后一个节点
            while (f.next.next != null) {
                s = s.next;
                f = f.next.next;
            }
        } else { // 奇节点数，慢指针停在中间节点
            while (f.next != null) {
                s = s.next;
                f = f.next.next;
            }
        }

        // 翻转后半部分链表
        let lNode = s;
        let mNode = lNode.next;
        let rNode = mNode.next;
        lNode.next = null;
        while (rNode != null) {
            mNode.next = lNode;
            lNode = mNode;
            mNode = rNode;
            rNode = rNode.next;
        }
        mNode.next = lNode;

        // 比较前后两部分链表
        while (hNode != null) {
            if (hNode.element !== tNode.element) {
                res = false;
                break;
            }
            hNode = hNode.next;
            tNode = tNode.next;
        }

        // 还原链表
        // mNode 还指向最后一个节点
        while (lNode != null) {
            mNode.next = rNode;
            rNode = mNode;
            mNode = lNode;
            lNode = lNode.next;
        }
        mNode.next = rNode;

        return res;
    }
}

let linkedList = new LinkedList();
linkedList.push(1);
linkedList.push(1);
linkedList.push(2);
linkedList.push(3);
linkedList.push(3);
linkedList.push(2);
linkedList.push(1);
linkedList.push(1);

let isPalindrome = new IsPalindrome();
console.log(isPalindrome.ispalindrome3(linkedList));
console.log(linkedList.toString());


