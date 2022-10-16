import React, { useState, useEffect, useRef } from 'react'
import { css } from '@emotion/css'
import src from './arch.png'

export default {
  component: Canvas
}

const style = {
  body: css({
    overflow: 'hidden',
    background: 'rgba(100, 145, 250, 0.3)',
  }),
  canvas: css({
    marginLeft: '20px',
    marginRight: 0,
    marginBottom: '20px',
    border: 'thin solid #aaaaaa',
    cursor: 'crosshair',
    padding: 0,
  }),
  controls: css({
    margin: '20px 0px 20px 20px',
  }),
  rubberband: (x: number, y: number,
               width: number, height: number,
               show: boolean,
  ) => css({
    position: 'absolute',
    left: `${x}px`,
    top: `${y}px`,
    width: `${width}px`,
    height: `${height}px`,
    border: '3px solid yellow',
    cursor: 'crosshair',
    display: show ? 'inline' : 'none',
  }),
}

export function _06_Rubberbands() {
  return (
    <Canvas />
  )
}

function Canvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef(new Image())

  const {
    rubberband,
    startRubberband,
    stretchRubberband,
    endRubberband,
  } = useRubberband()

  useEffect(() => {
    if(ref.current == null) return
    const canvas = ref.current
    const context = canvas.getContext('2d')!

    imageRef.current.src = src

    const onloadImage = () => {
      drawImage(context, imageRef.current)
    }

    const onmousedownCanvas = (e: MouseEvent) => {
      e.preventDefault()

      const x = e.clientX
      const y = e.clientY

      startRubberband(x, y)
    }

    const onmousemoveWindow = (e: MouseEvent) => {
      e.preventDefault()
      const x = e.clientX
      const y = e.clientY

      stretchRubberband(x, y)
    }

    const onmouseupWindow = (e: MouseEvent) => {
      e.preventDefault()
      endRubberband(context)
    }

    imageRef.current.addEventListener('load', onloadImage)
    canvas.addEventListener('mousedown', onmousedownCanvas)
    window.addEventListener('mousemove', onmousemoveWindow)
    window.addEventListener('mouseup', onmouseupWindow)

    return () => {
      imageRef.current.removeEventListener('load', onloadImage)
      canvas.removeEventListener('mousedown', onmousedownCanvas)
      window.removeEventListener('mousemove', onmousemoveWindow)
      window.removeEventListener('mouseup', onmouseupWindow)
    }
  }, [])

  const onClickReset = () => {
    if(ref.current == null) return
    const canvas = ref.current
    const context = canvas.getContext('2d')!
    context.clearRect(0, 0, context.canvas.width,
                            context.canvas.height)
    drawImage(context, imageRef.current)
  }

  return (
    <div className={style.body}>
      <div className={style.controls}>
        <button onClick={onClickReset}>Reset</button>
      </div>

      <div className={
        style.rubberband(rubberband.position.x, rubberband.position.y,
                         rubberband.size.width, rubberband.size.height,
                         rubberband.show,
        )}
      />

      <canvas
        ref={ref}
        className={style.canvas}
        width='800'
        height='520'
      >
        Canvas not supported
      </canvas>
    </div>
  )
}

const useRubberband = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [size, setSize] = useState({ width: 0, height: 0 })
  const [show, setShow] = useState(false)

  const positionRef = useRef({ x: 0, y: 0 })
  const sizeRef = useRef({ width: 0, height: 0 })
  const initialPostion = useRef({ x: 0, y: 0 })
  const dragging = useRef(false)

  const startRubberband = (x: number, y: number) => {
    setShow(true)
    setPosition({ x, y })
    positionRef.current = { x, y }
    initialPostion.current = { x, y }
    dragging.current = true
  }

  const stretchRubberband = (x: number, y: number) => {
    if(!dragging.current) return
    const newPosition = {
      x: x < initialPostion.current.x ? x : initialPostion.current.x,
      y: y < initialPostion.current.y ? y : initialPostion.current.y,
    }
    const newSize = {
      width: Math.abs(x - initialPostion.current.x),
      height: Math.abs(y - initialPostion.current.y),
    }
    setPosition(newPosition)
    positionRef.current = newPosition
    setSize(newSize)
    sizeRef.current = newSize
  }

  const endRubberband = (context: CanvasRenderingContext2D) => {
    const bbox = context.canvas.getBoundingClientRect()

    try {
      context.drawImage(context.canvas,
                        positionRef.current.x - bbox.left,
                        positionRef.current.y - bbox.top,
                        sizeRef.current.width,
                        sizeRef.current.height,
                        0, 0, context.canvas.width, context.canvas.height)
    } catch {
      // canvas外で離されたときは、無視する
    }
    setPosition({ x: 0, y: 0 })
    positionRef.current = { x: 0, y: 0 }
    setSize({ width: 0, height: 0 })
    sizeRef.current = { width: 0, height: 0 }
    setShow(false)
    dragging.current = false
  }

  return {
    rubberband: {
      position,
      size,
      show,
    },
    startRubberband,
    stretchRubberband,
    endRubberband,
  }
}

const drawImage = (context: CanvasRenderingContext2D, image: HTMLImageElement) => {
  context.drawImage(image, 0, 0, context.canvas.width, context.canvas.height)
}
