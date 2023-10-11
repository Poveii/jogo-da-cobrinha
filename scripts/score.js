export function getScore() {
  const score = document.getElementById('score').innerHTML
  return score
}

export function getAllScores() {
  let scores = localStorage.getItem('@snake-game:score-1.0.0')

  // caso não tenha os scores no localStorage
  if (scores === null) {
    scores = []
  } else {
    scores = scores.split(',')
  }
  return scores
}

export function saveScore(newScore) {
  const scoresArray = getAllScores()

  scoresArray.push(newScore) // coloca na última posição do array o novo score
  localStorage.setItem('@snake-game:score-1.0.0', scoresArray)
}