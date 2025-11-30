import { RPGElement, html, css } from '/src/element.js';


export class Section0 extends RPGElement {
  static get styles() {
    return [this.globalCSS, css`
tr td:first-child {
  width: 75px;
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
<div class="title">文字颜色标识</div>
  <table class="text_colors">
    <tr>
      <td>剧情文字</td>
      <td>基本的故事文字</td>
    </tr>
    <tr>
      <td class="color_task">任务文字</td>
      <td>你需要在现实里完成的任务</td>
    </tr>
    <tr>
      <td class="color_npc">NPC对话</td>
      <td>故事中出现的人物的台词</td>
    </tr>
    <tr>
      <td class="color_clothes">服装文字</td>
      <td>施述了你必须穿着的服装</td>
    </tr>
    <tr>
      <td class="color_passive">种族被动</td>
      <td>某种族的特定被动任务</td>
    </tr>
    <tr>
      <td class="color_curse">诅咒文字</td>
      <td>和诅咒系统相关的文字</td>
    </tr>
    <tr>
      <td class="color_enemy">敌方种类</td>
      <td>描述敌人种类的文字</td>
    </tr>
    <tr>
      <td class="color_dick">阴茎特征</td>
      <td>需要使用的自慰棒的特征</td>
    </tr>
    <tr>
      <td class="color_key">关键道具</td>
      <td>特殊事件中需要使用到的道具</td>
    </tr>
  </table>
</rpg-box>`;
  }
}
