import { ElElement, html, css } from '/src/element.js';

export class Action extends ElElement {
  static styles = css`
:host {
  display: block;
  text-indent: 2em;
  margin: 0;
  color: #6086cd;
}

:host(:active) {
  opacity: .6;
}

:host([disabled]) {
  opacity: .3;
}
  `;
  static properties = {
    disabled: {
      type: Boolean,
      attribute: true,
      reflect: true,
      default: false,
    },
    action: {
      type: String,
      attribute: true,
    },
  }
  
  render() {
    return html`<slot></slot>`;
  }
  
  onMounted() {
    this.addEventListener('click', this);
  }
  
  onBeforeUnmounted() {
    this.removeEventListener('click', this);
  }
  
  handleEvent(e) {
    const handlers = {
      'click': this.onClick,
    }
    handlers[e.type].call(this, e);
  }
  
  onClick(e) {
    if (this.disabled) return;
    this.dispatchEvent(new CustomEvent('action', {
      bubbles: true,
      composed: true,
      cancelable: false,
      detail: {
        action: this.action,
        ...this.dataset,
      }
    }));
  }
}

customElements.define('rpg-action', Action);