import React, { useEffect, useRef } from 'react'
import { css } from '@emotion/css'

export default {
  component: Canvas
}

export function _05_BouncingBalls() {
  return (
    <Canvas />
  )
}

const style = {
  body: css({
    background: '#dddddd',
  }),
  canvas: css({
    maringLeft: '10px',
    marginTop: '10px',
    background: 'white',
    border: 'thin solid #aaaaaa',
  }),
  glasspane: css({
    position: 'absolute',
    left: '50px',
    top: '50px',
    padding: '0px 20px 10px 10px',
    background: 'rgba(0, 0, 0, 0.3)',
    border: 'thin solid rgba(0, 0, 0, 0.6)',
    color: '#eeeeee',
    fontFamily: 'Droid Sans, Arial, Helvetica, san-serif',
    fontSize: '12px',
    cursor: 'pointer',
    boxShadow: 'rgba(0, 0, 0, 0.5) 5px 5px 20px',
    h2: {
    }
  }),
  h2: css({
    fontWeight: 'normal',
    fontSize: '2em',
    color: 'rgba(255, 255, 0, 0.8)',
  }),
  p: css({
    margin: '10px',
    color: 'rgba(65, 65, 220, 1.0)',
    fontSize: '12px',
    fontFamily: 'Palatino, Arial, Helvetica, sans-serif',
  }),
  a: css({
    textDecoration: 'none',
    color: '#cccccc',
    fontSize: '3.5em',
    '&:hover': {
      color: 'yellow',
    }
  }),
}

function Canvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if(ref.current == null) return
  }, [])

  return (
    <div className={style.body}>
      <div className={style.glasspane}>
        <h2 className={style.h2}>Bouncing Balls</h2>

        <p className={style.p}>One hundred balls bouncing</p>

        <a className={style.a}>Start</a>
      </div>
      <canvas
        width='750'
        height='500'
      >
        Canvas not supported
      </canvas>
    </div>
  )
}
