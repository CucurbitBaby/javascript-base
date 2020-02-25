# 正则表达式
课程: 2.组件化网页开发 2019版\步骤一：让页面动起来的JavaScript深入讲解\5.正则表达式

> 搬运工：cucurbitbaby
> 
> 2020-02-17　

[慕课网2019就业办 - 正则表达式](http://www.暂时没有.com)

<br/>
## 什么是正则表达式？
> 由以下两种字符组成的文字模式: 

> > -  1.普通字符(例如26个英文字母、数字等[AbC 正则 _ , ; ! @ ..]) 只要不是特殊字符都是普通字符
> > -  2.特殊字符(有特殊含义的，例如[. \ ]等) 

> 说明:

> > -  该模式描述在查找文字主体时待匹配的一个或多个字符串。
> > -  正则表达式作为一个模板，将某个字符模式与所搜索的字符串进行匹配

> **正则**表达式的**模式匹配** 中的正则和模式匹配都是什么意思呢？

> > -  模式: 规则 (按照正则表达式的语法写成的规则)
> > -  匹配: 作比较 (利用上面的规则, 去和字符串字符串)
> > -  正则表达式都是用来操作字符串的。 (正则和字符串才是一对真正的cp -> 好基友)

<br/>
## 一、为什么使用正则表达式？
> 1. 查找
> 2. 查找 的基础上 替换
> 3. 数据有效性验证

<br/>
## Who(何人) 是谁

<br/>
## Demo中的html

- index-01.html &nbsp;&nbsp; 创建正则表达式的两种方式; test(); exec(); 匹配模式; Constructor创建的好处
- index-02.html &nbsp;&nbsp; 正则表达式测试工具
- index-03.html &nbsp;&nbsp; 简单的转义字符
- index-04.html &nbsp;&nbsp; 字符类; 别名简写
- index-05.html &nbsp;&nbsp; 重复; 量词; 默认贪婪; 改非贪婪; 正则匹配原则  
- index-06.html &nbsp;&nbsp; 选择/分组和引用; 捕获性分组/非捕获性分组
- index-07.html &nbsp;&nbsp; 指定匹配位置(字符首匹配, 尾匹配, 边界匹配) getByClassName兼容封装, 前瞻性匹配, 负向前瞻性
- index-08.html &nbsp;&nbsp; RegExp实例方法, RegExp实例属性, RegExp构造函数属性
- index-09.html &nbsp;&nbsp; String对象中与正则表达式相关的方法

<br/>
## 使用时有哪些需要重点注意的？
> 正则表达式中的字符类,取反, 别名, 量词简写, 贪婪模式/改非非贪婪模式, 正则的匹配原则

> ##### 字符类:
```javascript
  // 字符类:
  var str = 'sjavascript';   // s先出现
  var pattern = /[js]/;      // 如果写/js/肯定是匹配不上的, 
  // []字符类 表示匹配里面任意一个字符, 先匹配到谁就是谁(元字符串中谁先出现就是谁哦)
  console.log(pattern.exec(str));
```
> ##### 取反:
```javascript
  // 取反
  var str = 'javascript';
  var pattern = /[^js]/;          // ^除了js之外的任意字符,  除了js之外a最先出现
  console.log(pattern.exec(str));
```
> ##### 别名:
* __.__(点)    别名: [^\n] 不能匹配换行符(\n), 其他任意一个都可以
* __\\w__ &nbsp;&nbsp; 别名: [^\n] 不能匹配换行符(\n), 其他任意一个都可以
* __\\W__ &nbsp; 别名: 除了[a-zA-Z0-9_]
* __\\d__ &nbsp;&nbsp; 别名: [0-9]
* __\\D__ &nbsp;&nbsp; 别名: [^0-9] 除了 [0-9] 的其他字符
* __\\s__ &nbsp;&nbsp; 别名: [空格/Tab]
* __\\S__ &nbsp;&nbsp; 别名: 别名: [^空格/Tab] 除了 [空格/Tab] 的其他字符
```javascript
  var str = '1 1';            // \s 可以不写在字符类[]里, 但并不代表不能写在[]里
  var pattern = /[\s\d]/;     // 1 空格或者数字 挑一个
  console.log(pattern.exec(str));
```

> ##### 量词:
```javascript
  // {量词}
  var str = '110';                
  var pattern = /\d{3}/;          // \d只能匹配一个呀, 难道要写\d\d\d
  console.log(pattern.exec(str)); // 110
```
> ##### 量词简写
```javascript
  // var str = '110';
  // var pattern = /\d?/;             // ? 量词简写 {0,1}
  // console.log(pattern.exec(str));

  // var str = '110';
  // var pattern = /\d+/; //          // + 量词简写 {1,}
  // console.log(pattern.exec(str));

  // var str = '110';
  // var pattern = /\d*/; // {0,}     // * 量词简写{0,}   0次或者更多
  // console.log(pattern.exec(str));
```

> ##### 贪婪模式 / 改非贪婪模式:
```javascript
  var str = 'aaab';
  // var pattern = /a+/;   // 1次或者更多, 到底是a aa aaa呢？  aaa 正则默认是贪婪匹配, 贪婪只和量词有关
  var pattern = /a+?/;     // 量词后面加1个?  将贪婪匹配改成非贪婪匹配  也可以是?(量词)?(转非贪婪) 也可以/a{0,1}?/
  console.log(pattern.exec(str));
```
> ##### 正则的匹配原则:
```javascript
  // var str = 'aaab';
  // var pattern = /a+?b/;             // 匹配不到？   no no no  是 aaab
  // console.log(pattern.exec(str));   
  // 正则是从左开始匹配的, 只要一匹配上呢, 会寻找第一个可能匹配的, 而不是最合适的匹配的  
                                       // 条件允许的情况下, 正则才会尽可能少的匹配

  // var str = '<td><p>a</p></td><td><p>b</p></td>';
  // var pattern = /<td>.*<\/td>/;        // 默认是贪婪的, 直接找到最后一个</td>
  // console.log(pattern.exec(str));

  var str = '<td><p>a</p></td><td><p>b</p></td>';
  var pattern = /<td>.*?<\/td>/;          // 改成非贪婪
  console.log(pattern.exec(str));
```
> #### 选择
```javascript

  // var str = 'js';                // js
  var str = 'css html js';          // css
  // var pattern = /html|css|js/;   // 选择(或) 字符串中匹配 html|css|js 只要匹配到其中一个(html) 其他的就忽略
  var pattern = /js|html|css|/;     // css
  console.log(pattern.exec(str));

  var str = 'ab';
  var pattern = /a|ab/;          // 选择 选择最先匹配的 而不是最合适的, a
  console.log(pattern.exec(str));

```
> #### 分组
```javascript

  var str = 'abab';
  // var pattern = /ab+/;            // +号能影响的仅仅是+前一个字符  ab
  var pattern = /(ab)+/;             // 分组 ["abab", "ab",   贪婪      ab加括号就行了
  console.log(pattern.exec(str));

  // (2) ["abab", "ab", index: 0, input: "abab", groups: undefined]
  // 0: "abab"
  // 1: "ab"
  // index: 0
  // input: "abab"
  // groups: undefined
  // length: 2
  // __proto__: Array(0)

  // 捕获性分组
  var str = 'abcd';
  var pattern = /(ab)c/;            // ["abc", "ab" 贪婪 捕获ab
  console.log(pattern.exec(str));
  // ["abc", "ab", index: 0, input: "abcd", groups: undefined]

  // 非捕获性分组
  var str = 'abcd';
  var pattern = /(?:ab)c/;            // ?:修改为非捕获性分组    abc
  console.log(pattern.exec(str));

  // 平行分组括号
  var str = 'abcd';
  var pattern = /(ab)(c)/;               //  ["abc", "ab", "c"
  console.log(pattern.exec(str));
  // ["abc", "ab", "c", index: 0, input: "abcd", groups: undefined]

  // 嵌套分组括号 (abc) (a(bc)) (a(b(c)))
  var str = 'abcd';                     // 都是先忽略括号匹配全部
  var pattern = /(a(b(c)))/;            // ["abc[匹配结果]", "abc", "bc", "c",
  console.log(pattern.exec(str));
  // 不用管如何嵌套的, 从左边数括号就行了, 
  // 第一个括号: 一个分组   a(b(c)) 
  // 第二个括号: 一个分组   b(c)
  // 第三个括号: 一个分组   c
  
  
```
> #### 引用
```javascript
  // 引用
  // 除了捕获分组到exec()输出使用, 还可以在正则中直接使用分组, 前提是我们要捕获
  var str = 'ab cd ab';
  var pattern = /(ab) cd \1/;       // 引用: \1代表前面的第1个分组  引用: \2代表前面的第2个分组
  console.log(pattern.exec(str));   // ["ab cd ab[匹配结果]", "ab[分组]"
  // ["ab cd ab", "ab", index: 0, input: "ab cd ab", groups: undefined]

  // 例子: 匹配(不一定是p|div) 里面的所有内容
  var str = '<p><a>这是一段文字</a></p>';
  var pattern = /<([a-zA-Z]+)>(.*?)<\/\1>/;
  console.log(pattern.exec(str));
  // 1. 因为不一定是p 所以用到字符类(做一个分组 标签结果直接用, 保持一致)
  // 2. 所有内容分组() .*所有内容 *? 禁止贪婪匹配
  // 'abc' /c/ 
  // index: 2
  // input 字符串

```
> #### 指定匹配位置
```javascript
  // 字符首匹配
  var str = 'js';
  var str = 'html js';        // null
  var pattern = /^js/;        // ^表示位置, 强调j必须从字符串的开头开始匹配 ^这不是取反[^取反]了
  console.log(pattern.exec(str));
  // /[^0-9]/

  // 尾匹配
  var str = 'html js';        // js 
  // var str = 'html js css'; // null
  var pattern = /js$/;     // $表示位置, 强调末尾位置前面一定要是s才行
  // console.log(pattern.exec(str));

  // 例子
  // 购物的数量, 如何保证输入的数量都是数字呢？
  var str = '110119120';
  var pattern = /^\d+$/;    // 1. 数字\d 2.很多数字 \d+ 3.全书数字 ^\d 和 \d$
  // console.log(pattern.exec(str));
  if (pattern.test(str)) {
   console.log('全是数字！');
  } else {
   console.log('不全是数字！');
  }
  // 全是数字！

  // 逆向思维 找到一个不是数字的就行了
  var str = '11011a9120';
  var pattern = /\D/;                   // 非数字
  console.log(pattern.exec(str));
  if (pattern.test(str)) {
   console.log('不全是数字！');
  } else {
   console.log('全是数字！');
  }
  // 不全是数字


  // 边界匹配
  var str = 'js html';
  var pattern = /js\b/;           // \b -> 匹配位置 单词的边界,  \b表示\w和\W之家你的位置
  console.log(pattern.exec(str));
  // ["js", index: 0, input: "js html", groups: undefined]

  var str = '@@@js@@@';
  var pattern = /\bjs\b/;           // @j可用1个\b   s@可用一个\b
  console.log(pattern.exec(str));
  // ["js", index: 3, input: "@@@js@@@", groups: undefined]
  
  // 例子
  // 通过class获取元素
  var oddP = getByClassName('odd');
  var evenP = getByClassName('even');
  for (var i = 0; i < oddP.length; i++) {
   oddP[i].style.backgroundColor = 'red';
  }
  for (var i = 0; i < evenP.length; i++) {
   evenP[i].style.backgroundColor = 'yellow';
  }

  // 这个更好用
  function getByClassName(className, parentNode) {
   if (document.getElementsByClassName) {
     return document.getElementsByClassName(className);
   } else {
     console.log(1);
     parentNode = parentNode || document;
     var nodeList = [];
     var allNodes = parentNode.getElementsByTagName('*');     // 获取所有的父节点的子元素
     var pattern = new RegExp('\\b' + className + '\\b');

     for (var i = 0; i < allNodes.length; i++) {
       if (pattern.test(allNodes[i].className)) {
         nodeList.push(allNodes[i]);
       }
     }

     return nodeList;
   }
  }

  // 这个考虑很多情况  <p class="odd2      odd    ">1</p>
  function getByClassName(className, parentNode) {
   if (document.getElementsByClassName) {
     return document.getElementsByClassName(className);
   } else {console.log(1);
     parentNode = parentNode || document;
     var nodeList = [];
     var allNodes = parentNode.getElementsByTagName('*');
     // var pattern = new RegExp('(^|\s+)' + className + '($|\s+)');
     // 所有扔到构造函数里的转义字符 都需要双重转义
     var pattern = new RegExp('(^|\\s+)' + className + '($|\\s+)');

     for (var i = 0; i < allNodes.length; i++) {
       if (pattern.test(allNodes[i].className)) {
         nodeList.push(allNodes[i]);
       }
     }

     return nodeList;
   }
  }

  function getByClassName(className, parentNode) {
   if (document.getElementsByClassName) {
     return document.getElementsByClassName(className);
   } else {
     console.log(1);
     parentNode = parentNode || document;
     var nodeList = [];
     var allNodes = parentNode.getElementsByTagName('*');

     for (var i = 0; i < allNodes.length; i++) {
       if (allNodes[i].className === className) {
         nodeList.push(allNodes[i]);
       }
     }

     return nodeList;
   }
  }

  // 前瞻性匹配
  // 只有java后面跟着script 才 匹配java
  var str = 'java';
  var pattern = /java(?=script)/;     // 前瞻性匹配
  console.log(pattern.exec(str));

  // 负向前瞻性 
  // 只有java后面跟着script 就不匹配 java
  var str = 'javasda';
  // var str = 'javascript';   // null
  var pattern = /java(?!script)/;       // 负向前瞻性 
  console.log(pattern.exec(str));

```
<br/>
## 跟正则表达式有关的方法有哪些？
> test()
> > RegExp.prototype.test()
>
> > 说明: test() 方法执行一个检索，用来查看正则表达式与指定的字符串是否匹配。返回 true 或 false。
>
> > 语法: regexObj.test(str)
>
> exec()
> > RegExp.prototype.exec()
>
> > 说明: exec() 方法在一个指定字符串中执行一个搜索匹配。返回一个结果数组或 null。
>
> > 语法: regexObj.exec(str)

## 正则修饰符
```javascript
  // 当匹配多行时，默认是全文本匹配，使用 m 之后，将对每一行进行单独匹配
  // 参考: https://blog.csdn.net/diaochou1143/article/details/101350089/

  // global(g)         针对字符串中所有可能的匹配来测试正则表达式
  // ignoreCase(i)     匹配时忽略大小写
  // multiline(m)      多行输入将被视为多行（此时开始^和结尾匹配$可以在每行中进行匹配）   
  // unicode(u)        对字符串采用unicode进行匹配

  // 位置可无序
  // /js/ig
  // /js/gi
  // /js/igm
  // /js/img
```
## RegExp对象的实例方法

```javascript
  // 构造函数的方式: 模式可以作为变量传递
  // /js/
  // new RegExp('js')
  // var className = 'box';
  // new RegExp(className)
  // 
  // 字面的分组/\1\2/
  // 构造函数的分组 RegExp(regstr, $1)

  // 构造函数创建Reg对象 转义字符一定要双重转义
  console.log(new RegExp('\\b'));           //      /\b/
  // 匹配2个\    /\\/
  var pattern = new RegExp('\\\\')          //      /\\/
  console.log(pattern);    

  // 实例方法 exec()   index匹配到字符串中的第index的位置, 
  var str = 'js js js';
  var pattern = /js/;
  console.log(pattern.exec(str));       // ["js", index: 0, input: "js js js", groups: undefined]
  console.log(pattern.exec(str));       // ["js", index: 0, input: "js js js", groups: undefined]
  console.log(pattern.exec(str));       // ["js", index: 0, input: "js js js", groups: undefined]
  console.log(pattern.exec(str));       // ["js", index: 0, input: "js js js", groups: undefined]
  // ...

  // 加上模式修饰符就不一样了哦
  // exec()这个实例方法, 自身的特点
  var str = 'js js js';
  var pattern = /js/g;
  console.log(pattern.exec(str));          // ["js", index: 0, input: "js js js", groups: undefined] 
  console.log(pattern.exec(str));          // ["js", index: 3, input: "js js js", groups: undefined]
  console.log(pattern.exec(str));          // ["js", index: 6, input: "js js js", groups: undefined]
  console.log(pattern.exec(str));          // null
  console.log(pattern.exec(str));          // ["js", index: 0, input: "js js js", groups: undefined]
  // exec()执行原理
  // 匹配上的字符的下一个位置
  // 一但要求全局匹配的时候, 匹配完第一次pattern.lastIndex => 2,下一次在执行exec的时候就会读取lastIndex 从2开始查找
  // 匹配完成之后,返回null, 就会自动把lastIndex重置为0

  // 没有问题的
  var str = 'js js js';
  var pattern = /(j)s/;
  console.log(pattern.exec(str));
  console.log(pattern.exec(str));
  console.log(pattern.exec(str));
  console.log(pattern.exec(str));

  // 加了全局匹配之后子项分组内容还是能匹配出来的
  // 后面说差异
  var str = 'js js js';
  var pattern = /(j)s/g;
  console.log(pattern.exec(str));     // (2) ["js", "j", index: 0, input: "js js js", groups: undefined]
  console.log(pattern.exec(str));     // (2) ["js", "j", index: 3, input: "js js js", groups: undefined]
  console.log(pattern.exec(str));     // (2) ["js", "j", index: 6, input: "js js js", groups: undefined]
  console.log(pattern.exec(str));     // null

  // 我要一次全部找出来, 而不是一个一个找
  // 分析执行一次exec找到一个js,在执行一个就会找到第二2个 用while循环
  var str = '1.js 2.js 3.js';
  var pattern = /js/g;
  var total = 0, match = '', result;

  while ((result = pattern.exec(str)) != null) {
   total++;
   match += '第' + total + '个匹配到的是：' + result[0] + ', 它的位置是：' + result.index + '\n';
  }
  match += '共找到' + total + '处匹配\n';
  // console.log(str);     // 1.js 2.js 3.js
  
  console.log(match);
  // 第1个匹配到的是：js, 它的位置是：2
  // 第2个匹配到的是：js, 它的位置是：7
  // 第3个匹配到的是：js, 它的位置是：12
  // 共找到3处匹配

  // test() lastIndex和exec()原理 要全局才有特性
  var str = 'js js js';
  var pattern = /js/g;
  console.log(pattern.test(str));
  console.log(pattern.test(str));
  console.log(pattern.test(str));
  console.log(pattern.test(str)); // false
  console.log(pattern.test(str)); // true

  var pattern = new RegExp('a\\nb')
  console.log(pattern.toString());            // /a\nb/ => 从Object原型继承来的toString方法  字面量形式字符串
  console.log(pattern.toLocaleString());      // /a\nb/ => 从Object原型继承来的toString方法  一样的其他语言的方法
  console.log(pattern.valueOf() === pattern); // true  返回正则本身



```

## RegExp对象的实例属性
```javascript
  // RegExp实例属性
  var str = 'js js js';
  var pattern = new RegExp('\\b', 'i');
  console.log(pattern.ignoreCase);        // true 
  console.log(pattern.global);            // false 
  console.log(pattern.multiline);         // false 
  console.log(pattern.source);            // \b     返回字面量形式的字符串
  console.log(pattern.lastIndex);         // 0      

  // lastIndex
  var str = 'js js js';
  var pattern = /js/;
  console.log(pattern.lastIndex);     // 0
  pattern.test(str);
  console.log(pattern.lastIndex);     // 0
  pattern.test(str);
  console.log(pattern.lastIndex);     // 0
  pattern.test(str);
  console.log(pattern.lastIndex);     // 0
  pattern.test(str);
  console.log(pattern.lastIndex);     // 0
  pattern.test(str);
  console.log(pattern.lastIndex);     // 0

  // 开启全局
  var str = 'js js js';
  var pattern = /js/g;
  console.log(pattern.lastIndex);        // 0
  pattern.test(str);
  console.log(pattern.lastIndex);        // 2
  pattern.test(str);
  console.log(pattern.lastIndex);        // 5
  pattern.test(str);
  console.log(pattern.lastIndex);        // 8
  pattern.test(str);
  console.log(pattern.lastIndex);        // 0
  pattern.test(str);
  console.log(pattern.lastIndex);        // 2

```
## RegExp构造函数静态属性
```javascript
  // 构造函数静态属性  兼容性很差
  var str = 'js js js';
  var pattern = /(j)s/;
  // console.log(RegExp.input);       // 待匹配的字符串是空
  pattern.exec(str);                  // 执行了exec或者test 构造函数属性才会被填充进去

  console.log(RegExp.input);          // 待匹配的字符串
  console.log(RegExp.$_);             // 待匹配的字符串的别名: 字母、_、$开头，后面字母、_、$、数字
  console.log(RegExp['$_']);          // 待匹配的字符串的别名: 字母、_、$开头，后面字母、_、$、数字

  console.log(RegExp.lastMatch);      // js 含有最后匹配到的字符串
  console.log(RegExp['$&']);          // js 含有最后匹配到的字符串 别名

  console.log(RegExp.leftContext);    // 空 含有最后匹配到的字符串 左边剩余的字符
  console.log(RegExp['$`']);          // 空 别名

  console.log(RegExp.rightContext);   // js js 含有最后匹配到的字符串 右边边剩余的字符
  console.log(RegExp["$'"]);          // js js 含有最后匹配到的字符串 右边边剩余的字符  别名

  console.log(RegExp.lastParen);      // j 上一次匹配的子选项(分组)  
  console.log(RegExp["$+"]);          // j 上一次匹配的子选项(分组)  别名

  var str = 'js js js';
  var pattern = /(j)s/
  pattern.exec(str);
  console.log(RegExp.$1);   // j

```

## String对象中与正则表达式相关的方法
```javascript
  // 正则和字符串是一对好基友, 正则有操作字符串的方法, 字符串也有操作正则的方法
  // 不管是谁操作谁, 最终的目的都是让正则的模式去匹配字符串, 查找出相应的字符

  // \
  var str = '// 我是注释';
  var pattern = /\/\//;
  console.log(pattern.exec(str));     // ["//", index: 0, input: "// 我是注释", groups: undefined]

  // match VS exec
  // match只有在非全局情况下,才返回分组中的内容, 全局匹配只能返回 所有匹配到匹配字符 一把梭哈数组
  // exec无论是否全局都会返回分组中的内容, 且只返回当前匹配到的一个内容, 而不是全部返回匹配到的内容
  // 但是可以继续接着匹配, 直到找不到为止的

  str.search
  var str = 'html js js';
  console.log(str.search('js'));         // 5 位置  找到了, 找不到-1  也可以是字符串(隐式转换成正则)

  var str = 'html js js';
  var pattern = /js/g;
  console.log(str.search(pattern));      // 还是5, 有没有全局匹配都是无所谓的

  // str.match 
  // 没有分组
  var str = 'js js js';               
  var pattern = /js/;                   // 和exec还是一样的
  console.log(str.match(pattern));      // ["js", index: 0, input: "js js js", groups: undefined]
  
  // 分组没有开启全局
  var str = 'js js js';
  var pattern = /(j)s/;                 // 和exec还是一样的    和exec还是一样的
  console.log(str.match(pattern));      //  ["js", "j", index: 0, input: "js js js", groups: undefined]

  // 分组开启全局
  var str = 'js js js';
  var pattern = /(j)s/g;                // ["js", "js", "js"] 没有了分组的项了
  console.log(str.match(pattern));      // 我们不一样exec     
  
  // match VS exec
  // match只有在非全局情况下,才返回分组中的内容, 全局匹配只能返回 所有匹配到匹配字符 一把梭哈数组
  // exec无论是否全局都会返回分组中的内容, 且只返回当前匹配到的一个内容, 而不是全部返回匹配到的内容
  // 但是可以继续接着匹配, 直到找不到为止的

  // m 模式  
  var str = '1.js\n2.js\n3.js';
  var pattern = /js/m;                // 虽然是多行的, 但没有开启全局, 找到了就回家
  console.log(str);
  console.log(str.match(pattern));    // ["js", index: 2, input: "1.js↵2.js↵3.js", groups: undefined]

  // m和g一起使用才有意义
  var str = '1.js\n2.js\n3.js';
  var pattern = /js/mg;               // 此时m 加不加都没有关系
  console.log(str);    
  console.log(str.match(pattern));    // ["js", "js", "js"]

  // m和g一起使用才有意义 用match要指定位置才有意义
  var str = '1.js\n2.js\n3.js';
  // var pattern = /js$/g;                  // ["js"]  虽然是全局的, 但也只能找到最后一个
  var pattern = /js$/mg;                    // ["js", "js", "js"]  加m就不一样了, 每一个都是一行了
  console.log(str);
  console.log(str.match(pattern));

  // 首匹配和尾匹配是一样的
  var str = 'js1\njs2\njs3';
  var pattern = /^js/mg;                    // 不加m  正则认为str就是一行数据
  console.log(str);
  console.log(str.match(pattern));          // ["js", "js", "js"]


  // str.split和Array.json()刚好相反
  var str = 'html,css,js';
  console.log(str.split(','));              // (3) ["html", "css", "js"]

  var str = 'html,css,js';
  var pattern = /,/g;
  console.log(str.split(pattern));          // (3) ["html", "css", "js"]

  var str = 'html ,   css  ,   js';
  var pattern = /\s*,\s*/;
  console.log(str.split(pattern));          // (3) ["html", "css", "js"]

  // str.replace 功能配合正则表达式很强大
  var str = 'I love js js';
  console.log(str.replace('js', 'html'));   // I love html js

  var str = 'I love js js';                 // I love html html
  var pattern = /js/g;                      // 不加模式,全局匹配的话, 也是找到就替换回家
  console.log(str.replace(pattern, 'html'));

  // 事件日期
  var str = '1111-11-11';
  var pattern = /-/g;
  console.log(str.replace(pattern, '.'));   // 1111.11.11

  // 引用分组   正则中引用用/(js)\1/,  replave中也可以使用, 但是是用$1使用的
  var str = 'I love js';
  var pattern = /(js)/;
  document.write(str.replace(pattern, '<strong style="color: red;">$1</strong>'));  // 页面显示 I love js

  var str = '中国军队和阿扁一起办证';
  var pattern = /国军|阿扁|办证/g;
  console.log(str.replace(pattern, '*'));     // 中*队和*一起*   很明显少*了

  var str = '中国军队和阿扁一起办证';           // 中**队和**一起**
  var pattern = /国军|阿扁|办证/g;
  console.log(
    str.replace(pattern, function ($0) {
     // console.log($0);
     var result = '';
     for (var i = 0; i < $0.length; i++) {    // String.length
       result += '*';
     }

     return result;
    })

  );



  var str = '中国军队和阿扁一起办证';              // 中**队和**一起**
  var pattern = /(国)军|阿扁|办证/g;
  console.log(
    str.replace(pattern, function ($0, $1) {
     console.log($0);   // 国军 阿扁        办证
     console.log($1);   // 国   undefined   undefined
     var result = '';
     for (var i = 0; i < $0.length; i++) {       // String.length
       result += '*';
     }

     return result;
    })

  );

```