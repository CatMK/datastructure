// 选择排序 O(N^2)
class SelectSort {
    public arr: number[] = [7,6,5,4,3,2,1];

    public selectsort(arr: number[]) {
        for(let i = 0; i < arr.length - 1; i++){
            let min = i;
            for(let j = i+1; j < arr.length; j++){
                if(arr[min] > arr[j]){
                    min = j;
                }
            }
            if(min !== i){
                arr[i] = arr[i] ^ arr[min];
                arr[min] = arr[i] ^ arr[min];
                arr[i] = arr[i] ^ arr[min];
            }
        }
    }
}
let selectSort = new SelectSort();
console.log(selectSort.arr);
selectSort.selectsort(selectSort.arr);
console.log(selectSort.arr);

