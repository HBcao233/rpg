import { RPGElement, html, css } from '/src/element.js';


export class Section10 extends RPGElement {
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
  <p>你沿着小径小心翼翼地前进，周围的树木越来越高大，光线也越来越暗。突然，草丛中传来一阵窸窣声。</p>
  <br>
  <div style="text-indent: 2em">请投掷骰子: <rpg-dice sides="6"></rpg-dice></div>
</rpg-box>`;
  }
}