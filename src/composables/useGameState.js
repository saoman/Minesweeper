import { ref } from 'vue'

export const GameState = {
  INIT: 'init',
  PLAYING: 'playing',
  PAUSED: 'paused',
  GAME_OVER: 'gameOver',
  WIN: 'win'
}

export function useGameState() {
  const gameState = ref(GameState.INIT)
  
  const startGame = () => {
    gameState.value = GameState.PLAYING
  }

  const pauseGame = () => {
    if (gameState.value === GameState.PLAYING) {
      gameState.value = GameState.PAUSED
    }
  }

  const resumeGame = () => {
    if (gameState.value === GameState.PAUSED) {
      gameState.value = GameState.PLAYING
    }
  }

  const gameOver = () => {
    gameState.value = GameState.GAME_OVER
  }

  const winGame = () => {
    gameState.value = GameState.WIN
  }

  return {
    gameState,
    startGame,
    pauseGame,
    resumeGame,
    gameOver,
    winGame
  }
} 