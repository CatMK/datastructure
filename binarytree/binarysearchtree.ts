import { Queue } from "../queue";
import { Stack } from "../stack";
import { Node } from "./node";

class BinarySearchTree {
    public root: Node;

    constructor(root?: Node) {
        this.root = root || null;
    }

    // 向树中插入一个新的键
    public insert(key: any) {
        if (this.root == null) {
            this.root = new Node(key);
        } else {
            this.insertnode(this.root, key);
        }
    }
    public insertnode(node: Node, key: any) {
        if (key < node.key) {
            if (node.left == null) {
                node.left = new Node(key);
            } else {
                this.insertnode(node.left, key);
            }
        } else {
            if (node.right == null) {
                node.right = new Node(key);
            } else {
                this.insertnode(node.right, key);
            }
        }
    }

    // 递归先序遍历
    public preorderrecur(node: Node, callback) {
        if (node == null) {
            return;
        }

        callback(node);

        this.preorderrecur(node.left, callback);
        this.preorderrecur(node.right, callback);
    }

    // 非递归先序遍历
    public preorderrecur1(node: Node, callback) {
        if (node == null) {
            return;
        }

        let stack: Stack = new Stack();
        let current: Node;

        stack.push(node);
        while (!stack.isEmpty()) {
            current = stack.pop();
            callback(current);
            // 先将右节点入栈
            if (current.right != null) {
                stack.push(current.right);
            }
            // 后将左节点入栈
            if (current.left != null) {
                stack.push(current.left);
            }
        }
    }

    // 递归中序遍历
    public inorderrecur(node: Node, callback) {
        if (node == null) {
            return;
        }

        this.inorderrecur(node.left, callback);

        callback(node);

        this.inorderrecur(node.right, callback);
    }

    // 非递归中序遍历
    // 1. 将包括头节点在内的所有左边界节点入栈
    // 2. 将上述节点出栈并进行处理
    // 3. 同时检查该节点是否有右节点，有则重复 1
    public inorderrecur1(node: Node, callback) {
        if (node == null) {
            return;
        }

        let stack = new Stack();

        // while(node != null) {
        //     stack.push(node);
        //     node = node.left;
        // }

        // while(!stack.isEmpty()) {
        //     node = stack.pop();
        //     callback(node);
        //     if(node.right != null) {
        //         node = node.right;
        //         while(node != null) {
        //             stack.push(node);
        //             node = node.left;
        //         }
        //     }
        // }

        while (!stack.isEmpty() || node != null) {
            if (node != null) {
                stack.push(node);
                node = node.left;
            } else {
                node = stack.pop();
                callback(node);
                node = node.right;
            }
        }

    }

    // 递归后序遍历
    public postorderrecur(node: Node, callback) {
        if (node == null) {
            return;
        }

        this.postorderrecur(node.left, callback);
        this.postorderrecur(node.right, callback);

        callback(node);
    }

    // 非递归后序遍历
    // 在非递归先序遍历的基础上，增加一个辅助栈，在迭代中将 current 入辅助栈，并且让左节点先入主栈，最后 pop 辅助栈就是后序遍历的顺序
    public postorderrecur1(node: Node, callback) {
        let stack = new Stack();
        let resStack = new Stack();
        let current: Node;

        stack.push(node);
        while (!stack.isEmpty()) {
            current = stack.pop();
            // 辅助栈中元素入栈顺序是：current、right、left
            resStack.push(current);
            // 先将左节点入栈
            if (current.left != null) {
                stack.push(current.left);
            }
            // 后将右节点入栈
            if (current.right != null) {
                stack.push(current.right);
            }
        }

        while (!resStack.isEmpty()) {
            callback(resStack.pop());
        }
    }

    // 广度优先遍历
    public bfs(node: Node, callback){
        let queue = new Queue();
        let current: Node;

        queue.enqueue(node);
        while(!queue.isEmpty()) {
            current = queue.dequeue();
            callback(current);
            if(current.left != null) {
                queue.enqueue(current.left);
            }
            if(current.right != null) {
                queue.enqueue(current.right);
            }
        }
    }

    // 二叉树最大宽度
    public maxBread(node: Node) {
        if(node == null) {
            return 0;
        }
        let queue = new Queue();
        // 记录每个节点所处层
        let levelMap: Map<Node, number> = new Map();
        // 当前所处层
        let level = 1;
        // 当前层节点数
        let levelNodes = 0;
        // 记录最大宽度
        let maxB = 1;
        levelMap.set(node, level);
        queue.enqueue(node);
        let queueLength = 0;
        
        while(!queue.isEmpty()) {
            queueLength = queueLength < queue.size() ? queue.size() : queueLength;
            let current = queue.dequeue();
            if(levelMap.get(current) === level) {
                levelNodes++;
            }else {
                maxB = maxB > levelNodes ? maxB : levelNodes;
                level++;
                levelNodes = 1;
            }
            if(current.left != null) {
                levelMap.set(current.left, level + 1);
                queue.enqueue(current.left);
            }
            if(current.right != null) {
                levelMap.set(current.right, level + 1);
                queue.enqueue(current.right);
            }
        }

        console.log(queueLength);
        
        return maxB > levelNodes ? maxB : levelNodes;
    }
}

let tree = new BinarySearchTree();
tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(13);
tree.insert(18);

// tree.preorderrecur(tree.root, (node: Node) => {
//     console.log(node.key);
// });
// tree.preorderrecur1(tree.root, (node: Node) => {
//     console.log(node.key);
// });
// tree.inorderrecur(tree.root, (node: Node) => {
//     console.log(node.key);
// });
// tree.inorderrecur1(tree.root, (node: Node) => {
//     console.log(node.key);
// });
// tree.postorderrecur(tree.root, (node: Node) => {
//     console.log(node.key);
// });
// tree.postorderrecur1(tree.root, (node: Node) => {
//     console.log(node.key);
// });
// tree.bfs(tree.root, (node: Node) => {
//     console.log(node.key);
// });
console.log(tree.maxBread(tree.root));
