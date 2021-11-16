// 冒泡排序 O(N^2)
class BubbleSort {
    public arr: number[] = [7,6,5,4,3,2,1];

    public bubblesort(arr: number[]) {
        for(let i = 1; i < arr.length; i++){
            for(let j = 0; j < arr.length - i; j++){
                if(arr[j] > arr[j+1]){
                    [arr[j], arr[j+1]]=[arr[j+1], arr[j]];
                    // arr[j] = arr[j] ^ arr[j+1];
                    // arr[j+1] = arr[j] ^ arr[j+1];
                    // arr[j] = arr[j] ^ arr[j+1];
                }
            }
        }
    }
}
let bubbleSort = new BubbleSort();
console.log(bubbleSort.arr);
bubbleSort.bubblesort(bubbleSort.arr);
console.log(bubbleSort.arr);

