<template>
  <div class="game-container">
    <GameStatus :level="currentLevel" :mines-left="minesLeft" :time="gameTime" :game-state="gameState" />

    <GameBoard v-show="gameState !== 'paused'" :grid="grid" :revealed="revealed" :flags="flags"
      :current-pos="currentPos" />

    <div v-if="gameState === 'paused'" class="pause-screen">
      游戏已暂停
    </div>

    <LevelTransition v-if="showLevelAnimation" :level="currentLevel + 1" @animation-end="startNextLevel" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import GameBoard from './components/GameBoard.vue'
import GameStatus from './components/GameStatus.vue'
import LevelTransition from './components/LevelTransition.vue'
import { useGame } from './composables/useGame'
import { useKeyboard } from './composables/useKeyboard'

const {
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
} = useGame()

// 键盘控制
useKeyboard({
  onMove: handleMove,
  onReveal: handleReveal,
  onFlag: handleFlag
})

onMounted(() => {
  initGame()
})
</script>

<style>
.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: #1a1a1a;
  color: white;
}

.pause-screen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
}
</style>