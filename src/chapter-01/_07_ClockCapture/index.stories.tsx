import React, { useState, useEffect, useRef } from 'react'
import { css } from '@emotion/css'
import * as Clock from './clock'

export default {
  component: Canvas,
}

export function _07_ClockCapture() {
  return (
    <Canvas />
  )
}

const style = {
  body: css({
    overflow: 'hidden',
    background: '#dddddd',
    boxSizing: 'border-box',
  }),
  space: css({
    width: '410px',
    height: '410px',
    margin: '5px 5px 0px 5px',
  }),
  canvas: css({
    background: 'white',
    position: 'absolute',
    border: 'thin inset #aaaaaa',
  }),
  snapshotImageElement: css({
    background: 'white',
    position: 'absolute',
    border: 'thin inset #aaaaaa',
  }),
  hidden: css({
    display: 'none',
  }),
}

function Canvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const [snapshotting, setSnapshotting] = useState(false)
  const [dataUrl, setDataUrl] = useState<string | null>(null)

  useEffect(() => {
    if(ref.current == null) return
    const canvas = ref.current
    const context = canvas.getContext('2d')!

    context.font = `15px Arial`

    Clock.draw(context)
    intervalRef.current = setInterval(Clock.draw, 1000, context)

    return () => {
      if(intervalRef.current != null) clearInterval(intervalRef.current)
    }
  })

  const onClick = () => {
    if(!snapshotting) {
      setDataUrl(ref.current!.toDataURL())
      if(intervalRef.current != null) clearInterval(intervalRef.current)
      setSnapshotting(true)
    } else {
      const canvas = ref.current!
      const context = canvas.getContext('2d')!
      setSnapshotting(false)
      intervalRef.current = setInterval(Clock.draw, 1000, context)
    }
  }

  return (
    <div className={style.body}>
      <div>
        <button onClick={onClick}>{!snapshotting ? 'Take snapshot' : 'Return to Canvas'}</button>
      </div>

      <div className={style.space}>
        <img
          className={snapshotting ? style.snapshotImageElement : style.hidden}
          src={dataUrl ?? undefined}
        />

        <canvas
          ref={ref}
          className={!snapshotting ? style.canvas : style.hidden}
          width='400'
          height='400'
        >
          Canvas not supported
        </canvas>
      </div>
    </div>
  )
}

