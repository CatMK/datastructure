// 插入排序 O(N^2)，只考虑最差情况
class InsertSort {
    public arr: number[] = [7,6,5,4,3,2,1];

    public insertsort(arr: number[]){
        // 0~0有序
        // 0~1有序
        // 0~2有序
        // 0~3有序
        // 0~4有序
        // ......
        for(let i = 0; i < arr.length; i++){
            for(let j = i; j > 0; j--){
                if(arr[j] < arr[j-1]){
                    [arr[j],arr[j-1]] = [arr[j-1],arr[j]];
                }else{
                    break;
                }
            }
        }
    }
}

let insertSort: InsertSort = new InsertSort()
console.log(insertSort.arr);
insertSort.insertsort(insertSort.arr);
console.log(insertSort.arr);
