import React, { useEffect, useRef } from 'react'

export default {
  component: Canvas,
}

export function _01_HelloCanvas() {
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
      /*
        接尾字pxは許容されるもののCanvas仕様ではみとめられていないので、使用するべきではない。
        仕様では、負でない整数のみ。

        デフォルトのキャンバスサイズは300x150スクリーンピクセル
       */
      width='600'
      height='300'
    >
      {/* canvas要素がサポートされていないブラウザでのみ表示される(フォールバックコンテンツ) */}
      Canvas not supported
    </canvas>
  )
}
