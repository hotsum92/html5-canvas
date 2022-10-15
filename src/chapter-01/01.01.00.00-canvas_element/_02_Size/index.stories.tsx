import React, { useEffect, useRef } from 'react'

export default {
  component: Canvas,
}

export function _02_Size() {
  return (
    <Canvas />
  )
}

function Canvas() {
  const style = {
    canvas: {
      margin: '10px',
      padding: '10px',
      background: '#ffffff',
      border: 'thin inset #aaaaaa',
      //cssでサイズを設定すると要素のみにサイズが設定される
      //デフォルトのwidth: 300スクリーンピクセル, height: 150スクリーンピクセルなので拡大されて表示される
      width: 600,
      height: 300,
    }
  }

  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if(ref.current == null) return
    const canvas = ref.current
    const context = canvas.getContext('2d')!
    context.font = '38pt Arial'
    context.fillStyle = 'cornflowerblue'
    context.strokeStyle = 'blue'
    context.fillText('Hello Canvas', canvas.width/2 - 150, canvas.height/2 + 15)
    context.strokeText('Hello Canvas', canvas.width/2 - 150, canvas.height/2 + 15)
  })

  return (
    <canvas
      ref={ref}
      style={style.canvas}
      //属性にサイズを設定すると要素と描画サーフェースのサイズの両方に対して設定される
      /*
      width='600'
      height='300'
      */
    >
      Canvas not supported
    </canvas>
  )
}
