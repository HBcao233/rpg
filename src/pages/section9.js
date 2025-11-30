import { RPGElement, html, css } from '/src/element.js';


export class Section9 extends RPGElement {
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
  <p>你站在淫暗森林的入口，斑驳的阳光透过层层叠叠的枝叶洒下，潮湿的泥土混着草木清香扑面而来，一条隐约的小径蜿蜒向密林深处。</p>
  <br>
  <rpg-action action="next">(1) 前进</rpg-action>
</rpg-box>`;
  }
}