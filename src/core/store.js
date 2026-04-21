// game-store.js
export class GameStore {
  constructor() {
    this.state = {
      hp: 100,
      maxHp: 100,
      inventory: [],
      currentScene: 'start'
    };
    // 监听列表，用于存放所有引用了此状态的 Lit 组件
    this._hosts = new Set();
  }

  // 注册组件到监听列表
  addHost(host) {
    this._hosts.add(host);
    // 当新组件加入时，立即渲染一次当前状态
    host.requestUpdate();
  }

  // 移除组件
  removeHost(host) {
    this._hosts.delete(host);
  }

  // 更新状态的方法
  updateHp(amount) {
    this.state.hp = Math.max(0, Math.min(this.state.maxHp, this.state.hp + amount));
    this._notify();
  }

  addItem(item) {
    this.state.inventory.push(item);
    this._notify();
  }

  changeScene(sceneId) {
    this.state.currentScene = sceneId;
    this._notify();
  }

  // 核心：通知所有订阅该状态的 Lit 组件更新
  _notify() {
    for (const host of this._hosts) {
      host.requestUpdate(); // 触发重新渲染
    }
  }
}

// 导出单例，全局只有一个游戏状态
export const gameStore = new GameStore();