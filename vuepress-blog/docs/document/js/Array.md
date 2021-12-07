# Array 篇
 [参考链接](https://juejin.cn/post/6844903614918459406#heading-7 "感谢🙏")
## Array.prototype.map()
  + map() 方法创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值。[MDN链接](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map "map")
  + 因为map生成一个新数组，当你不打算使用返回的新数组却使用map是违背设计初衷的，请用forEach或者for-of替代。你不该使用map: A)你不打算使用返回的新数组，或/且 B) 你没有从回调函数中返回值。
  + map `不修改`调用它的原数组本身（当然可以在 callback 执行时改变原数组）
  + map 方法处理数组元素的范围是在 callback 方法第一次调用之前就已经确定了。调用map方法之后`追加的数组元素不会被callback访问`。如果`存在的数组元素改变`了，那么传给callback的值是map访问该元素时的值。在map函数调用后但在访问该元素前，该元素被删除的话，则无法被访问到。

##  <font color='red'> 改变原数组的方法(9个) </font>
 1. splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目
    + index：必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。
    + howmany：可选。要删除的项目数量。如果设置为 0，则不会删除项目。
    + item1, ..., itemX： 可选。向数组添加的新项目。

```javascript
    let a = [1, 2, 3, 4, 5, 6, 7];
    let item = a.splice(0, 3); // [1,2,3]
    console.log(a); // [4,5,6,7]
    // 从数组下标0开始，删除3个元素
    let item = a.splice(-1, 3); // [7]
    // 从最后一个元素开始删除3个元素，因为最后一个元素，所以只删除了7


    let a = [1, 2, 3, 4, 5, 6, 7];
    let item = a.splice(0,3,'添加'); // [1,2,3]
    console.log(a); // ['添加',4,5,6,7]
    // 从数组下标0开始，删除3个元素，并添加元素'添加'
     let b = [1, 2, 3, 4, 5, 6, 7];
    let item = b.splice(-2,3,'添加1','添加2'); // [6,7]
    console.log(b); // [1,2,3,4,5,'添加1','添加2']
    // 从数组最后第二个元素开始，删除3个元素，并添加两个元素'添加1'、'添加2'


    let a = [1, 2, 3, 4, 5, 6, 7];
    let item = a.splice(0,0,'添加1','添加2'); // [] 没有删除元素，返回空数组
    console.log(a); // ['添加1','添加2',1,2,3,4,5,6,7]
    let b = [1, 2, 3, 4, 5, 6, 7];
    let item = b.splice(-1,0,'添加1','添加2'); // [] 没有删除元素，返回空数组
    console.log(b); // [1,2,3,4,5,6,'添加1','添加2',7] 在最后一个元素的前面添加两个元素

    /*
     从上述三个eg可以得出:
      数组如果元素不够，会删除到最后一个元素为止
      操作的元素，包括开始的那个元素
      可以添加很多个元素
      添加是在开始的元素前面添加的
    */
```
---
2. sort() 数组排序 定义: sort()方法对数组元素进行排序，并返回这个数组。
  + 参数可选: 规定排序顺序的比较函数。
  + 默认情况下sort()方法没有传比较函数的话，默认按字母升序，如果不是元素不是字符串的话，会调用toString()方法将元素转化为字符串的Unicode(万国码)位点，然后再比较字符。

```javascript
    // 字符串排列 看起来很正常
    var a = ["Banana", "Orange", "Apple", "Mango"];
    a.sort(); // ["Apple","Banana","Mango","Orange"]
    // 数字排序的时候 因为转换成Unicode字符串之后，有些数字会比较大会排在后面 这显然不是我们想要的
    var	a = [10, 1, 3, 20,25,8];
    console.log(a.sort()) // [1,10,20,25,3,8];
```

`比较函数的两个参数：`
  + sort的比较函数有两个默认参数，要在函数中接收这两个参数，这两个参数是数组中两个要比较的元素，通常我们用 a 和 b 接收两个将要比较的元素：
    + 若比较函数返回值<0，那么a将排到b的前面;
    + 若比较函数返回值=0，那么a 和 b 相对位置不变；
    + 若比较函数返回值>0，那么b 排在a 将的前面；
  + 对于sort()方法更深层级的内部实现以及处理机制可以看一下这篇文章[深入了解javascript的sort方法](https://juejin.cn/post/6844903507439419399)

  + sort排序常见用法

  ```javascript
  // 1.数组元素为数字的升序、降序:
  var array =  [10, 1, 3, 4,20,4,25,8];
  // 升序 a-b < 0   a将排到b的前面，按照a的大小来排序的
  // 比如被减数a是10，减数是20  10-20 < 0   被减数a(10)在减数b(20)前面
  array.sort(function(a,b){
    return a-b;
  });
  console.log(array); // [1,3,4,4,8,10,20,25];
  // 降序 被减数和减数调换了  20-10>0 被减数b(20)在减数a(10)的前面
  array.sort(function(a,b){
    return b-a;
  });
  console.log(array); // [25,20,10,8,4,4,3,1];

  // 2.数组多条件排序
   var array = [{id:10,age:2},{id:5,age:4},{id:6,age:10},{id:9,age:6},{id:2,age:8},{id:10,age:9}];
     array.sort(function(a,b){
         if(a.id === b.id){ // 如果id的值相等，按照age的值降序
            return b.age - a.age
         }else{ // 如果id的值不相等，按照id的值升序
            return a.id - b.id
         }
     })
  // [{"id":2,"age":8},{"id":5,"age":4},{"id":6,"age":10},{"id":9,"age":6},{"id":10,"age":9},{"id":10,"age":2}]

  // 3.自定义比较函数，天空才是你的极限  类似的：运用好返回值，我们可以写出任意符合自己需求的比较函数
    var array = [{name:'Koro1'},{name:'Koro1'},{name:'OB'},{name:'Koro1'},{name:'OB'},{name:'OB'}];
    array.sort(function(a,b){
      if(a.name === 'Koro1'){// 如果name是'Koro1' 返回-1 ，-1<0 a排在b的前面
        return -1
      }else{ // 如果不是的话，a排在b的后面
        return 1
      }
    })
  // [{"name":"Koro1"},{"name":"Koro1"},{"name":"Koro1"},{"name":"OB"},{"name":"OB"},{"name":"OB"}]
  ```

  ---

3. pop() 删除一个数组中的最后的一个元素
  + 定义: pop() 方法删除一个数组中的最后的一个元素，并且返回这个元素。
  + 参数: 无。

```javascript
  let  a =  [1,2,3];
  let item = a.pop();  // 3
  console.log(a); // [1,2]
```
---
4. shift() 删除数组的第一个元素
  + 定义: shift()方法删除数组的第一个元素，并返回这个元素。
  + 参数: 无。

```javascript
  let  a =  [1,2,3];
  let item = a.shift();  // 1
  console.log(a); // [2,3]
```