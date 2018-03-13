# 前端面試
## 目錄
- [基本題](#基本題)
- [阿里巴巴](#阿里巴巴)
## 基本題

1. JavaScript中如何检测一个变量是一个String类型？请写出函数实现
   ``typeof(obj) === "string"``
2. 你如何获取浏览器URL中查询字符串中的参数？
   ``window.location.href``獲取網址
3. 比较typeof与instanceof？
   - typeof
      1. typeof 一般只能返回如下几个结果：number,boolean,string,function,object,undefined。
      2. 对于 Array,Null 等特殊对象使用 typeof 一律返回 object，这正是 typeof 的局限性。
   - instanceof
      1. Instanceof定义和用法：instanceof 用于判断一个变量是否属于某个对象的实例。
      2. example
      ```js
      var a = new Array(); 
      alert(a instanceof Array);  //true
      alert(a instanceof Object);  //true
      ```

4. 如何理解闭包？
   - Definition :当一个函数的返回值是另外一个函数，而返回的那个函数如果调用了其父函数内部的其它变量，如果返回的这个函数在外部被执行，就产生了闭包。
   - Problem
      1. 滥用闭包，会造成内存泄漏：由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露。解决方法是，在退出函数之前，将不使用的局部变量全部删除。
      2. 会改变父函数内部变量的值。所以，如果你把父函数当作对象（object）使用，把闭包当作它的公用方法（Public Method），把内部变量当作它的私有属性（private value），这时一定要小心，不要随便改变父函数内部变量的值

5. 什么是跨域？跨域请求资源的方法有哪些？

   1. 什么是跨域？
      由于浏览器同源策略，凡是发送请求url的协议、域名、端口三者之间任意一与当前页面地址不同即为跨域。存在跨域的情况：
      - 网络协议不同，如http协议访问https协议。
      - 端口不同，如80端口访问8080端口。
      - 域名不同，如 qianduanblog.com 访问 baidu.com。
      - 子域名不同，如 abc.qianduanblog.com 访问 def.qianduanblog.com。
      - 域名和域名对应ip,如www.a.com访问20.205.28.90.
   2. 跨域请求资源的方法：
      1. proxy

         定义和用法：proxy代理用于将请求发送给后台服务器，通过服务器来发送请求，然后将请求的结果传递给前端。
      2. CORS 【Cross-Origin Resource Sharing】
         一般需要后端人员在处理请求数据的时候，添加允许跨域的相关操作
      3. jsonp
         通过动态插入一个script标签。浏览器对script的资源引用没有同源限制，同时资源加载到页面后会立即执行（没有阻塞的情况下）。

      ```html
      <script>
            function testjsonp(data) {
               console.log(data.name);
            }
      </script>
      <script>
            var _script = document.createElement('script');
            _script.type = "text/javascript";
            _script.src = "http://localhost:8888/jsonp?callback=testjsonp";
            document.head.appendChild(_script);
      </script>
      ```

6. 谈谈垃圾回收机制方式及内存管理
   1. 機制: 执行环境负责管理代码执行过程中使用的内存。
   2. 原理：垃圾收集器会定期（周期性）找出那些不在继续使用的变量，然后释放其内存。但是这个过程不是实时的，因为其开销比较大，所以垃圾回收器会按照固定的时间间隔周期性的执行。
   3. 垃圾回收策略：标记清除(较为常用)和引用计数。
      - 标记清除：
         定义和用法：当变量进入环境时，将变量标记"进入环境"，当变量离开环境时，标记为："离开环境"。某一个时刻，垃圾回收器会过滤掉环境中的变量，以及被环境变量引用的变量，剩下的就是被视为准备回收的变量。
      - 引用计数：
         基本原理：就是变量的引用次数，被引用一次则加1，当这个引用计数为0时，被视为准备回收的对象。
7. 开发过程中遇到的内存泄露情况，如何解决的？
   1. 定义和用法：内存泄露是指一块被分配的内存既不能使用，又不能回收，直到浏览器进程结束
   2. 情境：綁定事件未清除、閉包
8. javascript面向对象中继承实现？
- 原型链（prototype chaining）
   ```js
   function teacher(name){
         this.name = name;
   }
   teacher.prototype.sayName = function(){
         console.log("name is "+this.name);
   }
   var teacher1 = new teacher("xiaoming");
   teacher1.sayName();
   function student(name){
         this.name = name;
   }
   student.prototype = new teacher()
   var student1 = new student("xiaolan");
   student1.sayName();
   //  name is xiaoming
   //  name is xiaolan
   ```
- call() / apply()
   ```js
   function teacher(name,age){
      this.name = name;
      this.age = age;
      this.sayhi = function(){
         alert('name:'+name+", age:"+age);
      }
   }
   function student(){
      var args = arguments;
      teacher.call(this,args[0],args[1]);
      // teacher.apply(this,arguments);
   }
   var teacher1 = new teacher('xiaoming',23);
   teacher1.sayhi();

   var student1 = new student('xiaolan',12);
   student1.sayhi();


   // alert: name:xiaoming, age:23
   // alert: name:xiaolan, age:12
   ```

9. 简述一下src与href的区别
- href: 是指向网络资源所在位置，建立和当前元素（锚点）或当前文档（链接）之间的链接，用于超链接。
- src: 是指向外部资源的位置，指向的内容将会嵌入到文档中当前标签所在位置；在请求src资源时会将其指向的资源下载并应用到文档内，例如js脚本，img图片和frame等元素。

10. 什么叫优雅降级和渐进增强？
- 渐进增强 progressive enhancement：针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进和追加功能达到更好的用户体验。
- 优雅降级 graceful degradation：一开始就构建完整的功能，然后再针对低版本浏览器进行兼容。

11. sessionStorage 、localStorage 和 cookie 之间的区别
- 存储内容是否发送到服务器端：当设置了Cookie后，数据会发送到服务器端，造成一定的宽带浪费；web storage,会将数据保存到本地，不会造成宽带浪费；
- 数据存储大小不同：Cookie数据不能超过4K,适用于会话标识；web storage数据存储可以达到5M;
- 数据存储的有效期限不同：cookie只在设置了Cookid过期时间之前一直有效，即使关闭窗口或者浏览器；sessionStorage,仅在关闭浏览器之前有效；localStorage,数据存储永久有效；
- 作用域不同：cookie和localStorage是在同源同窗口中都是共享的；sessionStorage不在不同的浏览器窗口中共享，即使是同一个页面

12. Ajax的优缺点及工作原理？
- 定义和用法:
   - AJAX = Asynchronous JavaScript and XML（异步的 JavaScript 和 XML）。
   - Ajax 是一种用于创建快速动态网页的技术。Ajax 是一种在无需重新加载整个网页的情况下，能够更新部分网页的技术。传统的网页（不使用 Ajax）如果需要更新内容，必须重载整个网页页面。
- AJAX的工作原理：
   1. 创建ajax对象（XMLHttpRequest/ActiveXObject(Microsoft.XMLHttp)）
   2. 判断数据传输方式(GET/POST)
   3. 打开链接 open()
   4. 发送 send()
   5. 当ajax对象完成第四步（onreadystatechange）数据接收完成，判断http响应状态（status）200-300之间或者304（缓存）执行回调函数

13. 请指出document load和document ready的区别？
- 共同点：这两种事件都代表的是页面文档加载时触发。
- 异同点：
   - ready 事件的触发，表示文档结构已经加载完成（不包含图片等非文字媒体文件）。
   - onload 事件的触发，表示页面包含图片等文件在内的所有元素都加载完成。

14. 请说出三种减低页面加载时间的方法
- 压缩css、js文件
- 合并js、css文件，减少http请求
- 外部js、css文件放在最底下
- 减少dom操作，尽可能用变量替代不必要的dom操作

15. web前端开发，如何提高页面性能优化？

- 内容方面：
   1. 减少 HTTP 请求 (Make Fewer HTTP Requests)
   2. 减少 DOM 元素数量 (Reduce the Number of DOM Elements)
   3. 使得 Ajax 可缓存 (Make Ajax Cacheable)

- 针对CSS：
   1. 把 CSS 放到代码页上端 (Put Stylesheets at the Top)

- 针对JavaScript：
   1. 脚本放到 HTML 代码页底部 (Put Scripts at the Bottom)
   2. 移除重复脚本 (Remove Duplicate Scripts)

16. 浏览器是如何渲染页面的？

- 渲染的流程如下：
   1. 解析HTML文件，创建DOM树。自上而下，遇到任何样式（link、style）与脚本（script）都会阻塞（外部样式不阻塞后续外部脚本的加载）。
   2. 解析CSS。优先级：浏览器默认设置<用户设置<外部样式<内联样式<HTML中的style样式；
   3. 将CSS与DOM合并，构建渲染树（Render Tree）
   4. 布局和绘制，重绘（repaint）和重排（reflow）

17. javascript的本地对象、内置对象和宿主对象：
- 本地对象为array、obj、regexp等可以new实例化的对象，如Array、RegExp、String、Boolean；
- 内置对象为global、Math 等不可以实例化的对象（无法在浏览器中发现global对象的存在，因为其属性和方法都被绑定在了window对象中）；
- 每一个宿主对象的实现都取决于不同的浏览器，即产生浏览器兼容性问题，其宿主为浏览器自带的document,window 等；

18. BOM对象有哪些：

- BOM: **浏览器对象模型（Browser Object Model)**
- window对象 ，是JS的最顶层对象，其他的BOM对象都是window对象的属性；
- document对象，文档对象；
- location对象，浏览器当前URL信息；
- navigator对象，浏览器本身信息；
- screen对象，客户端屏幕信息；
- history对象，浏览器访问历史信息；

19. 简述link和import的区别：
- link是XHTML标签，除了加载CSS外，还可以定义RSS等其他事务；@import属于CSS范畴，只能加载CSS；
- link引用CSS时，在页面载入时同时加载；@import需要页面网页完全载入以后加载；

20. 行内元素有哪些，块级元素有哪些，空(void)元素有哪些：
- 行内元素：a、b、span、img、input、strong、select、label、em、button、textarea
- 块级元素：div、ul、li、dl、dt、dd、p、h1-h6、blockquote
- 空元素：即系没有内容的HTML元素，例如：br、meta、hr、link、input、img

21. CSS实现垂直水平居中
- 绝对定位+margin：auto
```css
.box1 {
   margin: auto;
   position: absolute;
   left: 0; right: 0; top: 0; bottom: 0;
}
```
- flexbox
```css
.wrp6 {
    display: flex;
    align-items: center;
    justify-content: center;
}
```

22. 什么是CSS Hack：一般来说是针对不同的浏览器写不同的CSS,就是 CSS Hack。

23. Doctype：一种标准通用标记语言的文档声明类型: <!DOCTYPE> 声明位于文档中的最前面的位置，处于 ``<html>`` 标签之前。此标签可告知浏览器文档使用哪种 HTML 或 XHTML 规范。

24. 行内元素和块级元素的具体区别是什么，行内元素的padding和margin是否可以设置：

- 块级元素会独占一行,默认情况下；其宽度自动填满其父元素宽度；可设margin,padding；
- 行内元素不会独占一行,相邻的行内元素会排列在同一行里,直到一行排不下,才会换行,其宽度随元素的内容而变化;margin-top/bottom、padding-top/bottom不可设；

25. 清除浮动的几种方式，各自的优缺点
- **不會, 查**

## 阿里巴巴

1. React優勢
- 有很多周邊套件可使用
- 高效, 不必直接操作dom
- 優雅, 資料流好管理
2. diff 算法的理解
- 正常的算法必須要O(n^3)才能辦到
- 但FB因為以下兩個假設, 發明了一個O(n)算法
   - 两个相同组件(component)产生类似的DOM结构，不同的组件产生不同的DOM结构；
   - 对于同一层次的一组子节点，它们可以通过唯一的id进行区分。
3. 为什么要单向数据流、组件交互。
- React单向数据流：
   - React是单向数据流，数据主要从父节点传递到子节点（通过props）。
   - 如果顶层（父级）的某个props改变了，React会重渲染所有的子节点。
   - 数据流动方向可以跟踪，流动单一，追查问题的时候可以跟快捷
- 組件交互
   - 父子組件交互
   - 兄弟組件交互
4. 流式布局如何实现，响应式布局如何实现
- 静态布局
   - 意思就是只是针对某个屏幕下设计的网页，当屏幕大小改变时，页面布局不会发生变化，就像经常所看到的滚动条。
- 自适应布局
   - 特点是分别为不同的屏幕设置布局格式，当屏幕大小改变时，会出现不同的布局，意思就是在这个屏幕下这个元素块在这个地方，但是在那个屏幕下，这个元素块又会出现在那个地方。只是布局改变，元素不变。可以看成是不同屏幕下由多个静态布局组成的。
- 流式布局
   - 特点是随着屏幕的改变，页面的布局没有发生大的变化，可以进行适配调整(%)，这个正好与自适应布局相补。
- 响应式布局
   - 这个就好理解了，意思就是分别为不同的屏幕设计的布局方式，可以理解成自适应布局和流程布局的结合。