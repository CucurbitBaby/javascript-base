(function() {
  // H5以后有很多子线程, 子线程的运行环境的全局对象是self, self指向的就是window对象, self.slef属性也是指向window对象
  var root = typeof self == 'object' && self.self === self && self ||
    typeof global == 'object' && global.global === global && global ||
    this || {};

  var push = Array.prototype.push;

  // 无new化操作, $() jQuery是共享原型这样做的
  var _ = function(obj) {
    // 第一次调用this一定指向window, _()就能创建_实例了; 单例?
    if (!(this instanceof _)) return new _(obj);
    this.wap = obj;
  };

  _.unique = function(array, isSorted, callback) {
    var res = [];
    var seen;
    // 常用多态套路
    if (typeof isSorted !== 'boolean') {
      callback = isSorted;
      isSorted = false;
    }

    for (var i = 0, len = array.length; i < len; i++) {
      // 判断callback是否存在
      var computed = callback ? callback(array[i]) : array[i];

      // 判断数组是否排序过, 无序的数组当前和上一个对比对于去重没有意义
      if (isSorted) {
        // 与或非运算顺序
        if (!i || seen !== computed) {
          console.log('执行了=>');
          res.push(computed);
        }
        seen = computed;
      }
      // 如果没排序过, 用indexOf
      else if (res.indexOf(computed) === -1) {
        res.push(computed);
      }
    }
    return res;
  }

  _.each = function(arr, callback) {
    // console.log(arr);    封装成isArray的方法, 暂省
    if (arr && arr.length) {
      var length = arr.length;
      for (var i = 0; i < length; i++) {
        // 不管是true || false都执行了callback();
        // callback(数组成员里面的成员 name[item], 下标) 然后call一下当前的item
        // if(callback(arr[i], i) === false) {
        if (callback.call(arr[i], arr[i], i) === false) {
          // callback.call(this指向, 参数1, 参数2); 调用的就是外面each()的callback
          break;
        };
      }
    }
  };

  _.functions = function(obj) {
    var name = [];
    for (var key in obj) {
      name.push(key);
    }
    return name;
  };

  // _.map = function() {
  //   console.log('这里暂时是不能输出的!');
  // };

  _.map = function() {
    // console.log('_.map()中的this=>', this);
    console.log('这里就能输出了!');
  };

  // mixin 原型对象进行扩展 封装map(), unique() ..
  // 将静态属性方法添加到构造函数的原型上, 实例继承静态方法
  _.mixin = function(obj) {
    // 1.functions(obj) 遍历obj=>(_), 拿到自身所有静态方法 [map, each, unique, mixin] 把遍历到静态属性方法存放数组里
    // 通过回调再往_的原型上进行扩展
    // 伪each命名, 此方法只执行了一次; 
    /*
      _.each(_.functions(obj), function(map) {
        _.prototype.map = function() {

        };
      });
    */

    /*
        // _.each(_.functions(obj), function(name) {
        //   _.prototype[name] = function() {
        //     // 没有输出的map  执行的是这个匿名函数
        //   };
        // });

        // 虽然执行了_.静态方法, 但是没有传参到各个静态方法
        // _.each(_.functions(obj), function(name) {
        //   var func = obj[name];
        //   _.prototype[name] = function() {
        //     // console.log('tset 匿名函数')
        //     // 这里的this指向的是_实例
        //     return func.call(this);
        //   };
        // });
    */

    _.each(_.functions(obj), function(name) {
      // console.log('_.each()回调中的this=>', this);   // String {"each"}  String {"functions"}  String {"map"} ..
      var func = obj[name];
      _.prototype[name] = function() {
        // console.log('tset 匿名函数')
        // 这里的this指向的是_实例
        // console.log('_.prototype[name] = func中的this=>', this);  // _ {}  这里就是underscore实例 因为是_().map调用的
        // console.log(this.wap); // 拿到用户_([..])的数据
        // return func.call(this); // 这样的话, _.静态方法中就可以 调用 别的静态方法了?
        // 传参: 1.处理的数据, 2.回调
        console.log('arguments=>', arguments);
        var arg = [this.wap];
        // 合并数组
        push.apply(arg, arguments);

        return func.apply(this, arg);

      };
    });

  };

  // 判断node环境  
  if (typeof exports != 'undefined' && !exports.nodeType) {
    if (typeof module != 'undefined' && !module.nodeType && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  _.mixin(_);

})();