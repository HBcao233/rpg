import { RPGElement, html, css } from '/src/element.js';


export class Section2 extends RPGElement {
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
  <div class="title color_enemy">地狱轮盘女神</div>
  <div class="image_box"><img src="/assets/images/hell_goddess.jpg"></div>
  <p>我这个最资深的轮盘女神会监督你的旅程。你在路上可能会遇到我的姐妹们，记得代我向她们打声招呼，她们可能会帮一把的! 你要在旅途之中打败恶魔领主。他们用淫秽邪恶的魔法腐蚀了这片大地。我会给你祝福，让你获得特殊的能カ和属性后，重生于那片大地的，库库库。</p>
</rpg-box>`;
  }
}
