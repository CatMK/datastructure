// 异或运算的应用
class ExclusiveOR {
    public arr1: number[] = [2,2,3,5,4,4,5,3,3];
    public arr2: number[] = [2,2,3,5,4,4,5,3,3,5];

     // 正整数数组，一种数出现了奇数次，其余种类数均出现了偶数次，找出出现奇数次的数
    //  时间复杂度：O(N)，空间复杂度：O(1)
    public printOddTimesNum1(arr: number[]){
        let res = 0;

        for(let a of arr){
            res = res ^ a;
        }

        console.log(res);
    }

     // 正整数数组，两种数出现了奇数次，其余种类数均出现了偶数次，找出出现奇数次的数
    //  时间复杂度：O(N)，空间复杂度：O(1)
    public printOddTimesNum2(arr: number[]){
        let aEXb = 0;
        for(let a of arr){
            aEXb = aEXb ^ a;
        }

         // eor = a ^ b 并且 eor != 0 => eor 中某个位置一定为1
        // 获取eor 最右侧的1（固定写法）
        let rightOne = aEXb & (~aEXb + 1);
        /*
        * 获取aEXb 中任意位置的1均可，目的是要通过这个数把所求的两个数区分开
        * rightOne 的值类似于：0000 0100，即除了aEXb 最右侧的1，其余位置均为0
        * 则此时数组中的数与rightOne进行与运算的结果只有两种：0 或 rightOne
        * 通过这个条件将数组项与0连续异或即可得到所求的两数之一
        * 再与一开始得到的aEXb 异或即可得到另一数
        * **/
        let aORb = 0;
        for(let a of arr) {
            if((a & rightOne) === 0){
                aORb = aORb ^ a;
            }
        }
        console.log(aORb + " " + (aORb^aEXb));
        
    }
}

let exclusiveOR: ExclusiveOR = new ExclusiveOR();
exclusiveOR.printOddTimesNum1(exclusiveOR.arr1);
exclusiveOR.printOddTimesNum2(exclusiveOR.arr2);