// 快速排序：随机选择一个数组项进行排序，构造不出最差情况的例子，因此时间复杂度为：O(N*logN)
class QuickSort {
    // 使数组中小于等于target 的数组项全都在数组左边，大于target 的数组项全都在数组右边
    public process(arr: number[], target: number){
        let left = -1;
        for(let i = 0; i < arr.length; i++){
            if(arr[i] <= target){
                left++;
                [arr[i], arr[left]] = [arr[left], arr[i]];
            }
        }
    }

    // 使数组中小于target 的数组项全都在数组左边，等于target 的数组项全都在数组中间，大于target 的数组项全都在数组右边
    public process1(arr: number[], target: number){
        let left = -1;
        let right = arr.length;
        let index = 0;

        while(index < arr.length && index < right){
            if(arr[index] < target){
                left++;
                [arr[index], arr[left]] = [arr[left], arr[index]];
                index++;
            }else if(arr[index] > target){
                right--;
                [arr[index], arr[right]] = [arr[right], arr[index]];
            }else{
                index++;
            }
        }
    }

    public quicksort(arr: number[], lIndex: number, rIndex: number){
        if(lIndex < rIndex){
            this.swap(arr, lIndex+(Math.random()*(rIndex-lIndex+1)|0), rIndex);
            let res: number[] = this.partition(arr, lIndex, rIndex);
            this.quicksort(arr, lIndex, res[0]);
            this.quicksort(arr, res[1], rIndex);
        }
        return;
    }

    // 返回一个由小于区域和大于区域的边界index 组成的数组
    public partition(arr: number[], lIndex: number, rIndex: number): number[]{
        let res: number[] = new Array();

        let left = lIndex-1;
        let right = rIndex;
        while(lIndex < right){
            if(arr[lIndex] < arr[rIndex]){
                left++;
                this.swap(arr, left, lIndex);
                lIndex++;
            }else if(arr[lIndex] === arr[rIndex]){
                lIndex++;
            }else {
                right--;
                this.swap(arr, right, lIndex);
            }
        }
        res.push(left);
        res.push(right);

        return res;
    }

    // 交换两数的值
    public swap(arr:number[], aIndex: number, bIndex: number){
        [arr[aIndex], arr[bIndex]]=[arr[bIndex], arr[aIndex]];
    }
}
let test = new QuickSort();
let qarr: number[] = [5,10,7,6,9,5,8];
// let arr: number[] = [4,5,4,2,1,5,3];
// let arr: number[] = [7,4,3,5,8,1,5,5];
test.quicksort(qarr, 0, 6);
console.log(qarr);
