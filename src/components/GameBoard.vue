<!--
  GameBoard.vue - 扫雷游戏棋盘组件
  负责渲染游戏网格、显示格子状态和内容
-->

<template>
  <!-- 游戏棋盘容器 -->
  <div class="game-board">
    <!-- 遍历渲染每一行 -->
    <div v-for="(row, y) in grid" :key="y" class="row">
      <!-- 遍历渲染每个格子 -->
      <div v-for="(cell, x) in row" :key="x" :class="[
        'cell',
        {
          'cell--focused': isFocused(x, y),   // 当前选中的格子
          'cell--revealed': revealed[y][x],    // 已揭示的格子
          'cell--flagged': flags[y][x]         // 已插旗的格子
        }
      ]">
        {{ getCellContent(x, y, cell) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

// 定义组件属性
const props = defineProps({
  grid: Array,      // 游戏网格数据，包含地雷和数字
  revealed: Array,  // 已揭示的格子状态
  flags: Array,     // 旗帜标记状态
  currentPos: Object// 当前选中位置
})

/**
 * 判断指定坐标是否为当前选中的格子
 * @param {number} x - 横坐标
 * @param {number} y - 纵坐标
 * @returns {boolean} - 是否被选中
 */
const isFocused = (x, y) => {
  return x === props.currentPos.x && y === props.currentPos.y
}

/**
 * 获取格子显示的内容
 * @param {number} x - 横坐标
 * @param {number} y - 纵坐标
 * @param {number} cell - 格子的值
 * @returns {string} - 显示的内容
 * - 未揭示且有旗帜：显示旗帜emoji
 * - 未揭示无旗帜：显示空
 * - 已揭示是地雷：显示地雷emoji
 * - 已揭示是数字：显示周围地雷数
 */
const getCellContent = (x, y, cell) => {
  if (!props.revealed[y][x]) {
    return props.flags[y][x] ? '🚩' : ''
  }
  if (cell === -1) return '💣'
  return cell || ''
}
</script>

<style scoped>
/* 游戏棋盘容器样式 */
.game-board {
  margin: 20px;
}

/* 行样式 */
.row {
  display: flex;
}

/* 格子基础样式 */
.cell {
  width: 50px;
  height: 50px;
  border: 1px solid #444;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  background: #2a2a2a;
  transition: all 0.2s;
}

/* 选中格子样式 */
.cell--focused {
  border: 2px solid yellow;
  background: #3a3a3a;
}

/* 已揭示格子样式 */
.cell--revealed {
  background: #404040;
}

/* 已插旗格子样式 */
.cell--flagged {
  color: red;
}
</style>