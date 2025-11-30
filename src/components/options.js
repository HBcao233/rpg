import { RPGElement, html, css } from '/src/element.js';


class Options extends RPGElement {
  static styles = [this.globalCSS, css`
rpg-box {
  margin: 15px 0;
}

.btn::part(el-button) {
  padding: 5px 20px;
  margin: 5px 0;
}
  `];
  
  static properties = {
    save: {
      type: Object,
      state: true,
    },
  }
  
  render() {
    return html`<el-dialog title="选项">
  <div class="row column middle">
    <el-button class="btn" icon="Comment" @click="${this.showRecall}">回忆</el-button>
    <el-button class="btn" icon="HelpFilled" @click="${this.showSaves}">存档</el-button>
    <el-button class="btn" icon="SettingFilled" @click="${this.showSettings}">设置</el-button>
    <el-button class="btn" icon="HomeFilled" @click="${this.toHome}">主页</el-button>
  </div>
</el-dialog>`;
  }
  
  firstUpdated() {
    this.dialog = this.renderRoot.firstElementChild;
  }
  
  get open() {
    return this.dialog?.open;
  }
  
  set open(v) {
    if (this.dialog) this.dialog.open = !!v;
  }
  
  show() {
    this.open = true;
  }
  
  hide() {
    this.open = false;
  }
  
  triggerAction(action, args) {
    this.dispatchEvent(new CustomEvent('action', {
      bubbles: true,
      composed: true,
      cancelable: false,
      detail: {
        action: action,
        ...args,
      }
    }));
  }
  
  showDialog(name) {
    this.triggerAction('show_' + name);
  }
  
  showRecall() {
    this.showDialog('recall');
  }
  
  showSaves() {
    this.showDialog('saves');
  }
  
  showSettings() {
    this.showDialog('settings');
  }
  
  toHome() {
    this.triggerAction('to_section', { section: 'title-screen' });
  }
}

customElements.define('rpg-options', Options);