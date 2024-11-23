<template>
  <div class="game-board">
    <div v-for="(row, y) in grid" :key="y" class="row">
      <div v-for="(cell, x) in row" :key="x" :class="[
        'cell',
        {
          'cell--focused': isFocused(x, y),
          'cell--revealed': revealed[y][x],
          'cell--flagged': flags[y][x]
        }
      ]">
        {{ getCellContent(x, y, cell) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  grid: Array,
  revealed: Array,
  flags: Array,
  currentPos: Object
})

const isFocused = (x, y) => {
  return x === props.currentPos.x && y === props.currentPos.y
}

const getCellContent = (x, y, cell) => {
  if (!props.revealed[y][x]) {
    return props.flags[y][x] ? '🚩' : ''
  }
  if (cell === -1) return '💣'
  return cell || ''
}
</script>

<style scoped>
.game-board {
  margin: 20px;
}

.row {
  display: flex;
}

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

.cell--focused {
  border: 2px solid yellow;
  background: #3a3a3a;
}

.cell--revealed {
  background: #404040;
}

.cell--flagged {
  color: red;
}
</style>