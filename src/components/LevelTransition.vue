<!--
  LevelTransition.vue - 关卡过渡动画组件
  在玩家完成当前关卡时显示祝贺信息和下一关信息
  包含淡入淡出和缩放动画效果
-->

<template>
  <!-- 过渡动画容器，动画结束时触发animation-end事件 -->
  <div class="level-transition" @animationend="$emit('animation-end')">
    <div class="transition-content">
      <!-- 显示下一关信息 -->
      <div class="level-text">第 {{ level }} 关</div>
      <!-- 显示祝贺信息 -->
      <div class="congratulation">恭喜通关！</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

// 定义组件属性
defineProps({
  level: {
    type: Number,
    required: true  // 下一关的关卡数
  }
})

// 定义组件事件
defineEmits(['animation-end'])  // 动画结束时触发
</script>

<style scoped>
/* 过渡动画容器 */
.level-transition {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);  /* 半透明黑色背景 */
  display: flex;
  justify-content: center;
  align-items: center;
  /* 组合动画：0.5s淡入 + 2s显示 + 0.5s淡出 */
  animation: fadeIn 0.5s ease-in, fadeOut 0.5s ease-out 2s forwards;
  z-index: 100;  /* 确保显示在最上层 */
}

/* 内容容器 */
.transition-content {
  text-align: center;
  animation: scaleUp 0.5s ease-out;  /* 缩放动画 */
}

/* 关卡文本样式 */
.level-text {
  font-size: 48px;
  color: #fff;
  margin-bottom: 20px;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);  /* 发光效果 */
}

/* 祝贺文本样式 */
.congratulation {
  font-size: 24px;
  color: #ffd700;  /* 金色 */
  text-shadow: 0 0 5px rgba(255, 215, 0, 0.5);  /* 金色发光效果 */
}

/* 淡入动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* 淡出动画 */
@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

/* 缩放动画 */
@keyframes scaleUp {
  from {
    transform: scale(0.5);
  }
  to {
    transform: scale(1);
  }
}
</style>
