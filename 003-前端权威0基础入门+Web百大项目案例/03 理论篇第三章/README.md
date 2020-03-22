# 03 理论篇第三章

#### 01 浏览器发展史

##### css3/html5和css2/html4的区别
* css3在css2的基础上增加一些属性, 自己能做动画
* css3最强大的地方是能和js配合进行一些非常高难的操作
* html5添加的canvas等等也是能js交互的标签

##### 浏览器组成
1. shell部分
2. 内核部分
2.1 渲染引擎(语法规则和渲染)
2.2 js引擎
3. 其他模块

##### 编译型/解释型
1. 编译型语言
1.1 优点: 快
1.2 不足: 移植性不好
1.3 c/c++ 生成文件的时候 不能跨平台(win生成的文件, linux不能用)
1.4 java(oak) 既不是编译,也不是解释, 用.java--.javac --> 编译 --> .class --> jvm 解释执行, 能跨平台
1.5 (服务器unix/linux)unix开源由黑客和开发者搞出来的
2. 解释型语言
2.1 优点: 跨平台(不用编译啊)
2.2 不足: 稍微慢

##### IE6同期XP系统
* IE6是革命性的(首次实现对js引擎的优化和分离)
* 2008Chrome v8直接js转为机械码
* Firefox3.5 TraceMonkey(对频繁执行的代码做了路径优化)
* Firefox4.0 jeagerMonkey

##### Chrome
*  js引擎 v8引擎(C++写的)直接把js翻译成010101

##### js两大特点
* 解释型
* 单线程

##### js三大阶段
* javascript 原生的部分叫ecmacript 
* DOM 宿主浏览器提供的
* BOM 宿主浏览器提供的

##### js执行队列
* 两个demo1红块demo2红块一起动
* (闪电侠)里第一时间在a道,第二时间在b道让别人觉得有两个闪电侠
* 轮转时间片: 类似吃饭
* 主线程task1/task2 会把task1/task2切成无数个片段,随机排放一个一个片段往js引擎送
* demo1/demo2红块 看起来就是多线程执行的了

#### 02 js介绍,入门,js引入,变量,值类型,运算符

##### 原始值 stack
* Number String Boolean undefined null

##### 引用值 heap
* array object function ...date RegExp

##### 错误
* 低级错误(语法解析错误) 一行执行不了
* 逻辑错误(标准错误)     后影响后续代码终止, 但不会印象其他js代码块(script块)

##### 运算符

###### 运算符 "+"
* 数学运算、字符串链接
* 任何数据类型 加 字符串都等有字符串

##### 运算符优先级
* 面试题
```js
var a = 10;
a += 10 + 1;
// 21
```

#### 03 比较运算符,逻辑运算符
#### 04 条件语句,循环语句
#### 05 条件语句补充,初识引用值
#### 06 typeof,类型转换
* 多撸撸面试题

#### 07-函数,小练习,初识作用域(上)
* 编程要讲究一个原则: 高内聚, 低耦合
* 耦合: 重复冗余代码, 低效代码
* 把相同功能的代码抽取出来放到一个黑匣子里,JS封装黑匣子的东西 - 函数
```js
// 0. 函数声明
function test() {

}
// 1. 命名函数表达式
var test = function abc() {

}
// 2. 匿名函数表达式 --> 函数表达式
var demo = function() {
  // ..
}
```
##### 参数让函数变得无限神奇
```js
function sum(a, b) {
  // 相当于隐式的在函数体内 var a, b;
  console.log(a+b);
}

// 执行的时候
sum(1, 2)

```
##### arguments 实参
* 无论形参有没有完全接受实参,arguments(实参列表)都能存起来
```js
function sum(a, b, c) {
  // 相当于隐式的在函数体内 var a, b;
  console.log(arguuments);
}

// 执行的时候
sum(1, 2, 3, 4)
```

