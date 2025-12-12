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
  ${this.dice ? html`<p>你的骰子掷出了 <span class="color_random">${this.dice}</span> 点</p>
  <rpg-box type="12" style="color: #000">
    <h2>恶魔领主律令</h2>
    <ol style="padding-left: 2em">
      <li id="条例1">这个世界禁止抢劫、谋杀和战争。</li>
      <li id="条例2">这个世界中所有的争端都必须通过性爱战斗来解决。</li>
      <li id="条例3">在性爱战中，参加者轮流地给对方施加快感。任何先屈服或者晕过去的人就输了。</li>
      <li id="条例4">在性爱战斗中，你可以做任何被允许的事情。</li>
      <li id="条例5">在不违反<a class="link" href="#条例1" style="color: inherit">条例1</a>的情况下，胜者可以对屈服或晕厥的人做任何事情，包括强奸。</li>
      <li id="条例6">在对方无意识的情况下，不可做出伤害对方的行为。</li>
      <li id="条例7">没有高等智慧的生物可以做出一些例外行为，但是不可以违反条例1和条例2。</li>
      <li id="条例8">此律令只有在一种情况下会失效。那就是我——恶魔领主·莉莉丝被打败。</li>
    </ol>
  </rpg-box>
  <rpg-action action="next">(1) 继续</rpg-action>` : nothing}
</rpg-box>`;
  }
  
  onDice(e) {
    this.dice = e.detail.dice;
  }
}
