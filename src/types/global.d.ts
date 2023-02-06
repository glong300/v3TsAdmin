declare global {
  declare type TimeoutHandle = ReturnType<typeof setTimeout>
  declare type IntervalHandle = ReturnType<typeof setInterval>
}

// 扩展 Math 对象
interface Math {
  tween: any
}