##### parameter 形参
* 形参长度也能输出
```js
function sum(a, b, c) {
  // 相当于隐式的在函数体内 var a, b;
  console.log(sum.length);
}

// 执行的时候
sum(1, 2, 3, 4)
```
##### 函数多态
* 形参 > 实参 || 实参 > 形参 
```js
function sum(a, b, c) {
  if(sum.length > arguments.length) {
    console.log('形参多了')
  } else if(arguments.length > sum.length) {
    console.log('实参多了')
  } else {
    console.log('相等')
  }
}

// 执行的时候
sum(1, 2, 3, 4)
```

##### 不固定形参列表的好处
```js
// 任意个数求和
function sum() {
  // arguments [1, 2, 3, 4 ..]
  var result = 0;
  for(var i = 0; i < arguments.length; i++) {
    result += arguments[i];
  }
  // return result;
  console.log(result);
}
sum(1, 2, 3);
```

##### arguments[0] = a? 
* 你动我就动, 保持映射关系
* 但是他们不是同一个变量
```js
function sum(a, b) {
  // arguments [1, 2]
  // var a = 1;
  a = 2;
  console.log(arguments[0]);
}

sum(1,2)
```

##### 实参1个, 形参有2个, 还映射吗? false
```js
// arg[0]还映射的, b不会映射的
function sum(a, b) {

  b = 2;
  console.log(arguments[1]);
}

sum(1)
```

##### 函数的结束条件 return  
```js 
function sum(a, b) {
  if (arguments.length < 2) {
    return;
  } else {
    console.log(a, b)
  }
}
sum(1)
```

#### 面试题

##### 写一个函数, 功能是告知你所选定的小动物的叫声。
```js
// 函数留了一个接口, 你可以去选定它, 就是参数呗
function scream(animal) {
  switch(animal) {
    case "dog": 
      document.write('旺');
      break; // || false
    case "cat":
      document.write('喵');
      break; // || false
    case "fish": 
      document.write('咕噜咕噜咕噜');
      break; // || false
  }
}
scream('cat');
```

* document.write()是叠加输出的

##### 写一个函数, 实现加法累加计数。

##### 定义一组函数, 输入数字, 逆转并输出汉字形式。
```js
// 一组函数
// 输出
function reverse() {

  var num = window.prompt('input');
  var str = '';
  // 逆向思维, 倒着来就行了
  for(var i = num.length - 1; i >= 0; i--) {
    // 321在链接的时候翻译最好
    // str += num[i];
    str += transfer(num[i]);
  }
  document.write(str);
}

// 翻译
function transfer(target) {
  switch(target) {
    case '1' :
      return '壹';
    case '2' :
      return '贰';
    case '3' :
      return '叁';
  }
}

reverse()

// js的字符串底层是基于数组的
// str[0], str.length
// str.charAt[0||number]
```

##### 写一个函数, 实现n的阶乘。
* 递归只有一点好处, 代码少;  空间复杂度很高
```js
function mul(n) {
  // n的阶乘; 正常思维for循环用num = 1; for..< n, n*=i;
  // 分析: n! === n * (n-1)!;
  
  // 不满足递归的入口 即是 递归出口, js的函数执行完了undefined就相当于return了。
  if(n === 1 || n === 0) {
    return 1;
  }
  return n * mul(n - 1);

}

// mul就是求阶乘的
mul(5);
```

##### 写一个函数, 实现斐波拉契数列。
```js

function fb(n) {
  if(n ===1 || n === 2) {
    return 1;
  }
  return fb(n-1) + fb(n-2);
}

// fb(n) == fb(n-1) + fb(n-2);

fb(5);

```

##### 要求输入一串低于10位的数字, 输出这串数字的中文大写。
* eg: input: 10000 output: 壹万
* eg: input 1001010 output: 壹佰万壹仟零壹佰壹拾

#### 08-函数,小练习,初识作用域(下)

#### 09 递归, 预编译(上)

##### 作用域
* 嵌套函数, 外层函数不能访问里层函数的变量
* 里层的函数可以访问外层的变量

##### 闭包的规范
* 闭包会导致多个执行函数公用一个公有变量, 
* 如果不是特殊需要, 应尽量防止这种情况发生。

##### 立即执行函数
* 定义: 此类函数没有声明, 在一次执行过后立即释放。
* 适合做初始化工作。

##### 闭包的作用
1. 实现公有变量
1.1 eg: 函数累加器

