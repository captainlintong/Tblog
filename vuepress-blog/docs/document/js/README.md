# js 篇

## 1、js 的防抖和截流

- 防抖 函数防抖（debounce）：当持续触发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次，如果设定的时间到来之前，又一次触发了事件，就重新开始延时

```javaScript
function debounce(func, wait = 0) {
  if (typeof func !== "function") {
    throw new TypeError("need a function arguments");
  }
  let timeid = null;
  let result;

  return function () {
    let context = this;
    let args = arguments;

    if (timeid) {
      clearTimeout(timeid);
    }
    timeid = setTimeout(function () {
      result = func.apply(context, args);
    }, wait);
    return result;
  };
}
// 处理函数
function handle() {
  console.log(Math.random());
}
// 滚动事件
window.addEventListener("scroll", debounce(handle, 300));

```







- 函数节流（throttle）：当持续触发事件时，保证一定时间段内只调用一次事件处理函数。函数节流主要有两种实现方法：时间戳和定时器

```javaScript
// 节流throttle代码（时间戳）：
var throttle = function (func, delay) {
  var prev = Date.now();
  return function () {
    var context = this;
    var args = arguments;
    var now = Date.now();
    if (now - prev >= delay) {
      func.apply(context, args);
      prev = Date.now();
    }
  };
};
function handle() {
  console.log(Math.random());
}
window.addEventListener("scroll", throttle(handle, 1000));

// 节流throttle代码（定时器）：
var throttle = function(func, delay) {
    var timer = null;
    return function() {
        var context = this;
        var args = arguments;
        if (!timer) {
            timer = setTimeout(function() {
                func.apply(context, args);
                timer = null;
            }, delay);
        }
    }
}
function handle() {
    console.log(Math.random());
}
window.addEventListener('scroll', throttle(handle, 1000));
```

- 区别： 函数节流不管事件触发有多频繁，都会保证在规定时间内一定会执行一次真正的事件处理函数，而函数防抖只是在最后一次事件后才触发一次函数。 比如在页面的无限加载场景下，我们需要用户在滚动页面时，每隔一段时间发一次 Ajax 请求，而不是在用户停下滚动页面操作时才去请求数据。这样的场景，就适合用节流技术来实现。













## 2、继承

### 原型继承：一个构造函数的原型（prototype）指向另一个构造函数的实例对象
  + 借助了原型链来完成继承达到目的

```javascript
function Person(name) {
  this.name = name;
  this.work = function () {
    console.log("working......");
  };
}
Person.prototype.play = function () {
  console.log("playing");
};
function Student () {

}
Student.prototype = new Person()
console.log(new Student())
// 优点： 使用简单，好理解
// 缺点： 原型链多了一层，并且这一层没什么用
```






### 借用构造函数继承/借用继承/call继承
  + 就是把父类构造函数体拿过来用一下使用 `call` 方法调用一下

```javascript
function Person(name) {
  this.name = name;
  this.work = function () {
    console.log("working......");
  };
}
Person.prototype.play = function () {
  console.log("playing");
};
function Student () {
   Person.call(this)
}

console.log(new Student())
  // 优点： 直接把属性变成自己的了
  // 缺点： 没有父类原型上的东西
```

###  组合继承
  + 就是把原型继承和借用构造函数继承组合在了一起

  ```javascript
  function Student() {
    Person.call(this)
  }
  Student.prototype = new Person
  ```

### 拷贝继承/for in 继承

- 使用 `for in` 循环把父类的属性和方法放到子类的 prototype 里面

  ```javascript
  function Student() {
    var p = new Person
    for (var key in p) {
      Student.prototype[key] = p[key]
    }
  }
  ```



### 寄生式继承

- 就是 new 一个 Person 函数

  ```javascript
  function Student() {
    var p = new Person
    return p
  }
  ```



### 寄生式组合继承1

- 组合了借用构造函数继承和寄生式继承的一部分（寄生 prototype）

  ```javascript
  function Student() {
    Person.call(this)
  }
  Student.prototype = Person.prototype
  ```



### 寄生式组合继承2

- 组合了借用构造函数继承+原型继承+寄生式继承的一部分（寄生 prototype）

  ```javascript
  function Student() {
    Person.call(this)
  }
  (function () {
    function Abc() {}
    Abc.prototype = Person.prototype
    Student.prototype = new Abc
  })()
  ```

  ​

### 混搭式继承

- 我自己研究的，不一定真的好，我觉得好

  ```javascript
  function Student() {
    Person.call(this)
  }
  (function () {
    var obj = Person.prototype
    for (var key in obj) {
      Student.prototype[key] = obj[key]
    }
  })()
  ```