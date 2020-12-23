# HTTP/1.1协议

## 1、HTTP协议
Hypertext Transfer Protocol 一种无状态的、应用层的、以请求/应答方式运行的协议，它使用可扩展的语义和自描述消息格式，与基于网络的超文本信息系统灵活互动。

## 2、浏览器发起HTTP请求的典型场景
1. 首先有一台服务器，它监听80或443等web端口。
2. 浏览器从url中解析出域名，根据域名查询DNS，DNS返回给浏览器域名对应的IP地址。
3. 浏览器根据IP地址，与服务器三次握手建立TCP连接（如果使用的是HTTPS还要完成TLS/SSL握手）。
4. 建立连接之后构造HTTP请求，把需要的上下文信息填充至HTTP头部
5. 通过**TCP连接**发起HTTP请求
6. 服务器收到请求后，完成资源的表述，把html页面作为包体返回给浏览器
7. 浏览器引擎解析响应，渲染包体至用户界面，并根据响应中其他超链接图片等其他HTTP请求，再次发起新的HTTP请求。
![avatar](/http/http请求.png)

## 3、基于ABNF语义定义的HTTP请求消息格式
### ABNF操作符
+ 空白字符： 用来分隔定义中的各个元素
  + method SP request-target SP HTTP-version CRLF
+ 选择/： 表示多个规则都是可供选择的规则
  + start-line = request-line / status-line
+ 值范围%c##-##:
  + OCTAL = "0"/"1"/"2"/"3"/"4"/"5"/"6"/"7" 与 OCTAl = %x30-37
+ 序列组合()：将规则组合起来，视为单个元素
+ 不定量重复m\*n:
  + \*元素表示零个或更多元素：\*(header-field CRFC)
  + 1\*元素表示一个或更多元素，2\*4元素表示两个至四个元素
+ 可选序列\[\]:
  + \[messgge-body\]
<!--
使用Wireshark抓包
telnet www.taohui.pub 80
GET /wp-content/plugins/Pure-Highlightjs_1.0/assets/pure-highlight.css?ver=0.1.0 HTTP/1.1
Host:www.taohui.pub
 -->
## 4、网络为什么要分层：OSI模型与TCP/IP模型
+ OSI概念模型
  + 应用层Application：解决业务问题。
  + 表示层Presentation：把网络中的消息转换成应用层可以读取的消息。
  + 会话层Session：概念话的一层，负责建立会话、握手、维持连接、关闭。
  + 传输层Transport：解决进程与进程之间的通讯，报文到了主机上，主机该把报文分发给哪一个进程由传输层决定，报文的可达性，流量的控制。
  + 网络层Network：确保了在广域网中可以从一个主机上把报文发送到另外一个主机上。
  + 数据链路层Data Link：在局域网中，使用mac地址连接到相应的交换机或者路由器。
  + 物理层Physical：可以理解为物理上的一些介质。
+ OSI模型与TCP/IP模型对照
![avatar](/http/osi与tcp.png)

## 5、HTTP解决了什么问题
&ensp;&ensp;&ensp;&ensp;最初设计的目的就是为了解决人与机器的交流，这里浏览器就起到了很重要的作用，浏览器对HTTP协议的进化产生了很大的影响，人需要可视化的读取HTTP中传输的内容，这些内容就是超媒体内容，包括文档、图片、音频、视频、超链接。这些内容能在HTTP中进行高效，高性能的传输也是一个关键的目的。传输的HTML是结构话的方式，这样更利于我们阅读。javascript为什么要放在本地执行，人在本地进行交互的时候，这样体验就更好。

解决WWW信息交互必须面对的需求：
+ 低门槛
+ 可扩展性：巨大的用户群体，超长的寿命
+ 分布式系统下的Hypermedia:大粒度数据的网络传输
+ Internet规模
  + 无法控制的scalability
    + 不可预测的负载、非法格式的数据、恶意消息
    + 客户端不可能保持所有服务器的信息，服务器不能保持多个请求间的状态消息
  + 独立的组建部署：新老组件并存
+ 向前兼容：自1993年起HTTP0.9\1.0（1996）已经被广泛使用

## 6、评估Web架构的七大关键属性
+ HTTP协议应该在以下属性中取得可接受的平衡：
  1. 性能Performance：影响高可用的关键因素。
  2. 可伸缩性Scalability：支持部署可以相互交互的大量的组件。
  3. 简单性Simplicity：易理解、易实现、易验证。
  4. 可见性Visiable：对两个组件间的交互进行监视或者仲裁的能力。如缓存、分层设计。
  5. 可移植性Portability：在不同的环境下运行的能力。
  6. 可靠性Reliability：出现部分故障时，对整体的影响的程度。
  7. 可修改性Modifiability：对系统作出修改的难易程度，由可进化性、可定制性、可扩展性、可配置型、可重用性构成。

+ 架构属性：性能
  + 网络性能Network Performance
    + Throughtput吞吐量：小于等于带宽bandwith
    + Overhead开销：首次开销，每次开销
  + 用户感知的性能User-perceived Performance
    + Latency 延迟：发起请求到接收到响应的时间
    + Completion完成时间：完成第一个应用动作所花费的时间
  + 网络效率Network Efficiency
    + 重用缓存、减少交互次数、数据传输举例更近、COD

+ 架构属性：可修改性
  + 可进化性Evolvability：一个组件独立升级而不影响其它组件
  + 可扩展性Extensibility：向系统添加功能，而不会影响到系统的其它部分
  + 可定制性Customizability：临时性、定制性地更改某一要素来提供服务，不对常规客户产生影响。
  + 可配置性Configurability：应用部署后可通过修改配置提供新的功能
  + 可重用性Reusability：组件可以不做修改在其它应用使用

## 7、从五种架构风格推导出HTTP的REST架构
## 8、如何用Chrome的Network面板分析HTTP报文
1. Network面板
![avatar](/http/network面板.png)
+ 控制面板：控制面板的外观与功能。
+ 过滤器：过滤请求列表中显示的资源。
  + 按住Ctrl（windows/linux）,然后点击过滤器可以同时选择多个过滤器。
  + 隐藏Datas URLs:CSS图片等小文件以BASE64格式嵌入HTML中，以减少HTTP。
+ 概览：显示HTTP请求、响应的时间轴。
+ 请求列表：默认时间排序，可选择显示列。
+ 概要：请求总数，总数据量，总花费时间等。概要中有抓取的请求数量，传输的数据的大小，资源的总计的大小，总共花费的时间，DOMContentLoaded和Load所花费的时间

2. 控制器

3. 过滤器：属性过滤
+ domain:仅显示来自指定域的资源，可以使用通配符字符（*）纳入多个域
+ has-response-header:显示包含指定的HTTP响应标头的资源
+ is: 使用is:running 可查找WebSocket资源  is:from-cache 可查找缓存读出的资源
+ larger-than:显示大于指定大小的资源（以字节为单位），将值设置为1000等同于设置为1k
+ method:显示通过指定HTTP方法类型检索的资源
+ mime-type:显示指定的MIME类型的资源
+ scheme:显示通过未保护HTTP（scheme:http）或受保护HTTPS（scheme:https）检索的资源
+ set-cookie-domain:显示具有Set-Cookie表头并且Domain属性与指定值匹配的资源。
+ set-cookie-name:显示具有Set-Cookie表头并且名称与指定值匹配的资源
+ set-cookie-value:显示具有Set-Cookie表头并且值与指定值匹配的资源
+ status-code:仅显示HTTP状态代码与指定代码匹配的资源