import React, { useState, useEffect, useRef } from 'react'
import { css } from '@emotion/css'
import * as Clock from './clock'

export default {
  component: Canvas,
}

export function _08_ImageClock() {
  return (
    <Canvas />
  )
}

const style = {
  body: css({
    background: '#dddddd',
  }),
  canvas: css({
    display: 'none',
  }),
  snapshotImageElement: css({
    position: 'absolute',
    left: '10px',
    margin: '20px',
    border: 'thin solid #aaaaaa',
  }),
}

function Canvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  const [dataUrl, setDataUrl] = useState<string | null>(null)

  useEffect(() => {
    if(ref.current == null) return
    const canvas = ref.current
    const context = canvas.getContext('2d')!

    context.font = '15px Arial'

    const drawClock = () => {
      context.clearRect(0, 0, canvas.width,canvas.height);

      //fillStyleはfilltextに影響を影響を与えるのでデフォルトのスタイルをsaveしている
      context.save();

      context.fillStyle = 'rgba(255,255,255,0.8)';
      context.fillRect(0, 0, canvas.width, canvas.height);

      Clock.drawCircle(context, canvas);
      Clock.drawCenter(context, canvas);
      Clock.drawHands(context, canvas);

      context.restore();

      Clock.drawNumerals(context, canvas);

      setDataUrl(canvas.toDataURL())
    }

    const interval = setInterval(drawClock, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className={style.body}>
      <img className={style.snapshotImageElement} src={dataUrl ?? ''} />

      <canvas
        ref={ref}
        className={style.canvas}
        width='400'
        height='400'
      >
        Canvas not supported
      </canvas>
    </div>
  )
}
