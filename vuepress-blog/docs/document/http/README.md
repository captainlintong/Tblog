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
+ 抓包
+ 停止抓包
+ 清除请求
+

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

## 9、URI的基本格式以及与URL的区别
+ URL：RFC1738(1994.12),Uniform Resource Locator ,表示资源的位置，期望找到提供查找资源的方法。
+ URN: RFC2141(1997.5),Uniform Resource Name ,期望为资源提供持久的的，与位置无关的的表示方式，并允许简单的将多个命名空间映射到单个URN命名空间。
  + 例如磁力链接：magnet:?xt=urn:sha1:YNCKHTQC5C
+ URI:RFC1630(1994.6)、RFC3986(2005.1,取代RFC2396和RFC2732),Uniform Resource Identifier,用以区分资源，是URL和URN的超集，用以取代URL和URN概念
1. Uniform Resource Identifier 统一资源标识符
+ Uniform 统一
  + 允许不同种类的资源在同一上下文中出现
  + 对不同种类资源标识符可以使用同一语义进行解读
  + 引入新标识符时，不会对已有标识符产生影响
  + 允许同一资源标识符在不同的、Internet规模下的上下文中出现
+ Resource资源
  + 可以是图片、文档、今天上海的天气温度，也可以是不能通过互联网访问的实体
  + 一个资源可以有多个URI
+ Identifier 标识符
  + 将当前资源与其他资源区分开的名称
2. URI格式 URI = scheme ":" hire-part ["?" query] [ "#" fragment ]
+ scheme = ALPHA * (ALPHA / DIGIT / "+" / "-" / "." )
  + 例如 http,https,ftp,mailto,rtsp,file,telnet
+ query = *( pchar / "/" / "?" )
+ fragment = * ( pchar / "/" / "?"  )
  + 示例： https://tools.ietf.org/html/rfc/7231?test=1#page-7
+ hire-part = "//" authority path-abempty / path-absolute / path-rootless / path-empty
  + authority = [ userinfo "@" ] host [ ":" port]
  + userinfo = *( unreserved / pct-encoded / sub-delims / ":" )
  + host = IP-literal / IPv4adress / reg-name
  + port = *DIGIT
    + 实例：https://tom:pass@localhost:8080/index.html
+ path = path-abempty / path-absolute / path-noscheme / path-rootless / path-empty
  + path-abempty = *( "/" segment) 以/开头的路径或者空路径
  + path-absolute = "/" [ segment-nz *( "/" segment )] 以/开头的路径，但是不能以//开头
  + path-noscheme  = segment-nz-nc *( "/" segment )以非：开头的路径
  + path-rootless = segment-nz *( "/" segment )相对path-noscheme,增加允许以：开头的路径
  + path-empty = 0 < pchar > 空路径

## 10、为什么要对URI进行编码？
+ 对可能产生歧义性的数据编码
  + 不在ASCII码范围内的字符
  + ASCII码中不可显示的字符
  + URI中规定的保留字符
  + 不安全字符（传输环节中可能会被不正确处理），如空格、引号、尖括号等
+ 保留字符与非保留字符
  + 保留字符：reserved = gen-delims / sub-delims
    + gen-delims = ":" / "/" / "#" /  "[" / "]" / "@"
    + sub-delims = "!" / "$" / "&" / "'" / "(" / ")" / "*" / "+" / "=" / ";" / ","
  + 非保留字符：unreserved = APLHA / DIGIT / "-" / "_" / "." / "~"
    + APLHA :%41-%5A and %61-%7A
    + DIGIT:%30-%39
    + -: %2D .:%2E  _:%5F
    + ~: %7E ,某些实现将其认为保留字符
