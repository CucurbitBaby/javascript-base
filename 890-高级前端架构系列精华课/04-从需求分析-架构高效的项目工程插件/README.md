# jquery-webapp-component

> 慕淘网之站点导航实现--分步代码

#### Build Setup

``` bash
# install dependencies
npm install -g http-live-server

# serve with hot reload at localhost:8080
live-server
```

#### 1. 表单校验插件
##### <font style="font-size:16px;">1.1 jQuery插件基本写法</font>
```js
/*
 * @Author: cucurbitbaby
 * @Date:   2020-02-17 06:40:52
 * @Last Modified by: cucurbitbaby
 * @Last Modified by: 2020-02-17 06:40:52
 * 
 * 插件 && 依赖插件(jQuery)
 */


(function(root, factory, plug){
  // 调用传递进来的函数
  factory();
})(this, function(){}, "dataResult");    // this, 工厂函数, 插件名
```
##### <font style="font-size:16px;">1.1 $.fn</font>
> $.extend和$.fn.extend区别: https://www.cnblogs.com/leejersey/p/4125711.html

* $.extend(object);是为了扩展jquery本身，为类添加新的方法
```js
   $.extend({

        add:function(a,b){

            return a+b;
        }

    })

    $.add(5,8) //return  13
```
* $.fn.extend(obj);给JQUERY对象添加方法。
```js
  $.fn.extend({

      clickwhile:function(){

          $(this).click(function(){

               alert($(this).val()) 

          })

      }

  })
  $('input').clickwhile();  //  当点击输入框会弹出该对象的Value值
  // 注意调用时候前面是有对象的。即$('input') 这么个东西。
  // 可以理解为添加静态方法，也就是全局方法
```
* $.fn.extend(obj); $.fn 中的fn是什么意思？ 其实是prototype，即$.fn=$.protoytpe;
```js
(function(root, factory, plug){
  factory(jQuery, plug);
})(this, function(jQuery, plug){
  // console.log(plug);
  // jQuery.prototype
  $.fn[plug] = function() {
    console.log('插件安装成功！');
  }
}, "dataResult");
// 注意没有，这边的调用直接调用，前面不用任何对象。直接$.+方法名
```
##### <font style="font-size:16px;">1.2 限制调用者为form表单</font>
* 只可以form表单元素才可以调用插件的方法
```js
(function(root, factory, plug){
  factory(jQuery, plug);
})(this, function(jQuery, plug){

  $.fn[plug] = function() {
    if(!this.is("form")) return;
    console.log('插件安装成功！');
  }
}, "dataResult");
```

##### <font style="font-size:16px;">1.3 $find属性缓存所有子元素</font>
> 绑定事件
```js
(function(root, factory, plug){
  factory(jQuery, plug);
})(this, function(jQuery, plug){

  $.fn[plug] = function() {
    if(!this.is("form")) return;
    // 找到form里所有input(用户输入)子元素
    this.$find = this.find("input");
    console.log(this.$find);

    // 我怎么知道一定是input事件呢?  非固定的东西都不要写死
    this.$find.on("input", function() {
      console.log(this.value);
    })
  }
}, "dataResult");


```
##### <font style="font-size:16px;">1.4 插件用默认/用户配置</font>
> 插件化思想, 比如事件, 或者很多非固定的东西, 不能写死
```js
(function(root, factory, plug){
  factory(jQuery, plug);
})(this, function(jQuery, plug){
  // 默认参数配置
  var config = {
    initEvent: "input",
    plugName: 'dr'
  }
  $.fn[plug] = function(options) {    // 接收插件的实参
    if(!this.is("form")) return;
    this.$find = this.find("input");

    // $.extend(this, config);  
    // console.log(this.initEvent);

    // extend 配置
    // this没有的, config, options都可以可以扩展过去
    $.extend(this, config, options);  
    // console.log(this.initEvent);

    // this
    // console.log(this instanceof jQuery);  // true

    // 校验引擎
    var _RELES_ = {
      regexp: function() {

      },
      required: function() {

      }
    }

    // 我怎么知道一定是input事件呢?  非固定的东西都不要写死
    this.$find.on(this.initEvent, function() {   // 插件 默认配置 -> 用户配置
      // this
      // console.log(this);      // 绑定事件的Element

      var _this = $(this);

      // console.log($(this).data());
      // {
      //   drRequiredMessage: "输入不能为空"
      //   drRequired: true
      //   drRegexpMessage: "请输入合法邮箱"
      //   drRegexp: "^\w+@\w+\.\w+&"
      // }



    })
  }
}, "dataResult");

// 用户配置 >= 默认配置
$('.data').dataResult({
  intiEvent: "blur"
});
    
```
#### 第3步
#### 第4步
