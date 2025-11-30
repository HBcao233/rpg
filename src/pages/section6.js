import { RPGElement, html, css } from '/src/element.js';


export class Section6 extends RPGElement {
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
  <p>好了～现在让我们先来把你重生吧～你需要投两个骰子，一个决定你的阵营，一个决定你的职业。当然你要是想选自己喜欢的角色也是没问题的哦～</p>
</rpg-box>`;
  }
}
