import { RPGElement, html, css, nothing, safeHTML } from '/src/element.js';
import { races } from '/src/contants/index.js';
import { range, getPassiveSkill } from '/src/utils/index.js';


class Status extends RPGElement {
  static styles = [this.globalCSS, css`
:host {
  position: relative;
  height: fit-content;
  flex-shrink: 0;
  z-index: 10;
  border-top: 2px solid #c1b91c;
  background: #1e1e1ef0;
  padding: 5px;
  display: flex;
  box-sizing: border-box;
}

.info {
  margin-top: 5px;
  margin-left: 5px; 
  flex-shrink: 0
}
.race_image_box {
  width: 100px;
  height: 100px;
  border-radius: 5px;
  flex-shrink: 0;
}
.race_image_box img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  object-position: top;
}
.race_name {
  width: 70px; 
}

.effects {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 50%;
  margin: 5px;
  margin-right: 0;
  margin-bottom: 30px;
  z-index: 1;
}

.effects .effect {
  margin-bottom: 5px;
  white-space: nowrap;
}

.controls {
  position: absolute;
  bottom: 0px;
  right: 5px;
  display: flex;
}
.controls .btn {
  margin: 0 5px;
  pointer-events: auto;
  padding: 3px 7px;
}

el-button::part(el-button) {
  width: fit-content;
  height: fit-content;
  padding: 3px 10px;
  border: 2px solid #afae00;
  background: #1e1e1e;
  color: #e7f063; 
  border-radius: 3px;
  margin: 5px;
}
el-button[type=danger]::part(el-button) {
  background: #f10;
  color: #fff;
}

el-button::part(el-button):active {
  opacity: .6;
}
el-button[disabled]::part(el-button) {
  opacity: .5;
}
  `];
  
  static properties = {
    save: {
      type: Object,
      state: true,
    },
  }
  
  render() {
    const camp = this.save?.camp;
    const race = this.save?.race;
    const race_key = this.save?.race_key;
    const r = races[race_key];
    return html`
<div class="race_image_box image_box">
  <img class="race_image" src="${!race_key ? nothing : `/assets/images/race_${race_key}.jpg`}">
</div>
<div class="info">
  ${!r ? nothing : html`<el-tooltip class="tooltip">
    <span class="race_name color_camp${camp}">${r.name}</span>
    <div slot="content">${safeHTML(r.desc)}</div>
  </el-tooltip>`}
  <div>HP <span class="hp">${this.save?.player.hp ?? 0} / ${this.save?.player.max_hp ?? 0}</span></div>
  <div>ATK <span class="atk">${this.save?.player.atk ?? 0}</span></div>
  <div>MP <span class="mp">0 / 0</span></div>
</div>
<div class="effects">${range(2).map((i) => getPassiveSkill(race_key, i))}</div>
<div class="controls">
  <el-tooltip content="背包">
    <el-button icon="SuitcaseLine" @click="${this.showInventory}"></el-button>
  </el-tooltip>
  <el-tooltip content="选项">
    <el-button icon="SettingFilled" @click="${this.showOptions}"></el-button>
  </el-tooltip>
</div>`;
  }
  
  showDialog(name) {
    this.dispatchEvent(new CustomEvent('action', {
      bubbles: true,
      composed: true,
      cancelable: false,
      detail: {
        action: 'show_' + name,
      },
    }));
  }
  
  showInventory() {
    this.showDialog('inventory');
  }
  
  showOptions() {
    this.showDialog('options');
  }
}

customElements.define('rpg-status', Status);