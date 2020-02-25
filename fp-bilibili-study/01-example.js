/*

  1.Higher-order functions - Part 1 of Functional Programming 
  1.高阶函数——函数式编程的第1部分
  example     例子
  triple      三倍
  waffle      拿不定注意,胡扯
  Composition 作文?
  composable  可组合的
  compose     组成

*/


// lesson-01 函数作为参数传递=>高阶函数
/*

  function triple(x) {
    return x * 3
  }


  var waffle = triple

  var result = waffle(30)

  console.log(result)    // 90

//*/


// lesson-02 找出species='dog'的对象
//*

  var animals = [
    { name: 'Fluffykins', species: 'rabbits' },
    { name: 'Caro',       species: 'dog' },
    { name: 'Hamilton',   species: 'dog' },
    { name: 'Harold',     species: 'fish' },
    { name: 'Ursula',     species: 'cat' },
    { name: 'Fluffykins', species: 'rabbits' },
    { name: 'Jimmy',      species: 'fish' }
  ]

  // 2-1 普通for循环
  // var dogs = [];
  // for (var i = 0; i < animals.length; i++) {
  //   if(animals[i].species === 'dog')
  //     dogs.push(animals[i])
  // }

  // 2-2 使用高阶函数filter: 
  // 1.filter接收一个回调函数作为参数;宿主函数会回调 回调函数
  // 2.filter的回调函数需要返回一个布尔值true/false;
  // var dogs = animals.filter(function(animal) {
  //   return animal.species === 'dog'
  // })

  // 2-3 重点哦, 利于理解之后的compose
  var isDog = function(animal) {
    return animal.species === 'dog'
  }
  var dogs = animals.filter(isDog)

  // 扩展reject函数, Array.prototype上
  // var otherAnimals = animals.reject(isDog)

  console.log(dogs)
  // [
  //   { name: 'Caro', species: 'dog' },
  //   { name: 'Hamilton', species: 'dog' }
  // ]

//*/