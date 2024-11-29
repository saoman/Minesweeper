/**
 * useGameState.js - 游戏状态管理
 * 管理游戏的不同状态（初始化、进行中、暂停、游戏结束、胜利）
 * 并提供状态转换方法
 */

import { ref } from 'vue'

/**
 * 游戏状态枚举
 * @enum {string}
 */
export const GameState = {
  INIT: 'init',         // 初始状态
  PLAYING: 'playing',   // 游戏进行中
  PAUSED: 'paused',     // 游戏暂停
  GAME_OVER: 'gameOver',// 游戏结束（失败）
  WIN: 'win'           // 游戏胜利
}

/**
 * 游戏状态管理组合式函数
 * @returns {Object} 游戏状态和状态转换方法
 */
export function useGameState() {
  // 当前游戏状态
  const gameState = ref(GameState.INIT)
  
  /**
   * 开始游戏
   * 将状态设置为"进行中"
   */
  const startGame = () => {
    gameState.value = GameState.PLAYING
  }

  /**
   * 暂停游戏
   * 仅在游戏进行中时可暂停
   */
  const pauseGame = () => {
    if (gameState.value === GameState.PLAYING) {
      gameState.value = GameState.PAUSED
    }
  }

  /**
   * 继续游戏
   * 仅在游戏暂停时可继续
   */
  const resumeGame = () => {
    if (gameState.value === GameState.PAUSED) {
      gameState.value = GameState.PLAYING
    }
  }

  /**
   * 游戏结束（失败）
   * 当玩家踩到地雷时调用
   */
  const gameOver = () => {
    gameState.value = GameState.GAME_OVER
  }

  /**
   * 游戏胜利
   * 当玩家成功找出所有地雷时调用
   */
  const winGame = () => {
    gameState.value = GameState.WIN
  }

  // 返回状态和方法
  return {
    gameState,    // 当前游戏状态
    startGame,    // 开始游戏
    pauseGame,    // 暂停游戏
    resumeGame,   // 继续游戏
    gameOver,     // 游戏结束
    winGame       // 游戏胜利
  }
}