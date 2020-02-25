const compileUtil = {
  getVal(expr, vm) {
    // split之后 [msg], [person, name]
    return expr.split('.').reduce((data, curentValue) => {
      // console.log(data);              // 实例
      // console.log(curentValue);       // msg, person, name
      // console.log(data[curentValue]); // 学习mvvm实现原理, {name: "小马哥哥哥哥哥哥", age: 18, fav: "小姐姐"},  3.小马哥哥哥哥哥哥
      // 每一次return的结果会给下一次遍历的回调的data
      return data[curentValue] // 这里的return会给下一次遍历的data, [msg].length == 1 只会遍历一次

      // 实例数据, vm.$data(nitialValue可选) 作为第一次调用 callback函数时的第一个参数的值。
    }, vm.$data); 
  },
  text(node, expr, vm) { // expr: msg  => 学习mvvm实现原理
    // const value = vm.$data[expr];   
    // <div v-text='person.name'></div> 如果是 <div v-text='person.name'></div>  使用getVal迭代

    let value;
    if(expr.indexOf('{{') !== -1) {
      // {{person.name}} --{{person.age}}, ... {{xxx}}
      value = expr.replace(/\{\{(.+?)\}\}/g,(...args)=> {
        // console.log(args);
        return this.getVal(args[1], vm);
      })
    }else {
      value = this.getVal(expr, vm);
    }
    this.updater.textUpdater(node, value);
  },
  html(node, expr, vm) {
    const value = this.getVal(expr, vm);
    this.updater.htmlUpdater(node, value);
  },
  model(node, expr, vm) {
    const value = this.getVal(expr, vm);
    this.updater.modelUpdater(node, value);
  },
  // 事件稍后写
  on(node, expr, vm, enventName) {
    let fn = vm.$options.methods && vm.$options.methods[expr];
    node.addEventListener(enventName, fn.bind(vm), false);
  },
  // 更新对象, 对象套对象
  updater: {
    textUpdater(node, value) {
      // console.log(node, value);
      node.textContent = value;
    },
    htmlUpdater(node, value) {
      node.innerHTML = value;
    },
    modelUpdater(node, value) {
      node.value = value;
    },
    
  }
}

// 指令解析
class Compile {
  constructor(el, vm) {
    // 1. 判断el是否是元素节点
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    this.vm = vm;
    // console.log(this.el);      // #app
    // console.log(this.vm);      // MVue对象
    // 2. 拿出所有节点拿来替换, 回流重绘不如内容中文档碎片对象(虚拟DOM)一把梭 性能好 
    const fragment = this.node2Fragment(this.el);

    // 3. 编译模板
    this.compile(fragment);

    // 4. 一把梭进去
    this.el.appendChild(fragment)
  }
  isElementNode(node) {
    return node.nodeType === 1;
  }
  compile(fragment) {
    // 1. 获取每一个子节点
    const childNodes = fragment.childNodes;
    // 强制转换成数组
    [...childNodes].forEach(child => {
      if (this.isElementNode(child)) {
        // 元素节点
        // 编译元素节点  v-html,v-text,v-model 不同指令,处理不同
        this.compileElement(child)
      } else {
        // 文本节点
        // 编译文本节点
        this.compileText(child)
      }

      // 虚幻遍历不是循环编译
      if (child.childNodes && child.childNodes.length) {
        this.compile(child);
      }
    })
  }
  // 编译元素节点
  compileElement(node) {
    // console.log(node);         // DOM元素, 到<ul>...</ul>跟着输出里面的内容, 递归了
    const attributes = node.attributes;
    // console.log(attributes)    // 集合
    // 强制转数组
    [...attributes].forEach(attr => {
      // 结构赋值
      const { name, value } = attr;
      // console.log("name => ", name);                        // name =>  v-text, v-html, type, v-model, v-on:click
      // console.log("value => ", value);                      // value =>  msg, htmlStr, text, msg, showsomething

      if (this.isDirective(name)) {       // 是一个指令 v-属性
        const [, directive] = name.split('-'); // - 分割
        const [dirName, enventName] = directive.split(':'); // - 分割之后, 再用: 分割
        // console.log('directive => ', directive);            // directive =>  text, html, model, on:click
        // console.log('dirName => ', dirName);                // dirName =>  text, html, model, on
        // console.log('enventName => ', enventName);          // undefined*6, click

        // 更新数据 数据驱动视图
        // 根据 v-后面的value 当作 key 去compileUtil[key]执行
        compileUtil[dirName](node, value, this.vm, enventName);// 这里就已经编译了

        // 删除有指令的标签上的v-属性
        node.removeAttribute('v-' + directive);
      }else if(this.isEventName(name)) {  // @click="handlerClick"
        let [, eventName] = name.split('@');

        compileUtil['on'](node, value, this.vm, eventName);
      }
    })
  }
  // 编译文本节点
  compileText(node) {
    // console.log(node.textContent);     // {{}} v-text: 还包括</div>结尾开头的空白以及文本
    const content = node.textContent;
    if(/\{\{(.+?)\}\}/.test(content)) {
      // console.log(content);            // {{person.name}} -- {{person.age}}, {{person.fav}}, ..
      compileUtil['text'](node, content, this.vm);
    }
  }
  // 判断指令
  isDirective(attrName) {
    return attrName.startsWith('v-');
  }
  // 判断@语法糖
  isEventName(attrName) {
    return attrName.startsWith('@');
  }
  node2Fragment(el) {
    // 1. 创建文档碎片对象
    const f = document.createDocumentFragment();
    let firstChild;
    while (firstChild = el.firstChild) {
      f.appendChild(firstChild);
    }
    // 循环一级DOM && #text
    return f;
  }
}


class MVue {
  constructor(options) {
    this.$el = options.el;
    this.$data = options.data;
    this.$options = options;
    if (this.$el) {
      // 1. 实现一个数据的观察者
      // 2. 实现一个指令的解析器
      new Compile(this.$el, this);
    }
  }
}