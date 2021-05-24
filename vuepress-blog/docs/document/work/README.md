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
2. 不能直接改变store中的状态。改变store中的状态唯一途径就是显示地提交commit、mutation。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。
## Vue 的父组件和子组件生命周期钩子执行顺序是什么？
+ 渲染过程
  1. 父组件挂载完成一定是等子组件都挂载完成后，才算是父组件挂载完，所以父组件的 mounted 在子组件 mouted 之后
    + 父 beforecreate->父 created->父 beforemount->子 beforecreate->子 created->子 beforemount ->子 mounted->父 mounted
+ 子组件更新过程
  1. 影响到父组件：父 beforeupdate->子 beforeupdate->子 updated->父 updated
  2. 不影响父组件：子 beforeupdate->子 updated 父组件更新过程
+ 父组件更新过程
  1. 影响到子组件：父 beforeupdate->子 beforeupdate->子 updated>父 updated
  2. 不影响子组件：父 beforeupdate->父 updated
+ 销毁过程
  1. 父 beforedestroy->子 before Destroy->子 destroyed->父 destroyed
+ 看起来很多好像很难记忆，其实只要理解了，不管是种情况，都一定是父组件等待子组件完成后，才会执行自己对应完成的钩子，就可以很容易记住。
## v-if 和v-show 有什么区别？
  + V-if 会在切换过程中对条件块的事件监听器和子组件进行销和重建，如果初始条件是 false，则什么都不，直到条件第一次为 true 时才开始渲染模块。
  + v-show 只是基于 css 进行切换，不管初始条件是什么，都会渲染。所以，v-if 切的开销更大，而 v-show 初始化渲染开销更大，在需要频繁切换，或者切换的部分 dom 很复杂时，使用 v-show 更合适。渲染后很少切换的则使用 v-if 更合适。
## computed 和 watch 有什么区别？
  + Computed 计算属性，是依赖其他属性的计算值，并且有缓存，只有当依赖的值变化时才会更新。 watch 是在监听的属性发生变化时，在回调中执行一些逻辑。
  + 所以，computed 适合在模板渲染中，某个值是依赖了其他的响应式对象甚至是计算属性计算而来，而 watch 适合监听某个值的变化去完成一段复杂的业务逻辑。
## Vue 中的 computed 是如何实现的 
  1. 当组件初始化的时候，computed 和 data 会分别建立各自的响应系统，Observer 遍历 data 中每个属性设置get/set数据拦截。
  2. 初始化 computed 会调用 initcomputed 函数
  + 注册一个 watcher 实例，并在内实例化一个 Dep 消息订阅器用作后续收集依赖（比如渲染函数的 watcher 或者其他观察该计算属性变化的 watcher)。
  + 调用计算属性时会触发其 object. Defineproperty 的 get 访问器函数。
  + 调用 watcher, depend（）方法向自身的消息订阅器 dep 的 subs 中添加其他属性的 watcher。
  + 调用 watcher 的 evaluate 方法（进而调用 watcher 的 get 方法）让自身成为其他求值函数，当访问求值函数里面的属性（比如来自 ata、props 或其他 computed  watcher 的消息订阅器的订阅者，首先将 watcher 赋给 Dep, target，然后执行 gett 会同样触发它们的 get 访问器函数从而将该计算属性的 watcher 添加到求值函数中属性的  watcher 的消息订阅器 dep 中，当这些操作完成，最后关闭 Dep. Target 赋为 nu1 并返回求值函数结果。
  3. 当某个属性发生变化，触发 set 拦截函数，然后调用自身消息订阅器 dep 的 notify 方法，遍历当前 dep 中保存着所有订阅者 wather 的 subs 数组，并逐个调用 watcher 的 update 方法，完成响应更新。
## Vue 中 v-html 会导致什么问题。
  + 在网站上动态渲染任意HTML，很容易导致XSS攻击。所以只能在可信内容上使用v-html，且永远不能用于用户提交的内容上。
## Vue的响应式原理
  + Vue的响应式是通过Object.defineProperty对数据进行劫持，并结合观察者模式实现。Vue利用Object.defineProperty创建一个observe来劫持监听所有的属性，把这些属性全部转为getter和setter。vue中每个组件实例都会对应一个watcher实例，它会在组件渲染的过程中把使用过的数据通过getter收集为依赖。之后当依赖项的setter触发时，会通知watcher，从而使他关联的组件重新渲染。
## Object.defineProperty有哪些缺点？
  1. Object.defineProperty只能劫持对象的属性，而Proxy是直接代理对象。
  2. Object.defineProperty对新增属性需要手动Observe，由于Object.defineProperty劫持的是对象的属性，所以新增属性时，需要重新遍历对象，重新对新增属性在使用Object.defineProperty进行劫持。也正是因为这个原因，使用Vue给data中的数组或对象新增属性时，需要vm.$set才能保证新增的属性也是相应式的。
  3. Proxy 支持 13 种拦截操作，这是 defineproperty 所不具有的。
  4. 新标准性能红利Proxy 作为新标准，长远来看，JS 引擎会继续优化 Proxy，但 getter 和 setter 基本不会再有针对性优化。
  5. Poxy 兼容性差目前并没有一个完整支持 Proxy 所有拦截方法的 Polyfill 方案。
## Vue2.0中如何检测数组变化？
  + VUe 的 Observer 对数组做了单独的处理，对数组的方法进行编译，并赋值给数组属性的 proto 属性上，因为原型链的机制，找到对应的方法就不会继续往上找了。编译方法中会对一些会增加索引的方法（push, unshift, splice）进行手动 observe。
## nextTick是做什么用的，其原理是什么？
  + 能回答清楚这道问题的前提，是清楚 Eventloop 过程。在下次 DOM 更新循环结束后执行延迟回调，在修改数据之后立即使用 nexttick 来获取更新后的 DOM。nextTick 对于 micro task 的实现，会先检测是否支持 Promise，不支持的话，直接指向 macro task，而 macro task 的实现，优先检测是否支持 set Immediate（高版本 IE 和 Etage 支持），不支持的再去检测是否支持 Message Channel，如果仍不支持，最终降级为 settimeout0;默认的情况，会先以 micro task 方式执行，因为 micro task 可以在一次 tick 中全部执行完毕，在些有重绘和动画的场景有更好的性能。但是由于 micro task 优先级较高，在某些情况下，可能会在事件冒泡过程中触发，导致一些问题，所以有些地方会强制使用 macro task（如 vy-on）。
  + 注意：之所以将 nextTick 的回调函数放入到数组中一次性执行，而不是直接在 nextTick 中执行回调函数，是为了保证在同一个 tick 内多次执行了 nextTcik，不会开启多个异步任务，而是把这些异步任务都压成一个同步任务，在下个 tick 内执行完毕。