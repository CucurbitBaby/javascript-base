/*
 * @Author: cucurbitbaby
 * @Date:   2020-02-17 06:40:52
 * @Last Modified by: cucurbitbaby
 * @Last Modified by: 2020-02-17 06:40:52
 * 
 * 插件 && 依赖插件(jQuery)
 */
(function(root, factory, plug) {
  factory(jQuery, plug);
})(this, function(jQuery, plug) {
  // 默认参数配置
  var config = {
    initEvent: "input",
    plugName: 'dr'
  }
  // 校验引擎
  var _RELES_ = {
    regexp: function(data) {
      // console.log(this);      // window, fn.call(_this) 指向当前Element的jq包装对象
      // console.log(this.val());
      // console.log(data);

      return new RegExp(data).test(this.val());
    },
    required: function() {
      return this.val(); // 没有输入就是undefined,返回false
    }
  }



  $.fn[plug] = function(options) { // 接收插件方法的实参
    if (!this.is("form")) return;
    this.$find = this.find("input");

    // extend 配置
    $.extend(this, config, options);

    this.$find.on(this.initEvent, function() { // 插件 默认配置 -> 用户配置
      var _this = $(this);
      _this.siblings("p").remove();
      $.each(_RELES_, function(key, fn) { // key,value
        var $fileName = _this.data(config.plugName + "-" + key); // dr-xxx
        var $message = _this.data(config.plugName + "-" + key + "-message"); // dr-xxx
        // console.log($fileName);
        // console.log($message);

        // 如果有值, HTML设置了regexp正则, 调用校验引擎的方法fn就行
        if ($fileName) {
          var result = fn.call(_this, $fileName);
          if (!result) { // 不成功

            console.log('看看我执行了几次 => ', fn.name)
            _this.after("<p class='ipt-error-img' style='color: red;'>" + $message + "</>").next().fadeIn(2000);
          }
        }

      })
    })
  }

  // 扩展接口
  // console.log($.fn[plug] === jQuery.prototype.dataResult);  // ture
  $.fn[plug].extension = function(options) {
    // console.log(options);
    // 只要dataResult()初始化了;  _RELES_就产生了闭包被缓存了, 因为on的事件里面用到了_RELES_
    // 然后扩展校验引擎_RELES_,  on事件的代码重新获取_RELES_的扩展新值, 重新校验
    $.extend(_RELES_, options)
    console.log(_RELES_)
  }

}, "dataResult");