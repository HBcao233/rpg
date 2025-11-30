import { RPGElement, html, css } from '/src/element.js';


export class Section1 extends RPGElement {
  static properties = {
    simple: {
      type: Boolean,
      reflect: true,
      default: false,
    },
  }

  render() {
    return html`<rpg-box>
  <p>某一天早上你从床上起来，准备去做日常工作。当你正从家里出来时，一辆大卡车突然出现在路上。瞬间，你的视野陷入一片黑暗……等你清醒过来时，你发现自己并不在医院里，而是在一个像是天堂般的地方，一位穿着花哨的女神正一边笑着一边俯视着你。被那东之国称为“异世界转生”的事件似乎发生在了你的身上。你决定抛弃你的过去，在这个新的幻想世界开始自己新的生活！</p>
  <br>
  <rpg-action action="next">(1) 继续</rpg-action>
  <rpg-action action="to_section" data-section="7">(2) 跳过剧情</rpg-action>
</rpg-box>`;
  }
}
