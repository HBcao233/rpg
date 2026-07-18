import { RPGElement, html, css, safeHTML } from '/src/element.js';
import { items } from '/src/constants/index.js';

class Item extends RPGElement {
  static styles = [this.globalCSS, css`
.item {
  display: inline-flex;
  text-indent: 0;
}

.item_icon {
  width: 30px;
  height: 30px;
  margin-left: 5px;
  border: 1px solid #fa20fa;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item_icon img {
  width: 25px;
  height: 25px;
}

.item_common {
  background-color: #926443;
}
.item_uncommon {
  background-color: #919191;
}
.item_rare {
  background-color: #8c801c;
}
.item_scroll1 {
  background-color: #ff9b9b;
}
.item_scroll2 {
  background-color: #8e8123;
}
.item_epic {
  background-color: #8c801e;
}
  `];

  static properties = {
    key: {
      type: String,
      attribute: 'key',
    },
    amount: {
      type: Number,
      attribute: 'amount',
      default: 1,
    },
  }

  render() {
    const item = items[this.key];
    const background = item.background;
    let icon = item.icon;
    if (this.key == 'coin') {
      if (this.amount >= 30) {
        icon = 'coin3';
      } else if (this.amount >= 20) {
        icon = 'coin2';
      }
    }
    const use = item.use.map(i => html`<div>${i.name}: ${i.effect}</div><p class="color_task">${i.task}</p>`);

    return html`<el-tooltip>
  <div class="item"><div class="item_icon ${background ? `item_${background}` : ''}"><img src="/assets/images/icon_${icon}.png"></div><span class="${item.color ? `color_${item.color}` : ''}">&nbsp;${item.name}x${this.amount}</span>
  </div>
  <div slot="content">
    ${
    !item.caption ? nothing : html`
    <p class="color_npc">"${item.caption}"</p><br>
    `}
    ${item.desc.split('\n').map(i => html`<p>${i}</p>`)}
    ${use}
  </div>
</el-tooltip>`;
  }
}

customElements.define('rpg-item', Item);
