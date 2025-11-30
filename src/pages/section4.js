import { RPGElement, html, css } from '/src/element.js';


export class Section4 extends RPGElement {
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
  <p>前一任恶魔领主死后，一切都变了。一位高阶魅魔取缔了他的位置，这个世界上所有生物都必须遵守的新的视则被制定。现在世界正处于ー片混乱之中，所有人都在像动物一样交配! 听好了，这就是这个世界的规则!</p>
</rpg-box>`;
  }
}
