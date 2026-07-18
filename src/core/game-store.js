// game-store.js
import { getValue, setValue, getTime } from '../utils/index.js';
import { races } from '/src/constants/index.js';
import { History } from './history.js';

class GameStore {
  constructor() {
    this._store = {};
    this._hosts = new Set();
    getValue('save').then((v) => {
      this.set(v ?? {});
    });
  }

  addHost(host) {
    this._hosts.add(host);
    host.requestUpdate();
  }

  removeHost(host) {
    this._hosts.delete(host);
  }

  _notify() {
    for (const host of this._hosts) {
      host.requestUpdate();
    }
  }

  _save() {
    this._store.update_time = getTime();
    setValue('save', this._store);
    this._notify();
  }

  update(key, value) {
    this._store[key] = value;
    if (key === 'race_key') {
      const r = races[value];
      this._store.player = {
        hp: r.hp,
        max_hp: r.hp,
        atk: r.atk,
      }
      this.pushHistory(History.select_race(this._store.camp, this._store.race));
    }
    this._save();
  }

  set(store) {
    this._store = store;
    this._save();
  }

  reset() {
    this.set({});
  }

  get update_time() {
    return this._store.update_time;
  }

  // 进度
  get section() {
    return this._store.section;
  }
  set section(v) {
    this.update('section', v);
  }

  // 自选模式
  get selection() {
    return this._store.selection;
  }

  set selection(v) {
    this.update('selection', v);
  }

  // 选择的阵营
  get camp() {
    return this._store.camp;
  }
  set camp(v) {
    this.update('camp', v);
  }

  // 选择的职业
  get race() {
    return this._store.race;
  }
  set race(v) {
    this.update('race', v);
  }
  get race_key() {
    return this._store.race_key;
  }
  set race_key(v) {
    this.update('race_key', v);
  }

  get player() {
    return this._store.player;
  }

  updatePlayer(key, value) {
    this._store.player[key] = value;
    this._save();
  }

  get history() {
    return this._store.history;
  }

  equalHistory(target, check) {
    if (!check) return false;
    return target.id === check.id;
  }

  findHistory(target) {
    for (let i = this._store.history.length - 1; i >= 0; i--) {
      const h = this._store.history[i];
      if (this.equalHistory(target, h)) return i;
    }
    return -1;
  }

  pushHistory(history) {
    if (!this._store.history) this._store.history = [];
    const h = this.findHistory(history);
    if (h === -1) {
      this._store.history.push(history);
    } else {
      this._store.history[h] = history;
    }
    this._save();
  }
}

// 导出单例
export const gameStore = new GameStore();
