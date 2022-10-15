import React, { useEffect, useRef } from 'react'
import * as Clock from './clock'

export default {
  component: Canvas,
}

export function _03_Clock() {
  return (
    <Canvas />
  )
}

function Canvas() {
  const style = {
    canvas: {
      margin: '10px',
      padding: '10px',
      background: 'white',
      border: 'thin inset #aaaaaa'
    }
  }

  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if(ref.current == null) return
    const canvas = ref.current
    const context = canvas.getContext('2d')!

    context.font = `15px Arial`

    Clock.draw(context, canvas)
    const timerId = setInterval(Clock.draw, 1000, context, canvas)

    return () => clearInterval(timerId)
  })

  return (
    <canvas
      ref={ref}
      style={style.canvas}
      width='450'
      height='450'
    >
      Canvas not supported
    </canvas>
  )
}

