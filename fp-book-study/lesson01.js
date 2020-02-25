// 然后吹了一波 纯函数(同输入同输出, 无副作用)和函数是一等公民(可以作为参数传入另一个函数，也可以作为别的函数的返回值) ..

/*

// 结合律（assosiative）
add(add(x, y), z) == add(x, add(y, z));

// 交换律（commutative）
add(x, y) == add(y, x);

// 同一律（identity）
add(x, 0) == x;

// 分配律（distributive）
multiply(x, add(y,z)) == add(multiply(x, y), multiply(x, z));

//*/

/*

// test-04 重命名一下
var add = function(x, y) { return x + y };
var multiply = function(x, y) { return x * y };

var flock_a = 4;
var flock_b = 2;
var flock_c = 0;

var result = add(multiply(flock_b, add(flock_a, flock_c)), multiply(flock_a, flock_b));
//=>16

//*/


/*

// test-03 函数式的写法
//鸟群结队conjoin
var conjoin = function(flock_x, flock_y){
  return flock_x + flock_y;
}
//鸟群繁殖breed
var breed = function(flock_x, flock_y){
  return flock_x * flock_y;
}
//鸟群a
var flock_a = 3;
//鸟群b
var flock_b = 2;
//鸟群c
var flock_c = 1;
var result = conjoin(breed(conjoin(flock_a,flock_c),flock_b), breed(flock_a, flock_b));
console.log(result); //==>16

//*/


/*
作者想利用这个0繁殖出杂种
凸显他后面要吹的函数式编程
你可以理解  如果不是0就不是他这样计算了
鸟群必须结队一次 然后 和另外一个鸟群 杂交生出来的杂种就是作者说的海鸥

数学模型

a:4 b:2 c:0

a  b      c  6*0

a  c      b  4*2
b  c      a  2*4

a:3 b:2 c:1

a  b      c  8
a  c      b  5
b  c      a  9


*/


/*
// test-02  ab结队
// 创建鸟群
var Flock = function(n) {
  this.seagulls = n;
};

// 鸟群结队
Flock.prototype.conjoin = function(other) {
  this.seagulls += other.seagulls;
  return this;
};

// 鸟群繁殖
Flock.prototype.breed = function(other) {
  this.seagulls = this.seagulls * other.seagulls;
  return this;
};

var flock_a = new Flock(4);
var flock_b = new Flock(2);
var flock_c = new Flock(0);

var result = flock_a
                  .conjoin(flock_c)
                  .breed(flock_b)
                  .conjoin(flock_a.breed(flock_b)).seagulls;
//=> 32


console.log(result)

//*/

/*
// test-01 函数执行顺序检测  // 1 2 3 4
// 创建鸟群
var Flock = function(n) {
  this.seagulls = n;
};

// 鸟群结队
Flock.prototype.conjoin = function(other, order) {
  console.log(order)
  this.seagulls += other.seagulls;
  return this;
};

// 鸟群繁殖
Flock.prototype.breed = function(other, order) {
  console.log(order)
  this.seagulls = this.seagulls * other.seagulls;
  return this;
};

var flock_a = new Flock(4);
var flock_b = new Flock(2);
var flock_c = new Flock(0);

var result = flock_a.conjoin(flock_c, 1).breed(flock_b, 2).conjoin(flock_a.breed(flock_b, 3), 4).seagulls;

console.log(result)

//*/