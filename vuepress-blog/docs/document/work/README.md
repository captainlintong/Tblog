# vue篇
## vue2.0组件通信方式有哪些
+ 父子组件通信
```javaScript
// props 和 event、v-model、.sync、ref、$parent、$children
```
+ 非父子组件通信
```javaScript
// $attr、$listeners、provide、inject、eventbus、
// 通过根实例$root访问、vuex、dispatch、和broadcast
```
## vuex和单纯的全局对象有什么区别？
vuex 和全局对象主要有两大区别
1. vuex的状态存储是响应式的。当vuex组件从store中读取状态的时候，若store中的状态发生变化，那么相应的组件也会相应地得到高效更新。
2. 不能直接改变store中的状态。改变store中的状态唯一途径就是显示地提交commit、mutation。这样使得我们可以方便地跟踪每一个状态的变化，