import React, { useState, useEffect, useRef } from 'react'
import src from './running-sprite-sheet.png'

export default {
  component: Canvas
}

export function _04_SpriteSheet() {
  return (
    <Canvas />
  )
}

function Canvas() {
  const [location, setLocation] = useState({ x: 0, y: 0 })

  const style = {
    body: {
      //readoutのmarginがはみ出る対策
      overflow: 'hidden',
      background: '#dddddd',
    },
    readout: {
      marginTop: '10px',
      marginLeft: '15px',
      color: 'blue',
    },
    canvas: {
      margin: '20px',
      background: 'white',
      border: 'thin inset rgba(100, 150, 230, 0.5)',
      cursor: 'pointer',
    },
  }

  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if(ref.current == null) return
    const canvas = ref.current
    const context = canvas.getContext('2d')!
    const spritesheet = new Image()
    spritesheet.src = src

    drawBackground(context)

    const onloadSpritesheet = () => {
      drawSpritesheet(context, spritesheet)
    }

    const onmousemoveCanvas = (e: MouseEvent) => {
      const location = windowToCanvas(canvas, e.clientX, e.clientY)

      drawBackground(context)
      drawSpritesheet(context, spritesheet)
      drawGuidlines(context, location.x, location.y)
      setLocation({ x: location.x, y: location.y })
    }

    spritesheet.addEventListener('load', onloadSpritesheet)
    canvas.addEventListener('mousemove', onmousemoveCanvas)


    return () => {
      spritesheet.removeEventListener('load', onloadSpritesheet)
      canvas.removeEventListener('mousemove', onmousemoveCanvas)
    }
  }, [])

  return (
    <div style={style.body}>
      <div style={style.readout}>{`{${location.x.toFixed(0)}, ${location.y.toFixed(0)}}`}</div>
      <canvas
        ref={ref}
        style={style.canvas}
        width='500'
        height='250'
      >
        Canvas not supported
      </canvas>
    </div>
  )
}

// キャンバスを基準にした座標を出すが、モバイルなどでは動作しない
// すべてのブラウザで確実にDOM要素の位置を検出する作業は非常に困難
const windowToCanvas = (canvas: HTMLCanvasElement, x: number, y: number) => {
  // windowを基準にした境界ボックス
  const bbox = canvas.getBoundingClientRect()
  return {
    // canvas要素のサイズと描画サーフェスのサイズが違いに備えて、比率をかけている
    x: (x - bbox.left)  * (canvas.width  / bbox.width),
    y: (y - bbox.top) * (canvas.height / bbox.height),
  }
}

const drawBackground = (context: CanvasRenderingContext2D) => {
  const width = context.canvas.width
  const height = context.canvas.height

  context.clearRect(0, 0, width, height)
  context.strokeStyle = 'lightgray'
  context.lineWidth = 0.5

  const lineSpace = 12
  let y = height
  while(y > lineSpace*4) {
    context.beginPath()
    context.moveTo(0, y)
    context.lineTo(width, y)
    context.stroke()
    y -= lineSpace
  }
}

const drawSpritesheet = (context: CanvasRenderingContext2D, spritesheet: HTMLImageElement) => {
  context.drawImage(spritesheet, 0, 0)
}

const drawGuidlines = (context: CanvasRenderingContext2D, x: number, y: number) => {
  context.strokeStyle = 'rgba(0, 0, 230, 0.8)'
  context.lineWidth = 0.5
  drawVerticalLine(context, x)
  drawHorizontalLine(context, y)
}

const drawHorizontalLine = (context: CanvasRenderingContext2D, y: number) => {
  context.beginPath()
  context.moveTo(0, y + 0.5)
  context.lineTo(context.canvas.width, y + 0.5)
  context.stroke()
}

const drawVerticalLine = (context: CanvasRenderingContext2D, x: number) => {
  context.beginPath()
  context.moveTo(x + 0.5, 0)
  context.lineTo(x + 0.5, context.canvas.height)
  context.stroke()
}