2. 可以做缓存(存储结构)
2.1 eg: eater

3. 可以实现封装, 属性私有化。
3.1 eg: Person();

4. 模块化开发, 防止污染全局变量


##### js运行三部曲
1. 语法分析||语义分析||文法分析?
1.1 通篇扫描一边但不执行

2. 预编译

3. 解释执行

##### 预编译前奏
1. imply global(暗示全局变量) 预编译前奏
1.1 任何变量如果变量未经声明 就赋值, 此变量就为全局对象所有。
1.2 一切声明的全局变量，全是window的属性。(window就是全局的作用域)
1.3 嵌套函数内部的变量未经声明还会向外层查找哟

2. 变量提升
2.1 函数声明整体提升
2.2 变量 声明提升


##### 预编译
* 解释型语言, 读一句执行一句(其实没有那么直观)
* 读一句执行一句是最后一步

##### 函数的预编译
* 预编译发生在函数执行的前一刻
1. 生成一个AO对象(Activation Object)
1.1 这个活动对象理解的作用域, 其实叫 执行期上下文
1.2 将形参名和变量作为AO属性名, 值为undefined

2. 将实参值和形参统一

3. 找到函数体里面函数声明,给AO的key,值赋予函数体

4. 然后逐行执行
###### 面试题01
```js
  function fn(a) {
    console.log(a);   // ƒ a () {}
    var a = 123;

    console.log(a);   // 123
    function a () {};
    
    console.log(a);   // 123

    var b = function() {};
    console.log(b);   // ƒ b () {}

    function d() {};
  }

  fn(1);
  // 预编译发生在函数执行的前一刻

  // 1. 生成一个AO对象(Activation Object)
  // 1.1 这个活动对象理解的作用域, 其实叫 执行期上下文
  // 1.2 找形参和变量声明, 将变量和形参名作为AO属性名, 值为undefined
  // AO: {
  //   a: undefined,
  //   // 然后找到var a, var b
  //   b: undefined
  // }

  // 2. 将实参值和形参统一
  // AO: {
  //   a: 1,
  //   // 然后找到var a, var b
  //   b: undefined
  //   // 将实参值和形参统一
  // }

  // 3. 在函数体里面找函数声明, 值赋予函数体
  // AO: {
  //   a: ƒ a () {},
  //   // 在函数体里面找函数声明, 值赋予函数体
  //   b: undefined,
  //   d: ƒ d () {}
  //   // 在函数体里面找函数声明, 值赋予函数体
  // }

  // 然后逐行执行
  // console.log(a);   去AO对象找a 输出 ƒ a () {}
  // var a = 123;      var a 已经被提升过了 不看了; AO.a = 123;
  // console.log(a);   123;
  // function a () {}; function 已经被提升过了 不看了;
  // var b = function() {}; var b 不看了; AO.b = function() {};
  // function d() {};  function 已经被提升过了 不看了;
```

###### 面试题02
```js
  function test(a, b) {
    // body...
    console.log(a);
    c = 0;
    var c;
    a = 3;
    b = 2;
    console.log(b);
    function b() {};
    function d() {};
    console.log(b);
  }

  test(1);

  // 1. 找形参和变量声明, 将变量和形参名作为AO属性名, 值为undefined
  // AO: {
  //   a: undefined,
  //   b: undefined,
  //   c: undefined
  // }

  // 将实参值和形参统一
  // AO: {
  //   a: 1,
  //   b: undefined,
  //   c: undefined
  // }

  // 在函数体里面找函数声明, 值赋予函数体
  // AO: {
  //   a: 1,
  //   b: ƒ b () {},
  //   c: undefined,
  //   d: ƒ d () {},
  // }

  // 逐行执行代码**********************
  // console.log(a);  // 1

  // c = 0;
  // AO: {
  //   a: 1,
  //   b: ƒ b () {},
  //   c: 1,
  //   d: ƒ d () {},
  // }

  // var c;  // 忽略 已经被提升过了;

  // a = 3;
  // AO: {
  //   a: 3,
  //   b: ƒ b () {},
  //   c: 1,
  //   d: ƒ d () {},
  // }
  

  // b = 2;
  // AO: {
  //   a: 3,
  //   b: 2,
  //   c: 1,
  //   d: ƒ d () {},
  // }
  
  // console.log(b);   // 2;  AO.2  === 2;
  // function b() {};  // 忽略 已经被提升过了;
  // function d() {};  // 忽略 已经被提升过了;
  // console.log(b);   // 2;  AO.2  === 2;
```

