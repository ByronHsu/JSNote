### What are js modules?
- Why use module?
  - 一般來說js只要宣告在全域就是global,所以變數名稱易conflict,module能阻止這件事情發生
  - 易維護、可重複使用
- 基本概念補包
  - Immediately Invoked Function Expressions (IIFE)
    - 長得像這樣:(function expression)(args)
    - 好處: 他會立即執行,因此變數不會污染到global
    - 一個例子
    
    ``` js
    (function(){
      alert(2 + 2);
    })();
    ``` 
  - function expression
    - 基本形式:
    
    ```js
    function name?(args){...}
    
    var a = ()=>{...}
    ```
    - 意義: 像一個var,可以把它當args到處傳,和把他指定給別的變數
  - function declaration
    - 基本形式:
    
    ```js
    function name(args){...}
    ```
    - 意義: 就是一個function的宣告
  - 閉包
    - 把不屬於那個function的變數放入,讓他可以access到
- 怎麼實作module?
  1. 把要load的module用IIFE先loaded好
    - 像是這樣
  
    ```js
    var module = {};
    
    (function (globalVariable) {
      var privateFunction = () => {
        console.log('Shhhh, this is private!');
      }
    
      globalVariable.sayhi = ()=> {
        console.log('hi');
      }
    
    })(module);
    
    module.sayhi();
    ```
  2. CommonJs
  
    ```js
    function myModule() {
      this.hello = function() {
        return 'hello!';
      }
    
      this.goodbye = function() {
        return 'goodbye!';
      }
    }
    
    module.exports = myModule;
    var myModule = require('myModule');
    
    var myModuleInstance = new myModule();
    myModuleInstance.hello(); // 'hello!'
    myModuleInstance.goodbye(); // 'goodbye!'
    ```
    - 特點: 只適合用在node.js的環境,因為他的require是sync的,在後端(disk)要load入module往往會比要在browser load入module快得多,所以不適合用在前端的js
  3. AWD
    - Asynchronous Module Definition, or AMD for short.
    
    ```js
    define(id?, dependencies?, factory);
    // id 代表Module的名稱
    // dependencies 代表Module所依賴的其他Module
    // factory 代表產生Module的工廠(Factory)或是它的實體(Object)
    ```
  4. Native JS
  > JS module的救星 ES6
  
    - syntax
    
    ```js
      // lib/counter.js
      export let counter = 1;
      
      export function increment() {
        counter++;
      }
      
      export function decrement() {
        counter--;
      }
      
      
      // src/main.js
      import * as counter from '../../counter';
      
      console.log(counter.counter); // 1
      counter.increment();
      console.log(counter.counter); // 2
    ```
    - 特點: async, 可以一個一個var export出來,反觀commonjs只能export一個object
    - ES6 creates a live read-only view of the modules we import(有點不懂)
      - 大概是說commonjs在export時會copy一份出來所以變數不會是reference,想對直接對變數操作就無法
      - 但nativeJs卻可以把每個變數各自export出來,就可以直接改到那個變數
      
#### Reference
https://medium.freecodecamp.org/javascript-modules-a-beginner-s-guide-783f7d7a5fcc