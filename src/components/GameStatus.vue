<!--
  GameStatus.vue - 游戏状态显示组件
  显示当前关卡、剩余地雷数和游戏时间
-->

<template>
  <!-- 游戏状态容器 -->
  <div class="game-status">
    <!-- 关卡信息 -->
    <div class="status-item">
      <div class="status-label">关卡</div>
      <div class="status-value">{{ level + 1 }}</div>
    </div>

    <!-- 剩余地雷数 -->
    <div class="status-item">
      <div class="status-label">剩余地雷</div>
      <div class="status-value">{{ minesLeft }}</div>
    </div>

    <!-- 游戏时间 -->
    <div class="status-item">
      <div class="status-label">用时</div>
      <div class="status-value">{{ formatTime(time) }}</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

// 定义组件属性
const props = defineProps({
  level: {
    type: Number,
    required: true,    // 当前关卡（从0开始）
  },
  minesLeft: {
    type: Number,
    required: true,    // 剩余未标记的地雷数
  },
  time: {
    type: Number,
    required: true,    // 游戏进行时间（秒）
  }
})

/**
 * 格式化时间显示
 * @param {number} seconds - 游戏进行的秒数
 * @returns {string} - 格式化后的时间字符串 (MM:SS)
 */
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
</script>

<style scoped lang="scss">
/* 游戏状态容器样式 */
.game-status {
  display: flex;
  gap: 32px;
  padding: 16px;
  background: #2a2a2a;
  border-radius: 8px;
  margin-bottom: 20px;
}

/* 状态项样式 */
.status-item {
  text-align: center;
  min-width: 100px;
}

/* 状态标签样式 */
.status-label {
  font-size: 14px;
  color: #999;
  margin-bottom: 4px;
}

/* 状态值样式 */
.status-value {
  font-size: 24px;
  font-weight: bold;
  color: #fff;
}
</style>
