# 封装函数式编程接口
> * 简单实现函数式编程。

----

## 设计思路
- [x] 风格设计 - 支持多范式编程调用。
- [x] 接口设计 - 健壮性。

## 特点

1. **支持函数式调用：**   

```javascript
_.map([1, 2, 3], function(i) {
  return i * 3;
});
// => [3, 6, 9]
```
2. **支持对象式调用：**   

```javascript
_([1, 2, 3]).map(function(i) {
  return i * 3;
});
// => [3, 6, 9]
```

## 相关

- [cat-clicker](https://github.com/wingmeng/cat-clicker)
