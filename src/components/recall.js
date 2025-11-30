import { RPGElement, html, css, repeat, nothing } from '/src/element.js';
import { History } from '/src/utils/history.js';


class Recall extends RPGElement {
  static styles = [this.globalCSS, css`
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
    return html`<el-dialog title="回想">
  <div class="items">
    ${this.save ? repeat(this.save.history.reverse(), (item) => item.id, (item) => html`<rpg-box type="9">${History.stringify(item)}</rpg-box>`): nothing}
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

customElements.define('rpg-recall', Recall);