+ 百分号编码方式：
  + pct-encoded  =  "%" HEXDIG HEXDIG
    + US-ASCII : 128个字符（95个可显示字符，33个不可显示字符）
    + [ASCII](https://baike.baidu.com/item/ASCII/309296?fr=aladdin "标题")
  + 对于HEXDIG  十六进制中的字母，大小写等价
  + 非ASCII码字符（例如中文）：建议先UTF-8编码，再 US-ASCII 编码
  + 对于URI合法的字符，编码和不编码是等价的

## 11、详解HTTP的请求行
1. 请求行（一）
+ request-line = method SP request-target SP HTTP-version CRLF
  + method 方法：指明操作目的，动词
  + request-target = origin-form / absolute-form / authority-form / asterisk-form
2. 请求行（二）
+ request-target = origin-form / absolute-form / authority-form / asterisk-form
  + origin-form = absolute-path [ "?" query ]
    + 向 origin server 发起的请求，path 为空时必须传递 /
  + absolute-form = absolute-URI
    + 仅用于向正向代理 proxy 发起请求时，详见正向代理与隧道
  + authority-form = authority
    + 仅用于 CONNECT 方法，例如 CONNECT www.example.com:80 HTTP/1.1
  + asterisk-form = "*“
    + 仅用于 OPTIONS 方法
3. 请求行（三）
+ [HTTP-version 版本号发展历史](https://www.w3.org/Protocols/History.html)
  + HTTP/0.9：只支持 GET 方法，过时
  + HTTP/ 1.0：RFC1945，1996， 常见使用于代理服务器（例如 Nginx 默认配置）
  + HTTP/ 1.1：RFC2616，1999
  + HTTP/ 2.0：2015.5 正式发布
4. 常见方法（RFC7231）
+ GET：主要的获取信息方法，大量的性能优化都针对该方法，幂等方法
+ HEAD：类似 GET 方法，但服务器不发送 BODY，用以获取 HEAD 元数据，幂等方法
+ POST：常用于提交 HTML FORM 表单、新增资源等
+ PUT：更新资源，带条件时是幂等方法
+ DELETE：删除资源，幂等方法
+ CONNECT：建立 tunnel 隧道
+ OPTIONS：显示服务器对访问资源支持的方法，幂等方法
+ TRACE：回显服务器收到的请求，用于定位问题。有安全风险
5. 用于文档管理的 WEBDAV 方法(RFC2518)
+ PROPFIND：从 Web 资源中检索以 XML 格式存储的属性。它也被重载，以允 许一个检索远程系统的集合结构（也叫目录层次结构）
+ PROPPATCH：在单个原子性动作中更改和删除资源的多个属性
+ MKCOL：创建集合或者目录
+ COPY：将资源从一个 URI 复制到另一个 URI
+ MOVE：将资源从一个 URI 移动到另一个 URI
+ LOCK：锁定一个资源。WebDAV 支持共享锁和互斥锁。
+ UNLOCK：解除资源的锁定
## 12、HTTP的正确响应码
+ HTTP 响应行
  + status-line = HTTP-version SP status-code SP reason-phrase CRLF
    + status-code = 3DIGIT
    + reason-phrase = *( HTAB / SP / VCHAR / obs-text )
1. 响应码分类：1xx
+ 响应码规范：RFC6585 （2012.4）、RFC7231 （2014.6）
+ 1xx：请求已接收到，需要进一步处理才能完成，HTTP1.0 不支持
  + 100 Continue：上传大文件前使用
    + 由客户端发起请求中携带 Expect: 100-continue 头部触发
  + 101 Switch Protocols：协议升级使用
    + 由客户端发起请求中携带 Upgrade: 头部触发，如升级 websocket 或者 http/2.0
  + 102 Processing：WebDAV 请求可能包含许多涉及文件操作的子请求，需要很长时间 才能完成请求。该代码表示服务器已经收到并正在处理请求，但无响应可用。这样可 以防止客户端超时，并假设请求丢失
2. 响应码分类： 2xx
+ 2xx：成功处理请求
 + 200 OK: 成功返回响应。
 + 201 Created: 有新资源在服务器端被成功创建。
 + 202 Accepted: 服务器接收并开始处理请求，但请求未处理完成。这样一个模 糊的概念是有意如此设计，可以覆盖更多的场景。例如异步、需要长时间处理 的任务。
 + 203 Non-Authoritative Information：当代理服务器修改了 origin server 的 原始响应包体时（例如更换了HTML中的元素值），代理服务器可以通过修改 200为203的方式告知客户端这一事实，
 方便客户端为这一行为作出相应的处理。203响应可以被缓存。
 + 204 No Content：成功执行了请求且不携带响应包体，并暗示客户端无需 更新当前的页面视图。
 + 205 Reset Content：成功执行了请求且不携带响应包体，同时指明客户端 需要更新当前页面视图。
 + 206 Partial Content：使用 range 协议时返回部分响应内容时的响应码
 + 207 Multi-Status：RFC4918 ，在 WEBDAV 协议中以 XML 返回多个资源 的状态。
 + 208 Already Reported：RFC5842 ，为避免相同集合下资源在207响应码 下重复上报，使用 208 可以使用父集合的响应码。
3. 响应码分类： 3xx
+ 3xx：重定向使用 Location 指向的资源或者缓存中的资源。在 RFC2068 中规定客户端重定向次数不应超过 5 次，以防止死循环。
 + 300 Multiple Choices：资源有多种表述，通过 300 返回给客户端后由其 自行选择访问哪一种表述。由于缺乏明确的细节，300 很少使用。
 + 301 Moved Permanently：资源永久性的重定向到另一个 URI 中。
 + 302 Found：资源临时的重定向到另一个 URI 中。
 + 303 See Other：重定向到其他资源，常用于 POST/PUT 等方法的响应中。
 + 304 Not Modified：当客户端拥有可能过期的缓存时，会携带缓存的标识 etag、时间等信息询问服务器缓存是否仍可复用，而304是告诉客户端可以 复用缓存。
 + 307 Temporary Redirect：类似302，但明确重定向后请求方法必须与原 请求方法相同，不得改变。
 + 308 Permanent Redirect：类似301，但明确重定向后请求方法必须与原请 求方法相同，不得改变。
## 13、HTTP的错误响应码
1. 响应码分类： 4xx
  + 400 Bad Request：服务器认为客户端出现了错误，但不能明确判断为以下哪种错误 时使用此错误码。例如HTTP请求格式错误。
  + 401 Unauthorized：用户认证信息缺失或者不正确，导致服务器无法处理请求。
  + 403 Forbidden：服务器理解请求的含义，但没有权限执行此请求
  + 404 Not Found：服务器没有找到对应的资源
  + 405 Method Not Allowed：服务器不支持请求行中的 method 方法
  + 406 Not Acceptable：对客户端指定的资源表述不存在（例如对语言或者编码有要 求），服务器返回表述列表供客户端选择。
  + 407 Proxy Authentication Required：对需要经由代理的请求，认证信息未通过代理 服务器的验证
  + 408 Request Timeout：服务器接收请求超时
  + 409 Conflict：资源冲突，例如上传文件时目标位置已经存在版本更新的资源
  + 410 Gone：服务器没有找到对应的资源，且明确的知道该位置永久性找不到该资源
  + 411 Length Required：如果请求含有包体且未携带 Content-Length 头部，且不属于 chunk类请求时，返回 411
  + 412 Precondition Failed：复用缓存时传递的 If-Unmodified-Since 或 If- None-Match 头部不被满足
  + 413 Payload Too Large/Request Entity Too Large：请求的包体超出服 务器能处理的最大长度
  + 414 URI Too Long：请求的 URI 超出服务器能接受的最大长度
  + 415 Unsupported Media Type：上传的文件类型不被服务器支持
  + 416 Range Not Satisfiable：无法提供 Range 请求中指定的那段包体
  + 417 Expectation Failed：对于 Expect 请求头部期待的情况无法满足时的 响应码
  + 421 Misdirected Request：服务器认为这个请求不该发给它，因为它没有能力 处理。
  + 426 Upgrade Required：服务器拒绝基于当前 HTTP 协议提供服务，通过 Upgrade 头部告知客户端必须升级协议才能继续处理。
  + 428 Precondition Required：用户请求中缺失了条件类头部，例如 If-Match
  + 429 Too Many Requests：客户端发送请求的速率过快
  + 431 Request Header Fields Too Large：请求的 HEADER 头部大小超过限制
  + 451 Unavailable For Legal Reasons：RFC7725 ，由于法律原因资源不可访问
2. 响应码分类： 5xx 服务器端出现错误
  + 500 Internal Server Error：服务器内部错误，且不属于以下错误类型
  + 501 Not Implemented：服务器不支持实现请求所需要的功能
  + 502 Bad Gateway：代理服务器无法获取到合法响应
  + 503 Service Unavailable：服务器资源尚未准备好处理当前请求
  + 504 Gateway Timeout：代理服务器无法及时的从上游获得响应
  + 505 HTTP Version Not Supported：请求使用的 HTTP 协议版本不支持
  + 507 Insufficient Storage：服务器没有足够的空间处理请求
  + 508 Loop Detected：访问资源时检测到循环
  + 511 Network Authentication Required：代理服务器发现客户端需要进 行身份验证才能获得网络访问权限