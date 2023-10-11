// Importando funções e variáveis importantes para o jogo
import {
  update as updateSnake,
  draw as drawSnake,
  getSnakeHead,
  snakeIntersection,
  setSpeed
} from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'

import { outsideGrid } from './grid.js' // importa o arquivo do mapa (grid)


const gameBoard = document.getElementById('game-board') // define gameBoard como o game-board do HTML

let lastRenderTime = 0
let gameOver = false // define o "não fim do jogo"

requestAnimationFrame(main)

function main(currentTime) {
  if (gameOver) {
    // se der Game Over...
    if (confirm('Game Over')) {
      location.reload() // retorna para o início do jogo
    }
    return
  }

  let snakeSpeed = setSpeed() // define a velocidade da cobrinha

  requestAnimationFrame(main)

  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
  if (secondsSinceLastRender < 1 / snakeSpeed) return

  lastRenderTime = currentTime

  update() // chama a função de atualizar os objetos
  draw() // chama a função de 'desenhar' os objetos
}

function update() {
  updateSnake() // função de atualizar a cobrinha
  updateFood() // função de atualizar a comida
  checkDeath() // função que checa se a cobra morreu
}

function draw() {
  gameBoard.innerHTML = ''
  drawSnake(gameBoard) // 'desenha' a cobrinha
  drawFood(gameBoard) // 'desenha' a comida
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
  // dá Game Over se a cobra mesmo se bater ou encostar nos limites do mapa
}
