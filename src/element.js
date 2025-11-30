import { ElElement, css, unsafeHTML } from '/assets/element-plus-lit.min.js';
import { isArrayLike } from '/src/utils/index.js';
import '/assets/DOMPurify_v3.3.0.min.js';

DOMPurify.addHook('afterSanitizeAttributes', function(node) {
  if (node.tagName === 'A') { 
    if (node.getAttribute('target') === '_blank') {
      node.setAttribute('rel', 'noopener noreferrer');
    } else if (node.getAttribute('target')) {
      node.removeAttribute('target');
    }
  }
});
  
export * from '/assets/element-plus-lit.min.js';
export const safeHTML = (str) => {
  const cleaned = DOMPurify.sanitize(str, {
    ADD_ATTR: ['target'],
  });
  return unsafeHTML(cleaned);
}


export class RPGElement extends ElElement {
  static globalCSS = css`
el-dialog {
  --el-dialog-text-color: #fff;
}
@media only screen and (max-width: 768px) {
  .pc-only {
    display: none;
  }
}
@media only screen and (min-width: 768px) {
  .mobile-only {
    display: none;
  }
}

p, .p {
  text-indent: 2em;
  margin: 0;
}
.p div {
  text-indent: 0;
}

.color_task {
  color: #8d8d8d;
}
.color_npc {
  color: #739ceb;
}
.color_clothes {
  color: #d280c2;
}
.color_passive {
  color: #8d04ff;
}
.color_curse {
  color: #1ea45d;
}
.color_curse2 {
  color: #9ea301;
}
.color_curse3 {
  color: #963c08;
}
.color_enemy {
  color: #ffb600;
}
.color_dick {
  color: #b41a56;
}
.color_key {
  color: #e7f063;
}
.color_fight {
  color: #cd000b;
}
.color_hp {
  color: #b60801;
}
.color_bad {
  color: #ce070c;
}
.color_bad_ending {
  color: #f40502;
}
.color_boos {
  color: #ae0613;
}
.color_useful {
  color: #2b7447;
}
.color_random {
  color: #8489da;
}
.color_chest {
  color: #c0c920;
}
.color_skill {
  color: #2bece7;
}
.color_semen {
  color: #8c8c8c;
}
.color_item {
  color: #6ff2a4;
}
.color_pussy {
  color: #ea959c;
}
.color_anus {
  color: #ff0a5b;
}
.color_coin {
  color: #ffff00;
}
.color_common {
  color: #fff;
}
.color_uncommon {
  color: #72f79c;
}
.color_camp1 {
  color: #ffb700;
}
.color_camp2 {
  color: #7530a4;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

:host([simple])::after {
  content: '▼';
  display: block;
  width: 100%;
  text-align: center;
  margin-top: 10px;
  opacity: .9;
  color: #fff;
  animation: float 3s ease-in-out infinite;
}

.image_box {
  position: relative;
  width: 100%;
  height: fit-content;
  display: flex;
  margin: 5px 0 10px 0;
  overflow: auto;
  border-radius: 3px;
}
img {
  width: 100%;
  height: auto;
  margin: 0 auto;
}
img.icon {
  width: 25px;
  height: 25px;
  margin-left: 5px;
}
@media only screen and (min-width: 768px) {
  img {
    width: auto;
    max-width: 500px;
  }
}

.row {
  display: flex;
  align-items: flex-end;
}
.row.center {
  justify-content: center;
}
.row.middle {
  align-items: center;
}
.row.column {
  flex-direction: column; 
}

a {
  color: #66ccff;
}
a.link::before {
  content: '';
  display: inline-block;
  width: 1em;
  height: 1em;
  background-color: currentColor;
  -webkit-mask-image: url('/assets/svg/link.svg');
  mask-image: url('/assets/svg/link.svg');
  transform: translateY(2px);
}

el-tooltip:not(:has(el-button)) {
  cursor: pointer;
  border-bottom: 2px dotted currentColor;
}

el-tooltip::part(el-popper) {
  background-color: #1e1e1e;
  border-color: #c1b91c;
  max-width: 80%;
  max-height: 400px;
}
el-tooltip::part(popper__arrow)::before {
  background-color: #1e1e1e;
  border-color: #c1b91c;
}
el-tooltip [slot="content"] {
  overflow: auto;
  max-height: 400px;
}

el-dialog::part(content) {
  position: relative;
  width: calc(100% - 20px);
  min-height: 50%;
  max-height: calc(100% - 200px);
  border-radius: 3px;
  box-sizing: border-box;
  overflow: auto;
  border: 2px solid #fd8c90;
  background: #2e2528;
  padding: 0 10px;
  color: #fff;
}
el-dialog::part(header) {
  text-align: center;
  font-size: 19px;
}

.btn::part(el-button) {
  width: fit-content;
  height: fit-content;
  padding: 3px 10px;
  border: 2px solid #afae00;
  background: #1e1e1e;
  color: #e7f063; 
  border-radius: 3px;
}
.btn[type=danger]::part(el-button) {
  background: #f10;
  color: #fff;
}

.btn::part(el-button):active {
  opacity: .6;
}
.btn[disabled]::part(el-button) {
  opacity: .5;
}
  `;
  
  static styles = this.globalCSS;
}
