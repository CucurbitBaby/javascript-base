  // 需求: 给所有amount求和
  var orders = [
    { amount: 250 },
    { amount: 400 },
    { amount: 100 },
    { amount: 325 }
  ]

  // 1.使用for方式
  // var totalAmount = 0
  // for (var i = 0; i < orders.length; i++) {
  //   totalAmount += orders[i].amount
  // }

  // 2.使用reduce => reduce能解决filter和map的等for问题 是个supper方法
  // reduce接收4个参数比如第一个形参sum, sum对应一个累加变量
  // 被遍历元素会在每一步迭代中 传递给第二个形参, 这里写作 order
  var totalAmount = orders.reduce(function(sum, order, index) {
    console.log("hello 第"+ index +"次", sum, order)
    return sum + order.amount
  }, 0) // 起始值: 可以是一个对象或者原始值类型 

  console.log(totalAmount)    // 1075

  /*
    hello 第0次 0 { amount: 250 }
    hello 第1次 250 { amount: 400 }
    hello 第2次 650 { amount: 100 }
    hello 第3次 750 { amount: 325 }
  */