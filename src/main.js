/**
 * 扫雷游戏入口文件
 * 初始化Vue应用并挂载到DOM
 */

import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/main.scss' // 导入全局样式

// 创建Vue应用实例
const app = createApp(App)

// 将应用挂载到DOM的#app节点
app.mount('#app')