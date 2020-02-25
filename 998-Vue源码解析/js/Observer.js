class Watcher {
  constructor(vm, expr, cb) {
    this.vm = vm;
    this.expr = expr;
    this.cb = cb;
    // 先获取旧值保存
    this.oldVal = this.getOldValue()
  }
  // 获取旧值
  getOldValue() {
    // 添加静态属性
    Dep.target = this;

    let oldVal = compileUtil.getVal(this.expr, this.vm);
    // 获取到老的值之后一定要销毁

    // 销毁静态属性
    Dep.target = null;
    return oldVal;
  }
  update() {
    // 获取新值
    let newVal = compileUtil.getVal(this.expr, this.vm);
    // 对比
    if(newVal !== this.oldVal) {
      // 改变了, 给回调
      // console.log('cb执行')
      this.cb(newVal);
    }
  }
}
// 收集wacher,通知
class Dep {
  constructor() {
    // 相当于ES5中 构造函数中的this.sub = []
    this.subs = [];
  }
  // 相当于ES5中 构造函数中的 Dep.prototype.addSub = function
  // 收集观察者
  addSub(watcher,key) {
    // 到这里你就能完全看明白了吧？
    // 此时watcher(编译时, 每一个需要编译显示的数据 => 指令方法时 已经创建)
    // watcher一旦创建, this.oldVal就保存了, 并且把this(包括了this.oldValue
    // , cb,expr,vm,..) 指向 Dep.target 静态属性
    // console.log(watcher);

    // 这里输出更有意思
    // 因为初始化的时候new dep, this.subs = [], 所有有多少个属性, new Observer()时候就有多个空[]输出
    // 后面每一次get() 编译时 new watcher 都会添加进list
    // console.log('key只是用看看调试,key=>',key,this.subs);

    // console.log(this.subs);

    this.subs.push(watcher);
    // console.log('addSub this.subs => ', this.subs);   
  }
  // 通知观察者去更新
  notify() {
    console.log('观察者: ', this.subs);
    this.subs.forEach(w => w.update())
  }

}

// 劫持 监听所有属性  发布者 ? 订阅者 ? All no
class Observer {
  constructor(data) {
    // 关键一次输出
    this.observe(data);
  }

  observe(data) {
    // 不满足递归入口, 即递归出口
    if(data && typeof data === 'object') {
      /*
        {
          age: 18,
          person: {
            name: "张飞"
          },
          fav: {
            a: '爱好a',
            b: '爱好v'
          }
        } 
      */
      // console.log('执行了几次呢? data =', data);

      // 是对象的话就遍历属性
      Object.keys(data).forEach(key => {
        // console.log(key);    // person, name, age, fav, msg, htmlStr 
        
        // console.log('forEach data => ', data);
        // console.log('\r\n\r\n-------------------------\r\n\r\n');

        this.defineReactive(data, key, data[key]);
      })
    }
  }
  // 通过 object.defineProperty方法对对象属性进行劫持
  defineReactive(data, key, value) {


    // 递归遍历
    this.observe (value);
    // count++
    // console.log(count);
    // console.log('Object.defineProperty(key => ', key);

    // console.log(data);       // 关键输出, chrome很智能

    // 劫持数据的时候, 创建依赖数据器
    const dep = new Dep();

    // console.dir('Object.defineProperty(data => ');
    // console.dir(data)
    // console.log('Object.defineProperty(key => ', key);
    // console.log('\r\n\r\n------------------------------------------\r\n\r\n')

    // console.log('我被输出几次呢?', key)    // 6次

    // Object.defineProperty 只执行6次 每次拿到key的时候, 遍历+递归阶段指针, 无同级属性===Object
    // 每次的data就是key 所属对象
    Object.defineProperty(data, key, {
      // 是否可遍历
      enumerable: true,
      // 是否可配置
      configurable:false,
      get() {
        // console.log('初始化执行了');      // ok
        // 订阅数据变化时, 往Dep(订阅器数组=>Watcher s)中添加观察者
        // console.log(' Dep.target => ',  Dep.target)
        

        // 这里超级的有意思 vue(实参个数+页面上的)
        // i++;
        // console.log(i, key);
        
        // 外部的new dep只执行6次 同一个key的访问, get()可以是多次, 页面上需要编译的指令模板都需要+1次
        // 那么外部的new dep的AO 和 这里使用就是用一个dep哦!!！(this.list = [])
        // 再参考一下发布订阅者模式:
        // type属性类型(key): [观察者1, 观察者2, 观察者3, ...]

        Dep.target && dep.addSub(Dep.target, key);
        // console.log(Dep.target)
        // console.log(key)

        return value;
      },
      // 采用箭头函数在定义时绑定this的定义域
      set: (newVal)=> {
        this.observe(newVal);
        if(newVal !== value) {
          value = newVal;
        }
        // 告诉Dep通知变化
        dep.notify();
      }

    })
  }
}

// var i = 0;

  // data: {
  //   person: {
  //     name: "小马哥哥哥哥哥哥",
  //     age: 18,
  //     fav: "小姐姐"
  //   },
  //   msg: "学习mvvm实现原理",
  //   htmlStr: "<div>htmlStr的数据</div>"
  // }


// var count = 0;


/*

Observer 是new Vue()实例的时候 new Observer(this.$data);
  注意顺序:
    new Observer(this.$data); 
    new Compile(this.$el, this);


劫持监听属性的时候
  new Dep()
   get()
   Dep.target 初始化都是undefined,
   只有 new Compile(this.$el, this)的时候, new Watcher(vm, expr, (newVla) => 更新fn
   Dep.target才开始有值   this.old 被存储 Dep.target = null,
   set() 
   对比this.old
  

  Watcher 是解析编译页面(挂载点中)每个DOM 或者 {{}} 需要用数据new的 
  new Watcher(vm, expr, (newVla) => 更新fn


  参考地址: https://www.bilibili.com/video/av80611222?p=5
  代码: https://github.com/SUNYunZeng/ImitateVue



  定义Dep容器及Watcher对象对数据变化进行监听
  class Watcher{


  // Dep类存储watcher对象，并在数据变化时通知watcher
  class Dep{


  oldValue(具体数据) 会在 初始化的模板编译获取并存储
  set的时候对比更新,
   


*/