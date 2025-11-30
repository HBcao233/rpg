import { ElElement, html, css } from '/src/element.js';


class Box extends ElElement {
  static styles = css`
:host {
  display: block;
  border: 2px solid #c1b91c;
  background: #1e1e1e;
  padding: 5px;
}
:host([type="1"]) {
  border: 2px solid #c1b91c;
  background: #1e1e1e;
}
:host([type="2"]) {
  border: 2px solid #fff;
  background: #083230;
}
:host([type="3"]) {
  border: 2px solid #ea0700;
  background: #340809;
}
:host([type="4"]) {
  border: 2px solid #042eb8;
  background: #120f24;
}
:host([type="5"]) {
  border: 2px solid #07309a;
  background: #25221d;
}
:host([type="6"]) {
  border: 2px solid #cdb32b;
  background: #222601;
}
:host([type="7"]) {
  border: 2px solid #2e6232;
  background: #001101;
}
:host([type="8"]) {
  border: 2px solid #ffffff;
  background: #2b2b2b;
}
:host([type="9"]) {
  border: 2px solid #fd8c90;
  background: #2e2528;
}
:host([type="10"]) {
  border: 2px solid #fa20fa;
  background: #0c0c0c;
}
:host([type="11"]) {
  background: #011e0c;
}
:host([type="12"]) {
  border: 2px solid #432d1f;
  background: #ad8b66;
}
:host([type="13"]) {
  border: 2px solid #183f20;
  background: #082e09;
}
:host([type="14"]) {
  border: 2px solid #01eded;
  background: #152727;
}
:host([type="15"]) {
  border: 1px solid #183517;
  background: #1f3c20;
}
  `
  
  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('rpg-box', Box);