###### 面试题03
* var a = 1和function a() {} 一定是fn a; 
* 最后一步找函数声明直接赋值了
```js
  function test(a, b) {
    console.log(a);
    console.log(b);

    var b = 123;
    console.log(b);

    a = 123;
    console.log(a);

    function a() {};
    var a;

    b = 234;

    var b = function() {};
    console.log(a);
    console.log(b);

  }

  test(1);

  // 预编译执行三部曲
  // 1. 生成AO对象, 提升变量(找到形参和var给AO属性,值为undefined)
  // AO: {
  //   a: undefined,
  //   b: undefined,
  // }

  // 2. 将实参和形参统一
  // AO: {
  //   a: 1,
  //   b: undefined,
  // }

  // 3. 找到函数体里面函数声明,给AO的key,值赋予函数体
  // AO: {
  //   a: ƒ a () {},
  //   b: undefined,
  // }

  // 逐行执行代码
  // console.log(a);   //  ƒ a () {}
  // console.log(b);   //  undefined

  // var b = 123;      // var b 忽略; AO.b = 123;
  // console.log(b);   // 123

  // a = 123;          // AO.a = 123;
  // console.log(a);   // 123

  // function a() {};  // 忽略
  // var a;            // 忽略

  // b = 234;          // AO.b = 234;

  // var b = function() {};    // var b 忽略; AO.b = ƒ () {}
  // console.log(a);           // 123
  // console.log(b);           // ƒ () {}
```

##### 全局的预编译
* 哥没有参数, 其他和函数预编译一样
* 第一步创建的AO叫做GO而已(Global Object)
* GO === window

###### 面试题01
```js
  // 全局变量提升
  // console.log(a); // undefined
  // var a = 123;
  
  // console.log(a);    // ƒ a() {}
  // var a = 123;
  // function a() {};

  // 全局预编译
  console.log(a);   // ƒ a () {}
  var a = 123;
  function a() {};
  console.log(a);   // 123
  console.log(window.a);   // 123
  // 生成一个GO对象(Global Object)
  // 找形参和变量声明, 将变量和形参名作为GO属性名, 值为undefined
  // GO: {
  //   a: undefined,
  // }
  // ..统一
  
  // 找到函数体里面函数声明,给GO的key,值赋予函数体
  // GO: {
  //   a: ƒ a () {},
  // }

  // 逐行执行
  // console.log(a);

  // var a = 123;  var a 忽略; a = 123;
  // GO: {
  //   a: 123,
  // }
  // console.log(123);  // 123
```

###### 面试题02
```js
  console.log(test);

  function test(test) {
    // body...
    console.log(test);
    var test = 234;
    console.log(test);

    function test() {};


  }

  test(1);
  var tset = 123;

  // 全局预编译
  // 1. 将变量作为GO的属性名, 值为undefiend
  // GO: {
  //  test: undefined,
  // }

  // 2. 找到函数声明给GO的key,值为函数体
  // GO: {
  //  test:  ƒ test () {..},
  // }

  // 逐行执行
  // console.log(test); // ƒ test () {..},
  // function test () {..} 忽略;
  // test(1); 还没执行的前一刻, 进入函数预编译
  // 1. 将变量和形参名作为AO属性名, 值为undefined
  // AO: {
  //   test: undefined,
  // }
  // 2. 将实参和形参统一
  // AO: {
  //   test: 1,
  // }
  // 3. 找到函数体里面函数声明,给AO的key,值赋予函数体
  // AO: {
  //   test: ƒ test () {},
  // }
  // test(1); 
  // 逐行执行函数里的代码
    // console.log(test);   // ƒ test () {},
    // var test = 234;      // var test 忽略; AO.test = 234;
    // console.log(test);   // 234
    // function test() {};  // 声明忽略;
  // var tset = 123;  // var test 忽略; AO.test = 123;
```

