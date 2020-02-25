// 函数式编程具有两个最基本的运算：合成（compose）和柯里化（Currying）。


/*

//test-01
// 函数式编程是对过程的抽象，关注的是动作。以上面计算的例子为例，
// 我们关注的是它的动作，先「加上 4」再「乘以 4」。那么我们的代码实现如下
function add4(x) {
  return x + 4
}
function multiply4(x) {
  return x * 4
}

// console.log(multiply4(add4(1)))  // 20

// 我们将合成的动作抽象为一个函数 compose
function compose(f,g) {
  return function(x) {
      return f(g(x));
  };
}

var calculate=compose(multiply4,add4);  //执行动作的顺序是从右往左

console.log(calculate(1))  // 20

//*/


/*

//test-02 compose函数
function compose() {
  var args = arguments;
  // console.log(arguments)   //length 3
  var start = args.length - 1;

  return function () {
    var i = start - 1;
    // console.log(this)            // windows
    // console.log(args[start])     // ƒ addHello(str){..
    var result = args[start].apply(this, arguments);
    // console.log('result = ', result)          // result = hello cyan

    while (i >= 0){
      result = args[i].call(this, result);
      i--;
    }
    return result;
  };

}

function addHello(str){
  return 'hello '+str;
}
function toUpperCase(str) {
  return str.toUpperCase();
}
function reverse(str){
  return str.split('').reverse().join('');
}

var composeFn=compose(reverse,toUpperCase,addHello);

console.log(composeFn('cyan'));  // NAYC OLLEH
// 复制代码上述过程有三个动作，「hello」、「转换大写」、「反转」，
// 可以看到通过 compose 将上述三个动作代表的函数合并成了一个，最终输出了正确的结果。

//*/


/*
// test-03 currying 柯里化 
// 把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。
//    接受一个单一参数；
//    返回接受余下的参数   而且   返回结果的  新函数；
// function add(a, b) {
//   return a + b;
// }

// console.log(add(1, 2)) // 3

// 假设函数 add 的柯里化函数是 addCurry，那么从上述定义可知，addCurry(1)(2) 应该实现与上述代码相同的效果，输出 3 。这里我们可以比较容易的知道，addCurry 的代码如下
// addCurry 是 add 的柯里化函数
function addCurry(a) {
  return function(b) {
      return a + b;
  }
}

console.log(addCurry(1)(2));  // 3
//*/


/*

// test-04 createCurry
// 但假设如果有一个函数 createCurry 能够实现柯里化，那么我们便可以通过下述的方式来得出相同的结果
// createCurry 返回一个柯里化函数
// var addCurry=createCurry(add);

// console.log(addCurry(1)(2));  // 3

// 可以看到，函数 createCurry 传入一个函数 add 作为参数，返回一个柯里化函数 addCurry，
// 函数 addCurry 能够处理 add 中的剩余参数。
// 这个过程称为函数柯里化，我们称 addCurry 是 add 的柯里化函数。

// 参数只能从左到右传递
function createCurry(func, arrArgs) {
  var args=arguments;
  console.log(args)        // 函数执行栈  后进先出
                              // Arguments [ƒ, callee: ƒ, Symbol(Symbol.iterator): ƒ]
                              // Arguments(2) [ƒ, Array(1), callee: ƒ, Symbol(Symbol.iterator): ƒ]
                              // Arguments(2) [ƒ, Array(2), callee: ƒ, Symbol(Symbol.iterator): ƒ]

  var funcLength = func.length;
  // console.log(funcLength)  
  var arrArgs = arrArgs || [];
  // console.log(arrArgs)         // addCurry没调用输出[]     调用之后[]   [1]   [1, 2]
  return function(param) {
      // console.log('addCurry没调用, 这儿都没执行')
      // console.log(param)       // addCurry调用的时候才是1 2 3
      var allArrArgs=arrArgs.concat([param])
      // console.log(arrArgs)     // []   [1]   [1, 2]

      // 如果参数个数小于最初的func.length，则递归调用，继续收集参数
      if (allArrArgs.length < funcLength) {
        // console.log('执行了')   
        // console.log(args)      // Arguments [ƒ, callee: ƒ, Symbol(Symbol.iterator): ƒ]  0: ƒ (a, b, c)
        // console.log('执行了几次呢')
        // console.log(func)         // ƒ (a, b, c) {  return a + b + c;

          return args.callee.call(this, func, allArrArgs);
      }

      // 参数收集完毕，则执行func
      return func.apply(this, allArrArgs);

      // call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。
      // 而apply()方法接受的是一个参数数组  call()是参数列表，
      // callee 是 arguments 对象的一个属性。它可以用于引用该函数的函数体内当前正在执行的函数。
      // 这在函数的名称是未知时很有用，例如在没有名称的函数表达式 (也称为“匿名函数”)内。
  }
}


// createCurry 返回一个柯里化函数
var addCurry=createCurry(function(a, b, c) {
  return a + b + c;
});
// console.log(addCurry(1))         // ƒ (param) {      ..

// console.log(addCurry(1)(2))      // ƒ (param) {      ..

console.log(addCurry(1)(2)(3));  // 6


//*/


