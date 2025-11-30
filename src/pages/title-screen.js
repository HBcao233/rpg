import { RPGElement, html, css } from '/src/element.js';

export class TitleScreen extends RPGElement {
  static get styles() {
    return [this.globalCSS, css`
.text-gradient {
  display: inline-block;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.gradient1 {
  background-image: linear-gradient(to right, #b4272f, #bc2d1f);
}
.gradient2 {
  background-image: linear-gradient(to right, #8d54c9, #8e56c1);
}
.gradient3 {
  background-image: linear-gradient(to right, #ea99a2, #eb999b);
}
.gradient4 {
  background-image: linear-gradient(to right, #2ebb21, #38b827);
}
.gradient5 {
  background-image: linear-gradient(to right, #f26ed4, #f66dd7);
}

.main-title {
  position: relative;
  font-size: 22px;
  line-height: 1.5;
}

rpg-box {
  margin-bottom: 200px;
}

el-button::part(el-button) {
  display: block;
  font-size: 25px;
  margin: 5px 20px;
  padding: 0 10px;
  background: transparent;
}

el-button[disabled]::part(el-button) {
  opacity: .5;
}

el-button::part(el-button):active {
  opacity: .6;
}
    `];
  }
  
  static properties = {
    save: {
      type: Object,
      state: true,
    },
  }
  
  render() {
    return html`
<rpg-box>
  <h2 class="main-title"><span class="text-gradient gradient1">伪娘</span><span class="text-gradient gradient2">转生</span><span style="color: #709fe5">到</span><br class="mobile-only"><span class="text-gradient gradient3">淫乱</span><span class="text-gradient gradient4">世界</span><span style="color: #ef9b41">跑团</span> <span style="color: #e8ef3f">RPG!</span><span style="font-size: 14px; margin-left: 15px">Ver. 2.2</span></h2>
</rpg-box>
<div class="controls">
  <el-button text style="--el-button-text-color: #8d54c9;" ?disabled="${!this.save?.section}" @click="${this.continueGame}">继续游戏</el-button>
  <el-button text style="--el-button-text-color: #f26ed4;" @click="${this.startGame}">从头开始</el-button>
  <el-button text data-action="saves" style="--el-button-text-color: #38b827" @click="${this.showSaves}">存档</el-button>
  <el-button text data-action="settings" style="--el-button-text-color: #ea99a2" @click="${this.showSettings}">设置</el-button>
</div>
    `;
  }
  
  continueGame() {
    this.dispatchEvent(new CustomEvent('action', {
      bubbles: true,
      composed: true,
      cancelable: false,
      detail: {
        action: 'continue_game',
      }
    }));
  }
  
  startGame() {
    this.dispatchEvent(new CustomEvent('action', {
      bubbles: true,
      composed: true,
      cancelable: false,
      detail: {
        action: 'start_game',
      },
    }));
  }
  
  showSaves() {
    this.dispatchEvent(new CustomEvent('action', {
      bubbles: true,
      composed: true,
      cancelable: false,
      detail: {
        action: 'show_saves',
      },
    }));
  }
  
  showSettings() {
    this.dispatchEvent(new CustomEvent('action', {
      bubbles: true,
      composed: true,
      cancelable: false,
      detail: {
        action: 'show_settings',
      },
    }));
  }
}
