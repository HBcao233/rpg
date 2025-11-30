import { RPGElement, html, css } from '/src/element.js';


export class Section3 extends RPGElement {
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
      default: true,
    },
  }

  render() {
    return html`<rpg-box>
  <div class="title color_enemy">地狱轮盘女神</div><div class="image_box"><img src="/assets/images/hell_goddess.jpg"></div>
  <p>可惜的是，作为轮盘之神，我的力量其实是......随机的。所以你可能会死掉然后又回到我这里来......我好像不小心剧透了......别担心! 不管你死了多少次，我都会把你一次又一次复活 直到你打败恶魔领主的，呐～</p>
</rpg-box>`;
  }
}
