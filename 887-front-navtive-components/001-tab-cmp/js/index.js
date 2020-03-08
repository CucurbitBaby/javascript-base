/**
 * 定义一个Tab类
 * @param {String} tabId tab的id
 */

function Tab(tabId) {

  this.init(tabId);
}

/**
 * 入口函数
 * @param { String } tabId tab的id
 */

Tab.prototype.init = function(tabId) {
  // 获取相应的DOM
  var tabWrap = this.tabWrap = document.querySelector(tabId);
  this.tabs = tabWrap.querySelectorAll('.tab-head li');
  this.panels = tabWrap.querySelectorAll('.tab-panel-wrap .tab-panel');

  // 记录上一次选择的序号  
  // 初始化active(0)之前 curren随便赋值一个不等于0的(反正会更新), 使active()中的条件成立
  this.current = 2;

  this.active(0);
  this.event();
};


/**
 * 控制选中效果函数
 * @param {Number} index 默认显示第几个面板
 */

Tab.prototype.active = function(index) {

  if (index !== this.current) {
    // 显示当前
    this.tabs[index].classList.add('active');
    this.panels[index].classList.add('active');

    // 结束上一次的选择
    this.tabs[this.current].classList.remove('active');
    this.panels[this.current].classList.remove('active');

    // 保存
    this.current = index;
  }
};


/**
 * 监听事件
 */


Tab.prototype.event = function() {
  // 保存当前的this;
  var _this = this;
  var len = this.tabs.length;

  for(let i = 0; i < len; i++) {
    // 给tab添加监听
    this.tabs[i].addEventListener('click', function(event) {
      _this.active(i)
    }, false) 
  }
}


var tab1 = new  Tab('#tab1');
tab1.active(1);