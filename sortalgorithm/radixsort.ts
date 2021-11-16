// 基数排序：O(N)
class RadixSort {

    // 判断数组中某区域的最大值有多少位数
    public getMaxBits(arr: number[], left: number, right: number){
        let max: number = arr[left];
        // 获取最大值
        for(let i = left; i <= right; i++){
            if(arr[i] > max){
                max = arr[i];
            }
        }
        // 获取最大值位数
        let bits: number = 0;
        while(max/10 > 0){
            bits++;
            max = max/10 | 0;
        }
        return bits;
    }

    // 获取某数某位上的数值
    public getDigit(n: number, d: number){
        while(d > 1){
            n = n/10 | 0;
            d--;
        }
        return n%10;
    }

    /**
     * 
     * @param arr 待排数组
     * @param left 待排区域左索引
     * @param right 待排区域右索引
     * @param digit 待排区域中最大值的位数
     */
    public radixsort(arr: number[], left: number, right: number, digit: number){
        let sortedArr: number[] = new Array();
        let count: number[] = new Array();

        // 最大值的位数就是出入桶的次数
        for(let d = 1; d <= digit; d++){ // d 为1表示个位，为2表示十位...

            // 初始化记录单趟排序结果的数组
            for(let i = 0; i <= right-left; i++){
                sortedArr[i] = 0;
            }
            // 初始化计数数组
            for(let i = 0; i < 10; i++){
                count[i] = 0;
            }

            /**
             * count 中：
             * count[0] 表示d 位置 <= 0的有多少个
             * count[1] 表示d 位置 <= 1的有多少个
             * count[2] 表示d 位置 <= 2的有多少个
             */
            for(let i = left; i <= right; i++){
                let j = this.getDigit(arr[i], d);
                count[j]++;
            }
            for(let i = 1; i < 10; i++){
                count[i] = count[i] + count[i-1];
            }

            // 从右往左处理待排序数组的数组项（相当于让先进的先出）
            // 某数组项d 位置上的数，作为count 数组的索引，对应count 数组项的值减1作为记录排序结果数组的索引
            for(let i = right; i >= left; i--){
                let j = this.getDigit(arr[i],d);
                sortedArr[--count[j]] = arr[i];
            }

            // 将排序后的数组拷贝到原数组
            for(let i = 0; i < sortedArr.length; i++){
                arr[i+left] = sortedArr[i];
            }
        }

        return arr;
    }
}

let radixSort = new RadixSort();
let arr: number[] = [8, 55, 17, 1224, 6, 89, 102, 30, 10];
console.log(radixSort.radixsort(arr, 0, 8, radixSort.getMaxBits(arr, 0, 8)));
