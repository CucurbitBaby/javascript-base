  // 需求: 获取数组所有name的属性
  var animals = [
    { name: 'Fluffykins', species: 'rabbits' },
    { name: 'Caro',       species: 'dog' },
    { name: 'Hamilton',   species: 'dog' },
    { name: 'Harold',     species: 'fish' },
    { name: 'Ursula',     species: 'cat' },
    { name: 'Fluffykins', species: 'rabbits' },
    { name: 'Jimmy',      species: 'fish' }
  ]

  // 1.for循环方式
  // var names = []
  // for (var i = 0; i < animals.length; i++) {
  //   names.push(animals[i].name)
  // }

  // 2.使用map映射; filter通过callback返回的布尔值判断保留还是过滤当前的item;
  // map也会遍历每个元素; 不需要callback返回布尔值;map的回调是一个变换函数
  // var names = animals.map(function(animal) {
  //   return animal.name
  //   // return animal.name + 'is a' + animal.species
  // })

  // 3.代码就越短 bug越少
  // var names = animals.map(function(animal) { animal.name })
  var names = animals.map( animal => animal.name )


  console.log(names)

/*

  [
    'Fluffykins',
    'Caro',
    'Hamilton',
    'Harold',
    'Ursula',
    'Fluffykins',
    'Jimmy'
  ]
  ..
*/