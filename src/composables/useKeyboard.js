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
      case 70: // F键
      case 32: // 空格
        onFlag()
        break
    }
  }

  // 阻止右键菜单
  const preventDefault = (e) => {
    e.preventDefault()
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
    // 禁用右键菜单
    window.addEventListener('contextmenu', preventDefault)
  })

  onUnmounted(() => {
    window.addEventListener('keydown', handleKeydown)
    window.removeEventListener('contextmenu', preventDefault)
  })
}