###### 面试题03
```js
  var global = 100;

  function fn() {
    console.log(global);
  }

  fn();   // 100

  // 全局预编译
  // 1. 将变量作为GO的属性名, 值为undefiend
  // GO: {
  //   global: undefined
  // }

  // 3. 找到函数声明给GO的key,值为函数体
  // GO: {
  //   global: undefined,
  //   fn: ƒ test () {}
  // }
  // 逐行执行
  // var global = 100;    // var global 忽略; GO.global = 100;
  //  function fn() {     // 忽略
  //   console.log(global);
  // }
  // fn();执行前一刻, 函数预编译
  // 1. 将变量和形参作为AO的属性名, 值为undefiend
  // AO: {}
  // 逐行执行函数里的代码
  // console.log(global); AO.global找不到去GO找 100
  // fn();
```

###### 面试题05
```js
  global = 100;

  function fn() {
    console.log(global);
    global = 200;
    console.log(global);

    var global = 300;
  }

  fn();
  var global;
  // 全局预编译
  // 1. 将变量作为GO的属性名, 值为undefiend
  // GO: {
  //   global: undefined
  // }

  // 3. 找到函数声明给GO的key,值为函数体
  // GO: {
  //   global: undefined,
  //   fn: ƒ fn () {}
  // }
  // 逐行执行
  // global = 100;    //  GO.global = 100;
  //  function fn() {     // 忽略
  //  
  // fn();执行前一刻, 函数预编译
    // 1. 将变量和形参作为AO的属性名, 值为undefiend
    // AO: {
    //  global: undefined,
    // }
    // 逐行执行函数里的代码
    // console.log(global);  // undefiend
    // global = 200;         // AO.global = 200;
    // console.log(global);  // 200
    // var global = 300;     // var global 忽略; AO.global=300;
  // fn();
  // var global;  // 忽略
```

###### 面试题06
```js
  function test() {
    console.log(b);
    if(a) {
      var b = 100;
    }
    console.log(b);
    c = 234;
    console.log(c);
  }

  var a;
  test();
  a = 10;
  console.log(c);

  // 全局预编译
  // 1. 找出变量声明给GO的属性, 值为undefined;
  // GO: {
  //   a: undefined,
  // }

  // 2. 形参实参统一 忽略
  // 3. 找到函数声明函数名给GO的属性, 值为函数体;
  // GO: {
  //   a: undefined,
  //   test: ƒ test () {}
  // } 
  // 逐行执行代码
  // function test() { .. 提升过了 忽略
  // var a;               提升过了 忽略

  // test(); 执行前一刻 函数预编译
      // 1. 找出函数里变量声明和形参赋值给AO的key, 值为undefined;
      // AO: {
      //   b: undefined,     // 穿透, ES5 没有块级作用域
      // }
      // 2. 实参和形参统一
      // 3. 找出函数里的函数声明给AO的key, 值为函数体
      // 逐行执行函数体内的代码
      // console.log(b);      // undefined 按照猜测是error啊
      // if(a) {              // 此时GO.a === undefined
      //   var b = 100;
      // }
      // console.log(b);      // undefined 按照猜测是error啊
      // c = 234;             // GO.c = 234
      // console.log(c);      // 234
  // test();
  // a = 10;          // GO.a = 10;
  // console.log(c);  // 234
```

###### 面试题07
```js
  function bar() {
    return foo;
    foo = 10;
    function foo() {

    }
    var foo = 11;
  }

  document.write(bar());

  // 全局预编译
  // 1. 找出变量声明给GO的属性, 值为undefined
  // AO: {}
  // 2. 形参实参统一
  // 3. 找出函数声明给GO的属性, 值为函数体
  // AO: {
  //   bar: ƒ bar () {}
  // }
  // 逐行执行全局代码
  // function bar() { .. 提升过了忽略; 
  // document.write(
  //    bar();函数执行前一刻, 函数预编译
  //    1. 找出函数内变量声明和形参给AO的属性, 值为undefined
  //    AO: {
  //      foo: undefined,
  //    }
  //    2. 形实统一
  //    3. 找函数内的函数声明给AO的属性, 值为函数体
  //    AO: {
  //      foo: ƒ foo () {},
  //    }
  //    // 逐行执行函数内的代码
        // return foo;     // reutnr undefined;
        // foo = 10;
        // function foo() {

        // }
        // var foo = 11;
  //    bar();  因此全局的write()应该是一个 ƒ foo () {}
  // )
```

