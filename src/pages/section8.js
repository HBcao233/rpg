import { RPGElement, html, css } from '/src/element.js';


export class Section8 extends RPGElement {
  static styles = [this.globalCSS, css`
  `];
  
  static properties = {
    simple: {
      type: Boolean,
      reflect: true,
      default: false,
    },
  }
  
  render() {
    return html`<rpg-box type="13">
  <p>你重生在了一座森林的入口处。你的新身体感觉很好，但是还需要适应，你已经迫不及待地要开始你的旅途了，在森林中走了短短几分钟之后，又出现了一个女神，当她似乎与你刚刚在地狱遇到的女神有所不同。她介绍着自己是轮盘文神的第二个姐妹，拥有掌管凡人世界的权力。随后，她向你展示了这座森林的地图。</p>
  <br>
  <rpg-action action="next">(1) 继续</rpg-action>
</rpg-box>`;
  }
}