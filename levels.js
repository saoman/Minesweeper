import { onMounted, onUnmounted } from 'vue'

export function useKeyboard({ onMove, onReveal, onFlag }) {
  const handleKeydown = (e) => {
    switch (e.keyCode) {
      case 37: // 左
        onMove(-1, 0)
        break
      case 38: // 上
        onMove(0, -1)
        break
      case 39: // 右
        onMove(1, 0)
        break
      case 40: // 下
        onMove(0, 1)
        break
      case 13: // Enter
        onReveal()
        break
      case 82: // R键
        onFlag()
        break
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
  })
} 