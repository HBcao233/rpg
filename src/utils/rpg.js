import { html, safeHTML, nothing } from '/src/element.js';
import { races } from '/src/contants/index.js';


export const getPassiveSkill = (race_key, skill_index, effect) => {
  const r = races[race_key];
  if (!r) return nothing;
  const skill = r.passive_skill[skill_index];
  return html`<el-tooltip>
  <span class="color_passive">${skill.name}</span>
  <div slot="content">
    <div class="image_box"><img src="/assets/images/race_${race_key}_passive_skill${skill_index + 1}.jpg"></div>
    <p>${safeHTML(skill.desc)}</p>
    <br>
    <p class="color_task">${safeHTML(skill.task)}</p>
    ${effect ? html`<br><div class="p">当前效果: ${safeHTML(effect)}</div>` : ''}
  </div>
</el-tooltip>`;
}

export const getItem = (item_key, amount = 1) => {
  const item = items[item_key];
  let icon = item.icon;
  let background = item.background;
  if (item_key == 'coin') {
    if (amount >= 30) {
      icon = 'coin3';
    } else if (amount >= 20) {
      icon = 'coin2';
    }
  }
  let use = item.use.map(i => `<div>${i.name}: ${i.effect}</div><p class="color_task">${i.task}</p>`).join('<br>');
  if (use) use += '<br>';
  return tag('div', {
    class: 'item tooltip',
    innerHTML: `<div class="item_icon ${background ? `item_${background}` : ''}"><img src="/static/images/icon_${icon}.png"></div><span class="${item.color ? `color_${item.color}` : ''}"> ${item.name}x${amount}</span><div class="tooltip-box">${item.caption ? `<p class="color_npc">"${item.caption}"</p><br>` : ''}${item.desc.split('\n').map(i => `<p>${i}</p>`).join('')}${use}</div>`,
  });
}