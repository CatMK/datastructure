export class Node {
    // 节点值
    public key: any;
    // 左节点
    public left: Node;
    // 右节点
    public right: Node;

    constructor(key: any) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
}