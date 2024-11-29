<!--
  App.vue - 扫雷游戏主组件
  包含游戏的主要布局和状态管理
-->

<template>
  <!-- 游戏主容器 -->
  <div class="game-container">
    <!-- 游戏状态栏：显示当前关卡、剩余地雷数和游戏时间 -->
    <GameStatus :level="currentLevel" :mines-left="minesLeft" :time="gameTime" :game-state="gameState" />

    <!-- 游戏棋盘：显示游戏格子、已揭示区域和旗帜标记 -->
    <GameBoard v-show="gameState !== 'paused'" :grid="grid" :revealed="revealed" :flags="flags"
      :current-pos="currentPos" />

    <!-- 暂停界面 -->
    <div v-if="gameState === 'paused'" class="pause-screen">
      游戏已暂停
    </div>

    <!-- 关卡过渡动画 -->
    <LevelTransition v-if="showLevelAnimation" :level="currentLevel + 1" @animation-end="startNextLevel" />
  </div>
</template>

<script setup>
/**
 * 导入所需的Vue组件和组合式函数
 */
import { ref, onMounted } from 'vue'
import GameBoard from './components/GameBoard.vue'
import GameStatus from './components/GameStatus.vue'
import LevelTransition from './components/LevelTransition.vue'
import { useGame } from './composables/useGame'
import { useKeyboard } from './composables/useKeyboard'

/**
 * 初始化游戏逻辑
 * 包含：游戏网格、已揭示格子、旗帜标记、当前位置、剩余地雷数等状态
 */
const {
  grid,               // 游戏网格数据
  revealed,           // 已揭示的格子
  flags,              // 旗帜标记位置
  currentPos,         // 当前选中位置
  minesLeft,          // 剩余地雷数
  currentLevel,       // 当前关卡
  gameTime,           // 游戏时间
  showLevelAnimation, // 是否显示关卡过渡动画
  initGame,           // 初始化游戏
  handleMove,         // 处理移动
  handleReveal,       // 处理揭示格子
  handleFlag,         // 处理插旗
  startNextLevel,     // 开始下一关
  gameState,          // 游戏状态
  pauseGame,          // 暂停游戏
  resumeGame          // 继续游戏
} = useGame()

// 设置键盘控制
useKeyboard({
  onMove: handleMove,    // 方向键移动
  onReveal: handleReveal,// 确认键揭示
  onFlag: handleFlag     // R键或长按确认键插旗
})

// 组件挂载时初始化游戏
onMounted(() => {
  initGame()
})
</script>

<style>
/* 游戏容器样式 */
.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: #1a1a1a;
  color: white;
}

/* 暂停界面样式 */
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