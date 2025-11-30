import { RPGElement, html, css } from '/src/element.js';

class Settings extends RPGElement {
  static styles = [this.globalCSS, css`
rpg-box {
  margin: 15px 0;
}

el-form-item {
  justify-content: space-between;
}

el-switch {
  --el-switch-off-color: transparent;
  --el-switch-on-color: #ff8aac;
  --el-switch-border-color: #fd8c90;
}
  `];
  
  static properties = {
    config: {
      type: Object,
      state: true,
    },
  }
  
  render() {
    return html`<el-dialog title="设置">
  <el-form>
    <el-form-item label="地图显示在上方">
      <el-switch ?checked="${this.config?.map_show_reverse}" @change="${e => this.setConfig('map_show_reverse', e.target.checked)}"></el-switch>
    </el-form-item>
    <el-form-item label="玩家状态显示在上方/右侧(PC)">
      <el-switch ?checked="${this.config?.status_show_reverse}" @change="${e => this.setConfig('status_show_reverse', e.target.checked)}"></el-switch>
    </el-form-item>
  <el-form>
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
  
  setConfig(key, value) {
    this.dispatchEvent(new CustomEvent('action', {
      bubbles: true,
      composed: true,
      cancelable: false,
      detail: {
        action: 'update_config',
        key,
        value,
      },
    }));
  }
}

customElements.define('rpg-settings', Settings);