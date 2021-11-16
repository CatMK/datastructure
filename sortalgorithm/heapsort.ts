class HeapSort {
    public arr: number[] = [8, 5, 7, 4, 6, 9, 2, 3, 1];

    // 将index 位置的数按大根堆规则往上移动：logN
    public heapInsert(arr: number[], index: number) {
        while (arr[index] > arr[(index - 1) / 2 | 0]) {
            this.swap(arr, index, (index - 1) / 2 | 0);
            index = (index - 1) / 2 | 0;
        }
    }

    // 将index 位置的数按大根堆规则往下移动：logN
    public heapify(arr: number[], index: number) {

        while ((2 * index + 1) < arr.length) {
            // 获取左右孩子中较大值的索引
            let largest = (2 * index) + 2 < arr.length && arr[(2 * index + 2)] > arr[(2 * index + 1)] ? 2 * index + 2 : 2 * index + 1;

            // 获取较大孩子与父节点中较大值的索引
            largest = arr[largest] > arr[index] ? largest : index;

            // 如果没有子节点比父节点大，结束迭代
            if (largest === index) {
                break;
            }
            this.swap(arr, largest, index);
            index = largest;
        }
    }

    // 堆排序
    public heapsort(arr: number[]): number[] {
        // 把普通数组转换为大根堆
        for (let i = 0; i < arr.length; i++) {
            this.heapInsert(arr, i);
        }
        // 实际上使用heapify 转换大根堆相对更快一点，虽然表面时间复杂度一样，但是实际会快一点，因为最后一层数据没有子节点
        // for(let i = heapSort.arr.length-1; i >= 0; i--){
        //     heapSort.heapify(heapSort.arr, i);
        // }
        console.log(heapSort.arr);

        // 迭代获取大根堆的最大值
        let sortedArr: number[] = new Array();
        while (heapSort.arr.length > 0) {
            sortedArr.push(heapSort.arr[0]);
            heapSort.arr[0] = heapSort.arr[heapSort.arr.length - 1];
            heapSort.arr.pop();
            heapSort.heapify(heapSort.arr, 0);
        }
        return sortedArr;
    }

    // 堆排序扩展
    /**
     * 已知一个几乎有序的数组，
     * 几乎有序是指，要把这个数组排好序，每个数组元素移动的距离不会超过K，K 是一个相对于数组长度来说较小的固定数，
     * 将数组排序，要求时间复杂度为O(N*logK)
     */
    public sortedArrDistanceLessK(arr: number[], k: number){
        let res: number[] = new Array();
        let heap: number[] = new Array();

        // 将数组中前k 个数排成堆
        for(let i = 0; i < k; i++){
            this.heapInsert(arr, i);
        }
        for(let j = 0; j < k; j++){
            heap.push(arr[j]);
        }

        for(let m = k; m < arr.length; m++){
            // 往堆中添加新节点并重排为堆
            heap.push(arr[m]);
            this.heapInsert(heap, k);
            // 删除根节点并重排为堆
            // 将返回的值存入结果数组
            res.push(this.poll(heap));
        }
        // 重复获取并删除堆的根节点
        while(heap.length > 0){
            res.push(this.poll(heap));
        }

        return res;
    }

    // 删除根节点后重新形成大根堆并返回删除的根节点值
    public poll(arr: number[]){
        let res = arr[0];

        arr[0] = arr[arr.length-1];
        arr.pop();
        this.heapify(arr, 0);

        return res;
    }

    public swap(arr: number[], a: number, b: number) {
        [arr[a], arr[b]] = [arr[b], arr[a]];
    }
}

let heapSort = new HeapSort();

// console.log(heapSort.heapsort(heapSort.arr));

console.log(heapSort.sortedArrDistanceLessK([6,5,8,9,4,7,1,3,2],3));