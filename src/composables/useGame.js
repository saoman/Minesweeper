import { ref, computed } from 'vue'
import { LEVELS } from '../constants/levels'
import { useGameState, GameState } from './useGameState'

export function useGame() {
  const grid = ref([])
  const revealed = ref([])
  const flags = ref([])
  const currentPos = ref({ x: 0, y: 0 })
  const currentLevel = ref(0)
  const gameTime = ref(0)
  const showLevelAnimation = ref(false)
  let timer = null

  const {
    gameState,
    startGame,
    pauseGame,
    resumeGame,
    gameOver: setGameOver,
    winGame
  } = useGameState()

  const minesLeft = computed(() => {
    const level = LEVELS[currentLevel.value]
    const flagCount = flags.value.flat().filter(Boolean).length
    return level.mines - flagCount
  })

  const initGame = () => {
    const level = LEVELS[currentLevel.value]
    const { width, height, mines } = level

    grid.value = Array(height).fill().map(() => Array(width).fill(0))
    revealed.value = Array(height).fill().map(() => Array(width).fill(false))
    flags.value = Array(height).fill().map(() => Array(width).fill(false))
    currentPos.value = { x: 0, y: 0 }

    placeMines(mines)
    calculateNumbers()
    startTimer()
    startGame()
  }

  const placeMines = (mines) => {
    const level = LEVELS[currentLevel.value]
    let placedMines = 0

    while (placedMines < mines) {
      const x = Math.floor(Math.random() * level.width)
      const y = Math.floor(Math.random() * level.height)

      if (grid.value[y][x] !== -1) {
        grid.value[y][x] = -1
        placedMines++
      }
    }
  }

  const calculateNumbers = () => {
    const level = LEVELS[currentLevel.value]
    for (let y = 0; y < level.height; y++) {
      for (let x = 0; x < level.width; x++) {
        if (grid.value[y][x] === -1) continue
        grid.value[y][x] = countAdjacentMines(x, y)
      }
    }
  }

  const countAdjacentMines = (x, y) => {
    let count = 0
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const newX = x + dx
        const newY = y + dy
        if (isValidPosition(newX, newY) && grid.value[newY][newX] === -1) {
          count++
        }
      }
    }
    return count
  }

  const isValidPosition = (x, y) => {
    const level = LEVELS[currentLevel.value]
    return x >= 0 && x < level.width && y >= 0 && y < level.height
  }

  const handleMove = (dx, dy) => {
    if (gameState.value !== GameState.PLAYING) return
    
    const newX = currentPos.value.x + dx
    const newY = currentPos.value.y + dy
    
    if (isValidPosition(newX, newY)) {
      currentPos.value = { x: newX, y: newY }
    }
  }

  const handleReveal = () => {
    if (gameState.value !== GameState.PLAYING) return
    
    const { x, y } = currentPos.value
    if (flags.value[y][x]) return
    
    if (grid.value[y][x] === -1) {
      gameOver()
      return
    }
    
    reveal(x, y)
    checkWin()
  }

  const reveal = (x, y) => {
    if (!isValidPosition(x, y) || revealed.value[y][x]) return

    revealed.value[y][x] = true

    if (grid.value[y][x] === 0) {
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          reveal(x + dx, y + dy)
        }
      }
    }
  }

  const handleFlag = () => {
    if (gameState.value !== GameState.PLAYING) return
    
    const { x, y } = currentPos.value
    if (revealed.value[y][x]) return
    
    flags.value[y][x] = !flags.value[y][x]
  }

  const checkWin = () => {
    const level = LEVELS[currentLevel.value]
    const allNonMinesRevealed = grid.value.every((row, y) =>
      row.every((cell, x) =>
        (cell === -1 && !revealed.value[y][x]) ||
        (cell !== -1 && revealed.value[y][x])
      )
    )
    
    if (allNonMinesRevealed) {
      stopTimer()
      winGame()
      showLevelAnimation.value = true
    }
  }

  const gameOver = () => {
    stopTimer()
    setGameOver()
    grid.value.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === -1) {
          revealed.value[y][x] = true
        }
      })
    })
  }

  const startNextLevel = () => {
    if (currentLevel.value < LEVELS.length - 1) {
      currentLevel.value++
      showLevelAnimation.value = false
      initGame()
    } else {
      console.log('恭喜通关所有关卡！')
    }
  }

  const startTimer = () => {
    gameTime.value = 0
    stopTimer()
    timer = setInterval(() => {
      gameTime.value++
    }, 1000)
  }

  const stopTimer = () => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  return {
    grid,
    revealed,
    flags,
    currentPos,
    minesLeft,
    currentLevel,
    gameTime,
    showLevelAnimation,
    initGame,
    handleMove,
    handleReveal,
    handleFlag,
    startNextLevel,
    gameState,
    pauseGame,
    resumeGame
  }
}