// 归并排序
class MergeSort {
    public arr: number[] = [9,10,6,8,4,10,3];
    // public arr: number[] = [1,3,4,2,5];

    public process(arr: number[], left: number, right: number){
        if(left === right){
            return;
        }
        let mid = left + ((right - left) >> 1);
        this.process(arr, left, mid);
        this.process(arr, mid+1, right);
        this.merge(arr, left, right);
        return;
    }

    public merge(arr: number[], left: number, right: number){
        let mid = left + ((right - left) >> 1);
        let p1 = left;
        let p2 = mid + 1;
        let temp: number[] = new Array();

        while(p1 <= mid && p2 <= right){
            temp.push(arr[p1] < arr[p2] ? arr[p1++] : arr[p2++]);
        }
        
        while(p1 <= mid){
            temp.push(arr[p1++]);
        }
        while(p2 <= right){
            temp.push(arr[p2++]);
        }

        for(let a = 0; a < temp.length; a++){
            arr[left+a] = temp[a];
        }
    }
}
let mergeSort = new MergeSort();
// mergeSort.process(mergeSort.arr, 0, mergeSort.arr.length - 1);
// console.log(mergeSort.arr);

// 小和问题
class SmallSum {

    public arr: number[] = [1,3,4,2,5];
    // public arr: number[] = [9,10,6,8,4,1,3];

    public process(arr: number[], left: number, right: number): number {
        if(left === right){
            return 0;
        }
        let mid = left + ((right - left) >> 1);
        return this.process(arr, left, mid) + 
        this.process(arr, mid+1, right) + 
        this.smallSum(arr, left, right);
    }

    public smallSum(arr: number[], left: number, right: number): number{
        let mid = left + ((right - left) >> 1);
        let p1 = left;
        let p2 = mid + 1;
        let temp = new Array();
        let sum = 0;

        while(p1 <= mid && p2 <= right){
            if(arr[p1] < arr[p2]){
                sum += (right - p2 + 1) * arr[p1];
                temp.push(arr[p1++]);
            }else{
                temp.push(arr[p2++]);
            }
        }
        while(p1 <= mid){
            temp.push(arr[p1++]);
        }
        while(p2 <= right){
            temp.push(arr[p2++]);
        }
        for(let a = 0; a < temp.length; a++){
            arr[left+a] = temp[a];
        }
        
        return sum;
    }
}
let smallSum = new SmallSum();
// console.log(smallSum.process(smallSum.arr, 0, 4));
// console.log(smallSum.arr);

// 逆序对问题
class ReversedOrderNum {
    // public arr: number[] = [9,10,6,8,4,1,3];
    public arr: number[] = [1,3,4,2,5];

    public process(arr: number[], left: number, right: number): number {
        if(left === right){
            return 0;
        }
        let mid = left + ((right - left) >> 1);
        return this.process(arr, left, mid) + 
        this.process(arr, mid+1, right) + 
        this.reverseordernum(arr, left, right);
    }

    public reverseordernum(arr: number[], left: number, right: number): number{
        let mid = left + ((right - left) >> 1);
        let p1 = left;
        let p2 = mid + 1;
        let num = 0;
        let temp = new Array();

        while(p1 <= mid && p2 <= right) {
            if(arr[p1] > arr[p2]){
                temp.push(arr[p1++]);
                num += (right - p2 + 1);
            }else{
                temp.push(arr[p2++]);
            }
        }

        while(p1 <= mid){
            temp.push(arr[p1++]);
        }
        while(p2 <= right){
            temp.push(arr[p2++]);
        }

        for(let a = 0; a < temp.length; a++){
            arr[left+a] = temp[a];
        }

        return num;
    }
}
let reverseOrderNum = new ReversedOrderNum();
console.log(reverseOrderNum.process(reverseOrderNum.arr, 0, reverseOrderNum.arr.length-1));
console.log(reverseOrderNum.arr);
