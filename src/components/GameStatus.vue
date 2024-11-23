<template>
  <div class="game-status">
    <div class="status-item">
      <div class="status-label">关卡</div>
      <div class="status-value">{{ level + 1 }}</div>
    </div>

    <div class="status-item">
      <div class="status-label">剩余地雷</div>
      <div class="status-value">{{ minesLeft }}</div>
    </div>

    <div class="status-item">
      <div class="status-label">用时</div>
      <div class="status-value">{{ formatTime(time) }}</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  level: {
    type: Number,
    required: true
  },
  minesLeft: {
    type: Number,
    required: true
  },
  time: {
    type: Number,
    required: true
  }
})

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
</script>

<style scoped lang="scss">
.game-status {
  display: flex;
  gap: 32px;
  padding: 16px;
  background: #2a2a2a;
  border-radius: 8px;
  margin-bottom: 20px;
}

.status-item {
  text-align: center;
  min-width: 100px;
}

.status-label {
  font-size: 14px;
  color: #999;
  margin-bottom: 4px;
}

.status-value {
  font-size: 24px;
  font-weight: bold;
  color: #fff;
}
</style>
