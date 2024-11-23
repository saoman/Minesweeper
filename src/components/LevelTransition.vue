<template>
  <div class="level-transition" @animationend="$emit('animation-end')">
    <div class="transition-content">
      <div class="level-text">第 {{ level }} 关</div>
      <div class="congratulation">恭喜通关！</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  level: {
    type: Number,
    required: true
  }
})

defineEmits(['animation-end'])
</script>

<style scoped>
.level-transition {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.5s ease-in, fadeOut 0.5s ease-out 2s forwards;
  z-index: 100;
}

.transition-content {
  text-align: center;
  animation: scaleUp 0.5s ease-out;
}

.level-text {
  font-size: 48px;
  color: #fff;
  margin-bottom: 20px;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.congratulation {
  font-size: 24px;
  color: #ffd700;
  text-shadow: 0 0 5px rgba(255, 215, 0, 0.5);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

@keyframes scaleUp {
  from {
    transform: scale(0.5);
  }

  to {
    transform: scale(1);
  }
}
</style>
