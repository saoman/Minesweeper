/**
 * useGame.js - 扫雷游戏核心逻辑
 * 包含游戏状态管理、地雷布局、数字计算、游戏操作等功能
 */

import { ref, computed } from 'vue'
import { LEVELS } from '../constants/levels'
import { useGameState, GameState } from './useGameState'

/**
 * 扫雷游戏组合式函数
 * @returns {Object} 游戏状态和方法
 */
export function useGame() {
  // 游戏状态变量
  const grid = ref([])              // 游戏网格，存储地雷(-1)和数字(0-8)
  const revealed = ref([])          // 已揭示的格子状态
  const flags = ref([])             // 旗帜标记状态
  const currentPos = ref({ x: 0, y: 0 }) // 当前选中位置
  const currentLevel = ref(0)       // 当前关卡
  const gameTime = ref(0)           // 游戏时间（秒）
  const showLevelAnimation = ref(false) // 是否显示关卡过渡动画
  let timer = null                  // 计时器引用

  // 导入游戏状态管理
  const {
    gameState,
    startGame,
    pauseGame,
    resumeGame,
    gameOver: setGameOver,
    winGame
  } = useGameState()

  /**
   * 计算剩余地雷数
   * 当前关卡总地雷数减去已标记的旗帜数
   */
  const minesLeft = computed(() => {
    const level = LEVELS[currentLevel.value]
    const flagCount = flags.value.flat().filter(Boolean).length
    return level.mines - flagCount
  })

  /**
   * 初始化游戏
   * 创建游戏网格、放置地雷、计算数字、开始计时
   */
  const initGame = () => {
    const level = LEVELS[currentLevel.value]
    const { width, height, mines } = level

    // 初始化游戏数组
    grid.value = Array(height).fill().map(() => Array(width).fill(0))
    revealed.value = Array(height).fill().map(() => Array(width).fill(false))
    flags.value = Array(height).fill().map(() => Array(width).fill(false))
    currentPos.value = { x: 0, y: 0 }

    placeMines(mines)
    calculateNumbers()
    startTimer()
    startGame()
  }

  /**
   * 随机放置地雷
   * @param {number} mines - 要放置的地雷数量
   */
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

  /**
   * 计算每个格子周围的地雷数
   */
  const calculateNumbers = () => {
    const level = LEVELS[currentLevel.value]
    for (let y = 0; y < level.height; y++) {
      for (let x = 0; x < level.width; x++) {
        if (grid.value[y][x] === -1) continue
        grid.value[y][x] = countAdjacentMines(x, y)
      }
    }
  }

  /**
   * 计算指定位置周围的地雷数
   * @param {number} x - 横坐标
   * @param {number} y - 纵坐标
   * @returns {number} 周围地雷数
   */
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

  /**
   * 检查坐标是否在游戏网格范围内
   * @param {number} x - 横坐标
   * @param {number} y - 纵坐标
   * @returns {boolean} 是否有效
   */
  const isValidPosition = (x, y) => {
    const level = LEVELS[currentLevel.value]
    return x >= 0 && x < level.width && y >= 0 && y < level.height
  }

  /**
   * 处理移动操作
   * @param {number} dx - 横向移动距离
   * @param {number} dy - 纵向移动距离
   */
  const handleMove = (dx, dy) => {
    if (gameState.value !== GameState.PLAYING) return
    
    const newX = currentPos.value.x + dx
    const newY = currentPos.value.y + dy
    
    if (isValidPosition(newX, newY)) {
      currentPos.value = { x: newX, y: newY }
    }
  }

  /**
   * 处理揭示格子操作
   */
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

  /**
   * 递归揭示空白格子及其周围格子
   * @param {number} x - 横坐标
   * @param {number} y - 纵坐标
   */
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

  /**
   * 处理插旗操作
   */
  const handleFlag = () => {
    if (gameState.value !== GameState.PLAYING) return
    
    const { x, y } = currentPos.value
    if (revealed.value[y][x]) return
    
    flags.value[y][x] = !flags.value[y][x]
  }

  /**
   * 检查是否获胜
   * 当所有非地雷格子都被揭示时获胜
   */
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

  /**
   * 游戏结束处理
   * 停止计时并显示所有地雷
   */
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

  /**
   * 开始下一关
   * 如果还有下一关则初始化新关卡，否则显示通关信息
   */
  const startNextLevel = () => {
    if (currentLevel.value < LEVELS.length - 1) {
      currentLevel.value++
      showLevelAnimation.value = false
      initGame()
    } else {
      console.log('恭喜通关所有关卡！')
    }
  }

  /**
   * 开始计时
   */
  const startTimer = () => {
    gameTime.value = 0
    stopTimer()
    timer = setInterval(() => {
      gameTime.value++
    }, 1000)
  }

  /**
   * 停止计时
   */
  const stopTimer = () => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  // 返回游戏状态和方法
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