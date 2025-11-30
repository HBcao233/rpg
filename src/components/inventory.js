import { RPGElement, html, css } from '/src/element.js';


class Inventory extends RPGElement {
  static styles = [this.globalCSS, css`
el-dialog::part(content) {
  border: 2px solid #fa20fa;
  background: #0c0c0c;
}

rpg-box {
  margin: 15px 0;
}
  `];
  
  static properties = {
    save: {
      type: Object,
      state: true,
    },
  }
  
  render() {
    return html`<el-dialog title="背包">
  <div class="items">
    <div class="placeholder">背包空空如也</div>
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

}

customElements.define('rpg-inventory', Inventory);