/*
// test-05 createCurry完善
// 上述 createCurry 函数已经能够实现柯里化的过程，但是其并没有那么完美，
// 如果我希望以 addCurry(1, 2)(3) 的方式来调用呢？则上述代码并不能给出我们想要的结果，
// 所以我们要对 createCurry 做一个优化，优化后的 createCurry 代码如下

// 参数只能从左到右传递
function createCurry(func, arrArgs) {
  var args=arguments;
  var funcLength = func.length;
  var arrArgs = arrArgs || [];

  return function() {
      var _arrArgs = Array.prototype.slice.call(arguments);
      var allArrArgs=arrArgs.concat(_arrArgs)

      // 如果参数个数小于最初的func.length，则递归调用，继续收集参数
      if (allArrArgs.length < funcLength) {
          return args.callee.call(this, func, allArrArgs);
      }

      // 参数收集完毕，则执行func
      return func.apply(this, allArrArgs);
  }
}

// createCurry 返回一个柯里化函数
var addCurry=createCurry(function(a, b, c) {
  return a + b + c;
});

console.log(addCurry(1)(2)(3));  // 6
console.log(addCurry(1, 2, 3));  // 6
console.log(addCurry(1, 2)(3));  // 6
console.log(addCurry(1)(2, 3));  // 6

//*/


// test-6 createCurry应用
// 现在我们需要实现一个功能，将一个全是数字的数组中的数字转换成百分数的形式。
// 按照正常的逻辑，我们可以按如下代码实现
// function getNewArray(array) {
//   return array.map(function(item) {
//       return item * 100 + '%'
//   })
// }

// console.log(getNewArray([1, 0.2, 3, 0.4]));   // ['100%', '20%', '300%', '40%']


// 参数只能从左到右传递
function createCurry(func, arrArgs) {
  var args=arguments;
  var funcLength = func.length;
  var arrArgs = arrArgs || [];

  return function() {
      var _arrArgs = Array.prototype.slice.call(arguments);
      var allArrArgs=arrArgs.concat(_arrArgs)

      // 如果参数个数小于最初的func.length，则递归调用，继续收集参数
      if (allArrArgs.length < funcLength) {
          return args.callee.call(this, func, allArrArgs);
      }

      // 参数收集完毕，则执行func
      return func.apply(this, allArrArgs);
  }
}

// 而如果通过柯里化的方式来实现
function map(func, array) {
    return array.map(func);
}
var mapCurry = createCurry(map);

var getNewArray = mapCurry(function(item) {
    return item * 100 + '%'
})

console.log(getNewArray([1, 0.2, 3, 0.4]));   // ['100%', '20%', '300%', '40%']




// 未完待续
// https://juejin.im/post/5b4ac0d0f265da0fa959a785#heading-5