import { ElElement, html } from '/src/element.js';


export class Page500 extends ElElement {
  render() {
    return html`<rpg-box><p>你好像来到了未知领域(ㅇㅅㅇ)</p><rpg-action action="to_section" data-section="title-screen">返回主页</rpg-action></rpg-box>`;
  }
}
