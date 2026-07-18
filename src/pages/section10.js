import { RPGElement, html, css, nothing } from '/src/element.js';
import { enemies, chapter1_enemies }from '/src/constants/index.js';
import { gameStore } from '/src/core/game-store.js';
import { History } from '/src/core/history.js';

export class Section10 extends RPGElement {
  static styles = [this.globalCSS, css`
  `];

  static properties = {
    simple: {
      type: Boolean,
      reflect: true,
      default: false,
    },
    dice: {
      type: Number,
      default: 0,
    },
    enemy: {
      type: String,
      default: '',
    },
  }

  render() {
    return html`<rpg-box type="13">
  <p>你沿着小径小心翼翼地前进，周围的树木越来越高大，光线也越来越暗。突然，草丛中传来一阵窸窣声。</p>
  <br>
  <div style="text-indent: 2em">请投掷骰子: <rpg-dice sides="6" ?disabled="${this.dice > 0}" data-dice="${this.dice}" @dice="${this.selectEnemy}"></rpg-dice></div>

  ${!this.enemy ? nothing : html`
    <br>
    <p><span class="color_enemy">${enemies[this.enemy].name}</span> 出现了！</p>
    <div style="margin: 0 10px;"><img src="/assets/images/enemy_${this.enemy}.png"></div>
    <rpg-action>迎敌</rpg-action>
    <rpg-action disabled>逃跑 （需要 <rpg-item key="rope"></rpg-item>）</rpg-action>
  `}
</rpg-box>`;
  }

  setup() {
    gameStore.addHost(this);
    const h = gameStore.findHistory(History.select_enemy('1-1'));
    if (h !== -1) {
      const history = gameStore.history[h];
      this.dice = history.dice;
      this.enemy = history.enemy_key;
    }
  }

  selectEnemy(event) {
    const dice = event.detail.dice;
    this.enemy = chapter1_enemies[dice - 1];

    gameStore.pushHistory(History.select_enemy('1-1', dice, this.enemy));
  }
}