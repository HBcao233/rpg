import { RPGElement, html, css, nothing } from '/src/element.js';


export class Section5 extends RPGElement {
  static get styles() {
    return [this.globalCSS, css`
.title {
  line-height: 2;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}
    `];
  }
  
  static properties = {
    simple: {
      type: Boolean,
      reflect: true,
      default: false,
    },
    dice: {
      type: Number,
      state: true,
    },
  }

  render() {
    return html`<rpg-box>
  <div class="title color_enemy">地狱轮盘女神</div><div class="image_box"><img src="/assets/images/hell_goddess.jpg"></div>
  <p>在我们的旅途开始之前，让我先来说明下这个异世界是怎么回事吧。你被赐予了轮盘或者骰子之カ。你投出的点数决定了你接下来的行动。看到下面的<span class="color_random">骰子</span>了吗，试试点击它。</p>
  <br/>
  <rpg-dice sides="6" style="margin-left: 2em" @dice="${this.onDice}"></rpg-dice>
  ${this.dice ? html`<p>你的骰子掷出了 <span class="color_random">${this.dice}</span> 点</p><rpg-action action="next">(1) 继续</rpg-action>` : nothing}
</rpg-box>`;
  }
  
  onDice(e) {
    this.dice = e.detail.dice;
  }
}
