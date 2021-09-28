# vue2.0篇

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

## Vue 的模板编译原理

  + Vue 模板的编译过程分为 3 个阶段
    + 第一步：解析
    + 将模板字符串解析生成 AST，生成的 AST 元素节点总共有 3 种类型，1 为普通元素，2 为表达式，3 为纯文本。
    + 第二步：优化语法树
    + Vue 模板中并不是所有数据都是响应式的，有很多数据是首次渲染后就永远不会变化的，那么这部分数据生成的 DOM 也不会变化，我们可以在 patch 的过程跳过对他们的比对。
    + 此阶段会深度遍历生成的 AST 树，检测它的每一颗子树是不是静态节点，如果是静态节点则它们生成 DOM 永远不需要改变，这对运行时对模板的更新起到极大的优化作用。

## v-for 中 key 的作用是什么？

  + `Key` 是给每个 `vnode` 指定的唯一 id，在同级的 vnode diff 过程中，可以根据 key 快速的对比，来判断是否为相同节点，并且利用 key 的唯一性可以生成 map 来更快的获取相应的节点。另外指定 key 后，就不再采用就地复用策略了，可以保证渲染的准确性。

## 为什么 v-for 和 vif 不建议用在一起

  + 当 `v-for` 和 `v-if` 处于同一个节点时，`v-for `的优先级比 `v-if` 更高，这意味着 `v-if` 将分别重复行于每个 `v-for` 循环中。如果要遍历的数组很大，而真正要展示的数据很少时，这将造成很大的性能浪费。这种场景建议使用 computed，先对数据进行过滤。

## Vue- router hash 模式和 history 模式有什么区别？

  + 1.url展示上，hash 模式有#, history 模式没有
  + 2.刷新页面时，hash 模式可以正常加载到 hash 值对应的页面，而 history 没有处理的话，会返回404, 一般需要后端将所有页面都配置重定向到首页路由。
  + 3.兼容性。hash 可以支持低版本浏览器和 IE。

## Vue- router hash 模式和 history 模式是如何实现的？

  + `hash 模式`后面 hash 值的变化，不会导致浏览器向服务器发出请求，浏览器不发出请求，就不会刷新页面。同时通过监听 `hashchange` 事件可以知道 `hash` 发生了哪些变化，然后根据 `hash` 変化来实现更新页面部分内容的操作
  + `history 模式`history 模式的实现，主要是 HTML5 标准发布的两个 AP, `pushstate` 和 `replacestate，`这两个 API 可以在改变 ur，但是不会发送请求。这样就可以监听 ur 变化来实现更新页面部分内容的操作。

## Vue 中组件 data 为什么是 returnー个对象的函数，而不是直接是个对象

  + 当 data 定义为对象后，这就表示所有的组件突例共用了一份 data 数据，因此，无论在哪个组件实例中修改了 data，都会影响到所有的组件实例。组件中的 data 写成一个函数，数据以函数返回值形式定义，这样每复用一次组件，就会返回一份新的 data，类似于给每个组件实例创建一个私有的数据空间，让各个组件实例维护各自的数据。而单纯的写成对象形式，就使得所有组件实例共用了一份 data，就会造成个变了全都会变的结果。

## MVVM 的实现原理

  + 1.响应式：vue 如何监听 data 的属性变化。
  + 2.模板解析：Vue 的模板是如何被解析的。
  + 3.渲染：vue 模板是如何被渲染成 HTML 的。

## Vue3.0 相对于 vue2. X 有哪些变化？

  + 监测机制的改变（Object. Definepropertyー> Proxy 模板
  + 对象式的组件声明方式（class)
  + 使用 ts
  + 其它方面的更改：支持自定义渲染器、支持 Fragment（多个根节点）和 Protal（在 dom 其他部分渲染组建内容）组件、基于 treeshaking 优化，提供了更多的内置功能

## 那你能讲一讲 MVVM 吗？
  + MM 是 Model-View- viewmode1 缩写，也就是把 MIc 中的 Contro1er 演变成 Viewmodel。Model层代表数据模型，View 代表组件，Viewmodel 是 View 和 Model 层的桥梁，数据会绑定到 viewmodell 层并自动将数据渲染到页面中，视图变化的时候会通知 lviewmodell 层更新数据。

## 你知道 Vue3. X 向应式数据原理吗？

  + Vue3. X 改用 `Proxy` 替代 `Object. Defineproperty` 因为 `Proxy` 可以直接监听对象和数组的变化，并且有多达 13 种拦截方法。并且作为新标准将受到浏览器厂商重点持续的性能优化。
  + `Proxy 只会代理对象的第一层，那么 vue3 又是怎样处理这个问题的呢?`
    + 判断当前 Reflect.get 的返回值是否为 Object，如果是则再通过 reactive 方法做代理， 这样就实现了深度观测。
  + `监測数组的时候可能触发多次get/set，那么如何防止触发多次呢？`
    + 我们可以判断 key 是否为当前被代理对象 target 自身属性，也可以判断旧值与新值是否相等，只有满足以上两个条件之一时，才有可能执行 trigger。

## Vue2. X 和 Vue3 渲染器的 dif 算法分别说下

  + 简单来说，dif 算法有以下过程
    + 同级比较，再比较子节点
    + 先判断一方有子节点一方没有子节点的情况（如果新的 children 没有子节点，将旧的子节点移除）
    + 比较都有子节点的情况（核心 diff
    + 递归比较子节点

  + 正常 Diff 两个树的时间复杂度是 o (n3），但实际情况下我们很少会进行跨层级的移动 DoM，所以 vue 将Diff 进行了优化，从 o (n3) -> (n），只有当新 Children 都为多个子节点时オ需要用核心的 Diff 算法进行同层级比较。

  + Vue2 的核心 Diff 算法采用了双端比较的算法，同时从新旧 children 的两端开始进行比较，借助 key 值找到可复用的节点，再进行相关操作。相比 React 的 Diff 算法，同样情况下可以减少移动节点次数，减少不必要的性能损耗，更加的优雅。

  + Vue3. X 借鉴了 `ivi` 算法和 `inferno` 算法,在创建 `Vnode` 时就确定其类型，以及在 mount/ patch 的过程中采用位运算来判断一个 `Vnode` 的类型，在这个基础之上再配合核心的 Diff 算法，使得性能上较 vue2x 有了提升。（实际的实现可以结合 vue3. X 源码看)。

## 你都做过哪些 Vue 的性能优化？

  + 编码阶段
    + 尽量减少 data 中的数据，data 中的数据都会增加 getter 和 setter，会收集对应的 watcher
    + vf 和 vfor 不能连用
    + 如果需要使用 v-for 给每项元素绑定事件时使用事件代理
    + SPA 面米用 keep-alve 存组件
    + 在更多的情况下，使用 vf 替代 vshow
    + key 保证唯一
    + 使用路由懒加载、异步组件
    + 防抖、节流
    + 第三方模块按需导入
    + 长列表滚动到可视区域动态加载
    + 图片懒加载
  + SEO 优化
    + 预渲染
    + 服务端渲染 SSR
  + 打包优化
    + 压缩代码
    + Tree Shaking/Scope Hoisting
    + 使用 cdn 加载第三方模块
    + 多线程打包 happypack
    + splitchunks 抽离公共文件
    + sourcemap 优化
  + 用户体验
    + 骨架屏
    + PWA
  + `还可以使用缓存（客户端缓存、服务端缓存）优化、服务端开启 gzip 压缩等。`