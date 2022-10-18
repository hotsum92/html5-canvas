export const draw = (context: CanvasRenderingContext2D) => {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height)

  drawCircle(context, context.canvas)
  drawNumerals(context, context.canvas)
  drawCenter(context, context.canvas)
  drawHands(context, context.canvas)
}

const drawCircle = (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
  context.beginPath()
  context.arc(canvas.width/2, canvas.height/2,
              radius(canvas), 0, Math.PI*2, true)
  context.stroke()
}

const drawNumerals = (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) =>  {
  const numerals = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]

  numerals.forEach(numeral => {
    const numeralStr = numeral.toString()
    const angle = Math.PI/6 * (numeral - 3)
    const numeralWidth = context.measureText(numeralStr).width
    context.fillText(numeralStr,
                     canvas.width/2  + Math.cos(angle) * handRadius(canvas) - numeralWidth/2,
                     canvas.height/2 + Math.sin(angle) * handRadius(canvas) + fontHeigth(context)/3)
  })
}

const drawCenter = (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
  context.beginPath()
  context.arc(canvas.width/2, canvas.height/2, 5, 0, Math.PI*2, true)
  context.fill()
}

const drawHands = (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) =>  {
  const date = new Date()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  drawHour(context, canvas, hour, minute)
  drawMinute(context, canvas, minute)
  drawSecond(context, canvas, second)
}

const drawHour = (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, hour: number, minute: number) => {
  const angle = Math.PI*2 * ((hour > 12 ? hour - 12 : hour) + minute/60)/12 - Math.PI/2
  const handRadius = radius(canvas) - canvas.width/25 - canvas.width/10
  context.moveTo(canvas.width/2, canvas.height/2)
  context.lineTo(canvas.width/2  + Math.cos(angle)*handRadius,
                 canvas.height/2 + Math.sin(angle)*handRadius)
  context.stroke()
}

const drawMinute = (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, minute: number) => {
  const angle = Math.PI*2 * minute/60 - Math.PI/2
  const handRadius = radius(canvas) - canvas.width/25
  context.moveTo(canvas.width/2, canvas.height/2)
  context.lineTo(canvas.width/2  + Math.cos(angle)*handRadius,
                 canvas.height/2 + Math.sin(angle)*handRadius)
  context.stroke()
}

const drawSecond = (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, second: number) => {
  const angle = Math.PI*2 * second/60 - Math.PI/2
  const handRadius = radius(canvas) - canvas.width/25
  context.moveTo(canvas.width/2, canvas.height/2)
  context.lineTo(canvas.width/2  + Math.cos(angle)*handRadius,
                 canvas.height/2 + Math.sin(angle)*handRadius)
  context.stroke()
}

const radius = (canvas: HTMLCanvasElement) => canvas.width/2 - 35
const handRadius = (canvas: HTMLCanvasElement) => radius(canvas) + 20
const fontHeigth = (context: CanvasRenderingContext2D) => parseInt(context.font.match(/\d+px/)![0])
