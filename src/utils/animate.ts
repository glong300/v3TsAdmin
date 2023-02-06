interface AnimateOptions {
  duration: number
  timing: (a1: number) => number
  draw: (a1: number) => void
}

const animate = ({ duration, timing, draw }: AnimateOptions) => {
  const start = performance.now()
  console.log('start :>> ', start)

  requestAnimationFrame(function animate(time) {
    // timeFraction 从 0 增加到 1
    let timeFraction = (time - start) / duration
    if (timeFraction > 1) timeFraction = 1
    console.log('timeFraction :>> ', time)

    // 计算当前动画状态
    const progress = timing(timeFraction)

    draw(progress)

    if (timeFraction < 1) requestAnimationFrame(animate)
  })
}

export default animate
