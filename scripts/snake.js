// Importando a função que possibilita a cobra se mover
import { getInputDirection } from './input.js'


const snakeBody = [{ x: 11, y: 11 }] // define a posição inicial da cobrinha

let speedSnake = 4
let pointsToGainSpeed = 50

export function setSpeed() {
  var points = document.getElementById('score').textContent

  let reached = points / pointsToGainSpeed

  if (reached >= 1) {
    pointsToGainSpeed += 50
    return speedSnake++
  }

  return speedSnake
}

let newSegments = 0

export function update() {
  addSegments()

  const inputDirection = getInputDirection()
  // define a direção da cobrinha o comando do usuário

  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] }
  }

  snakeBody[0].x += inputDirection.x
  snakeBody[0].y += inputDirection.y

  setSpeed() // função que faz a cobrinha aumentar a velocidade
}

export function draw(gameBoard) {
  snakeBody.forEach(segment => {
    const snakeElement = document.createElement('div')
    snakeElement.style.gridRowStart = segment.y
    snakeElement.style.gridColumnStart = segment.x
    snakeElement.classList.add('snake')
    gameBoard.appendChild(snakeElement)
  })
}

export function expandSnake(amount) {
  newSegments += amount
}

export function onSnake(position, { ignoreHead = false } = {}) {
  return snakeBody.some((segment, index) => {
    if (ignoreHead && index === 0) return false
    return position.x === segment.x && position.y === segment.y
  })
}

export function addSegments() {
  for (let i = 0; i < newSegments; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] })
  }

  newSegments = 0
}

export function getSnakeHead() {
  return snakeBody[0]
}

export function snakeIntersection() {
  return onSnake(snakeBody[0], {
    ignoreHead: true
  })
}