###### 面试题08
```js
  console.log(bar());

  function bar() {
    foo = 10;
    function foo() {

    }
    var foo = 11;
    return foo;
  }

  

  // 全局预编译
  // 1. 找出变量声明给GO的属性, 值为undefined
  // AO: {}
  // 2. 形参实参统一
  // 3. 找出函数声明给GO的属性, 值为函数体
  // AO: {
  //   bar: ƒ bar () {}
  // }
  // 逐行执行全局代码
  // console.log(
  // bar()执行之前函数预编译完成
        // 1. 找出函数内变量声明和形参给AO的key, 值为undefined;
        // AO: {
        //   foo: undefined,
        // }
        // 2. 形实统一
        // 3. 找出函数内的函数声明给AO的key, 值为函数体;
        // AO: {
        //   foo: ƒ foo () {},
        // }
        // 逐行执行函数内的代码
        // foo = 10;           // AO.foo = 10;
        // function foo() {    // 提升过了 忽略
        // }
        // var foo = 11;       // var foo 忽略; AO.foo = 11;
        // return foo;         // return 11;
  // bar()  // 因此 bar 输出的就是 11
  // )

```

#### 10 递归, 预编译(下)

###### 面试题01
* function 不允许定义在if里, 不会被提升赋值函数体
```js
  a = 100;
  function demo(e) {
    function e() {};
    arguments[0] = 2;
    console.log(e);
    if(a) {
      var b = 123;
      function c() {
        // 猪都能做出来
      }
    }
    var c; 
    a = 10;
    var a;
    console.log(b);
    f = 123;
    console.log(c);
    console.log(a);
  }

  var a;
  demo(1);
  console.log(a);
  console.log(f);

  // 全局预编译
  // 1. 找出变量声明给GO的key, 值为undefined;
  // GO: {
  //   a: undefined
  // }
  // 2. 形实统一
  // 3. 找出全局函数声明给GO的key, 值为函数体;
  // GO: {
  //   a: undefined,
  //   demo: ƒ demo () {},
  // }
  // 逐行执行全局代码
  // a = 100;            // GO.a = 100;
  // function demo(e) {  // 提升过了 忽略
  //   // .. 
  // }
  // var a;              // 全局提升过了 忽略
  // demo(1);  执行前一刻完成了函数的预编译
      // 1. 找出函数内的变量声明和形参给AO的key, 值为undefined
      // AO: {
      //   e: undefined,
      //   b: undefined,
      //   c: undefined,
      //   a: undefined,
      // }
      // 2. 形实统一   
      // AO: {
      //   e: 1,
      //   b: undefined,
      //   c: undefined,
      //   a: undefined,
      // }
      // 3. 找出函数内的函数声明给AO的key, 值为函数体
      // AO: {
      //   e: ƒ e () {},
      //   b: undefined,
      //   c: undefined,    // 不是ƒ c () {}, 因为提不出来
      //   a: undefined,
      // }
      // 逐行执行函数内的代码
      // function e() {};       // 忽略
      // arguments[0] = 2;      // 就是操作的e?  的话AO.e 就等于 2了
      // console.log(e);        // 2
      // if(a) {                // 不成立
      //   var b = 123;
      //   function c() {
      //     // 猪都能做出来  这里没被执行, var和提升为undefined
             // 不成立代码块的function不可以被提升     
      //   }
      // }
      // var c;                 // 忽略
      // a = 10;                // AO.a = 10;
      // var a;                 // 忽略
      // console.log(b);        // undefined
      // f = 123;               // GO.f = 123
      // console.log(c);        // undefined
      // console.log(a);        // 10
  // demo(1);          
  // console.log(a);   // undefined
  // console.log(f);   // 100
```

###### 面试题02
###### 面试题03