// 二分查找
class SplitHalfSearch {
    public arr1: number[] = [1,2,3,4,5,6,7,8,9];
    public arr2: number[] = [1,1,1,2,2,3,3,3,3,4,4,5,5,5,6,6,6];
    public arr3: number[] = [12,6,4,9,11,8,9];

    // 在一个有序数组中找某个数是否存在
    public process1(arr: number[], a: number) {
        let left: number = 0;
        let right: number = arr.length - 1;
        let flag = false;

        while(left <= right && !flag){
            let mid: number = left + ((right - left) >> 1);
            if(a === arr[mid]){
                flag = true;
            }else if(a < arr[mid]){
                right = mid - 1;
            }else{
                left = mid + 1;
            }
        }

        return flag;
    }

    // 在一个有序数组中，找大于等于某个数的最左侧的位置
    public process2(arr: number[], a: number){
        let left: number = 0;
        let right: number = arr.length;
        let mid: number;
        let location: number;

        while(left <= right){
            mid = left + ((right-left) >> 1);
            if(arr[mid] >= a){
                right = mid - 1;
                location = mid;
            }else{
                left = mid + 1;
            }
        }

        console.log("location is " + location);
    }

    // 相邻项均不相等的无序数组中找出一个局部最小值
    public process3(arr: number[]){
        if(arr[0] < arr[1]) {
            console.log("have found " + arr[0]);
            return;
        }
        if(arr[arr.length - 1] < arr[arr.length - 2]){
            console.log("have found " + arr[arr.length - 1]);
            return;
        }
        let left: number = 1;
        let right: number = arr.length - 2;
        let mid: number;
        while(left <= right){
            mid = left + ((right-left) >> 1);
            if(arr[mid] > arr[mid-1]){
                right = mid - 1;
            }else if(arr[mid] > arr[mid+1]){
                left = mid + 1;
            }else{
                console.log("have found " + arr[mid]);
                break;
            }
        }
    }
}

let splitHalfSearch = new SplitHalfSearch();
console.log(splitHalfSearch.process1(splitHalfSearch.arr1, 6));
splitHalfSearch.process2(splitHalfSearch.arr2, 6);
splitHalfSearch.process3(splitHalfSearch.arr3);
