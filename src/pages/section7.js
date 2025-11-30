import { RPGElement, html, css, nothing, safeHTML } from '/src/element.js';
import { range } from '/src/utils/index.js';
import { races, race_key_map } from '/src/contants/index.js';


export class Section7 extends RPGElement {
  static styles = [this.globalCSS, css`
.container {
  position: relative;
}

.title {
  line-height: 2;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}

.selection::part(el-button) {
  position: absolute;
  top: 2px;
  right: 2px;
  padding: 3px 5px;
  opacity: .5;
  background-color: transparent;
  border-color: transparent;
  transition: all .3s;
  color: #fff;
}
.selection::part(el-button):active,
.selection[active]::part(el-button) {
  border-color: #ffb700;
  opacity: 1;
}

.camp {
  text-align: center;
  margin: 10px;
  opacity: .3;
  border-style: solid;
  border-width: 0;
}
.camp[active] {
  opacity: 1;
  border-width: 2px;
}
.camp1 {
  border-color: #afae00;
  background: #1e1e1e;
}
.camp2 {
  border-color: #6a315e;
  background: #000115;
}

.select-race {
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
.select-race rpg-dice {
  margin: 0;
  flex: 1;
}
.select-race rpg-dice[active] {
  opacity: 1;
}

.race {
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  margin: 15px 0;
}
.race .image_box {
  height: 180px;
}
.race_header .image_box {
  height: 300px;
}
.race img {
  max-width: 100%;
  height: auto;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: top;
}

.race_props {
  position: absolute;
  top: 0;
  left: 0;
  background: #1e1e1e;
  padding: 5px;
}
.race_props > .text {
  font-size: 13px;
  padding: 0 5px;
}
.race_prop div:first-child {
  font-size: 13px;
}
.race_rate {
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: currentColor;
  -webkit-mask-image: url('/assets/svg/star.svg');
  mask-image: url('/assets/svg/star.svg');
  -webkit-mask-size: cover;
}

.race_index {
  width: 50px;
  height: 50px;
  background: currentColor;
  border-radius: 50%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}
.race_index .text {
  color: #000;
  font-size: 30px;
}

.race_prop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 1;
}

.race_name {
  display: flex;
  align-items: center;
  justify-content: center;
}

.race_details {
  padding: 10px;
  padding-top: 0;
  padding-bottom: 20px;
}
.race_info {
  width: 100%;
}
.race_info > .header {
  width: 100%;
  height: 50px;
  flex-shrink: 0;
  text-align: center;
}
.race_clothes > .header {
  background: #620033;
}
.race_passive_skill > .header {
  background: #260033;
}
.race_active_skill > .header {
  background: #330009;
}

.race_info_title {
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 19px;
}
.race_info_details {
  padding: 10px;
  padding-top: 0;
  padding-bottom: 20px;
}

.race_header,
.race_clothes,
.race_skill {
  width: 100%;
}

.race_skills {
  display: flex;
  flex-wrap: wrap;
}
.race .image_box {
  height: auto;
}

@media only screen and (min-width: 768px) {
  .race_header,
  .race_clothes,
  .race_skill {
    width: 50%;
  }
}
  `];
  
  static properties = {
    simple: {
      type: Boolean,
      reflect: true,
      default: false,
    },
    save: {
      state: true,
    },
  }

  render() {
    const renderRace = () => {
      const { camp, race, race_key } = this.save;
      const r = races[race_key];
      return html`<rpg-box class="race">
  <div class="race_header">
    <div class="image_box">
      <img src="/assets/images/race_${race_key}.jpg" />
      <div class="race_props">
        <div class="race_index color_camp${camp}"><div class="text">${race}</div></div>
        <div class="text">职业属性</div>
        <div class="items">
          <div class="race_prop"><div>HP<br>${range(r.hp_rate).map(() => html`<div class="race_rate color_camp${camp}"></div>`)}</div><div>${r.hp}</div></div>
          <div class="race_prop"><div>ATK<br>${range(r.atk_rate).map(() => html`<div class="race_rate color_camp${camp}"></div>`)}</div><div>${r.atk}</div></div>
        </div>
      </div>
    </div>
    <div class="race_name color_camp1">～${r.name}～</div>
    <p class="race_details">${safeHTML(r.desc)}</p>
  </div>
  <div class="race_info race_clothes">
    <div class="header">
      <div class="title">服饰</div>
    </div>
    <div class="image_box">
      <img src="/assets/images/race_${race_key}_clothes.jpg" />
    </div>
    <div class="race_info_details">
      <div class="race_info_title color_clothes">[${r.clothes.name}]</div>
      <p>${r.clothes.desc}</p>
      <br>
      <p class="color_task">${r.clothes.task}</p>
    </div>
  </div>
  <div class="race_info race_passive_skill">
    <div class="header">
      <div class="title">职业被动</div>
    </div>
    <div class="race_skills">
      <div class="race_skill">
        <div class="image_box">
          <img src="/assets/images/race_${race_key}_passive_skill1.jpg" />
        </div>
        <div class="race_info_details">
          <div class="race_info_title color_passive">[${r.passive_skill[0].name}]</div>
          <p>${safeHTML(r.passive_skill[0].desc)}</p>
          <br>
          <p class="color_task">${safeHTML(r.passive_skill[0].task)}</p>
        </div>
      </div>
      <div class="race_skill">
        <div class="image_box">
          <img src="/assets/images/race_${race_key}_passive_skill2.jpg" />
        </div>
        <div class="race_info_details">
          <div class="race_info_title color_passive">[${r.passive_skill[1].name}]</div>
          <p>${safeHTML(r.passive_skill[1].desc)}</p>
          <br>
          <p class="color_task">${safeHTML(r.passive_skill[1].task)}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="race_info race_active_skill">
    <div class="header">
      <div class="title">攻击技能</div>
    </div>
    <div class="race_skills">
      <div class="race_skill">
        <div class="race_info_details">
          <div class="race_info_title color_bad">[弱击] ${r.active_skill[0].name}</div>
          <p class="color_task">${r.active_skill[0].task}</p>
          <br>
          <div class="race_info_title color_useful">[有效] ${r.active_skill[1].name}</div>
          <p class="color_task">${r.active_skill[1].task}</p>
          <br>
          <div class="race_info_title color_key">[会心] ${r.active_skill[2].name}</div>
          <p class="color_task">${r.active_skill[2].task}</p>
        </div>
      </div>
      <div class="race_skill">
        <div class="image_box">
          <img src="/assets/images/race_${race_key}_ult.jpg" />
        </div>
        <div class="race_info_details">
          <div class="race_info_title color_skill">[特殊技能] ${r.ult.name}</div>
          <p>${r.ult.desc}</p>
          <br>
          <p class="color_task">${r.ult.task}</p>
        </div>
      </div>
    </div>
  </div>
  <rpg-action action="next">(1) 继续</rpg-action>
</rpg-box>`
    }
    
    return html`<rpg-box class="container">
  <div class="title">转生服务中心</div>
  <el-button class="selection" ?active="${this.save?.selection}" @click="${this.switchSelection}">自选模式</el-button>
  <div class="row center">${this.save?.selection ? '请选择你的阵营' : '请先投一颗骰子决定你的阵营'}</div>
  ${!this.save || this.save.selection ? nothing : 
    html`<div class="row center" style="margin-top: 5px">
      <rpg-dice sides="6" @dice="${this.diceCamp}" ?disabled="${!this.save || this.save.camp}"></rpg-dice>
    </div>`
  }
  <div class="row center">
    <rpg-box class="camp camp1" active="${this.save?.camp === 1 || nothing}" @click="${() => this.save?.selection && this.updateCamp(1)}">
      <div class="color_random">骰子点数 1-3</div>
      <div class="color_camp1">英雄阵营</div>
    </rpg-box>
    <rpg-box class="camp camp2" active="${this.save?.camp === 2 || nothing}" @click="${() => this.save?.selection && this.updateCamp(2)}">
      <div class="color_random">骰子点数 4-6</div>
      <div class="color_shadow">暗影阵营</div>
    </rpg-box>
  </div>
  ${this.save?.camp ? html`<div class="row center">${this.save?.selection ? '请选择一颗骰子决定你的种族': '请再投一颗骰子决定你的种族'}</div>
  ${!this.save?.selection ? 
    html`<div class="row center" style="margin-top: 5px">
      <rpg-dice sides="6" @dice="${this.diceRace}" ?disabled="${!this.save || this.save.race}"></rpg-dice>
    </div>` :
    html`<div class="select-race">
      <rpg-dice sides="6" data-dice="1" disabled active="${this.save?.race === 1 || nothing}" @click="${this.updateRace.bind(this, 1)}"></rpg-dice>
      <rpg-dice sides="6" data-dice="2" disabled active="${this.save?.race === 2 || nothing}" @click="${this.updateRace.bind(this, 2)}"></rpg-dice>
      <rpg-dice sides="6" data-dice="3" disabled active="${this.save?.race === 3 || nothing}" @click="${this.updateRace.bind(this, 3)}"></rpg-dice>
      <rpg-dice sides="6" data-dice="4" disabled active="${this.save?.race === 4 || nothing}" @click="${this.updateRace.bind(this, 4)}"></rpg-dice>
      <rpg-dice sides="6" data-dice="5" disabled active="${this.save?.race === 5 || nothing}" @click="${this.updateRace.bind(this, 5)}"></rpg-dice>
      <rpg-dice sides="6" data-dice="6" disabled active="${this.save?.race === 6 || nothing}" @click="${this.updateRace.bind(this, 6)}"></rpg-dice>
    </div>`
  }` : nothing}
</rpg-box>
${this.save?.race_key ? renderRace(): nothing}
    `;
  }
  
  updateSave(key, value) {
    this.save[key] = value;
    this.requestUpdate()
    this.dispatchEvent(new CustomEvent('action', {
      bubbles: true,
      composed: true,
      cancelable: false,
      detail: {
        action: 'update_save',
        key: key,
        value: value,
      },
    }));
  }
  
  switchSelection() {
    this.updateSave('selection', !this.save?.selection);
  }
  
  diceCamp(e) {
    this.updateCamp(e.detail.dice <= 3 ? 1 : 2);
  }
  
  updateCamp(camp) {
    this.updateSave('camp', camp);
    if (this.save.race) this.updateRaceKey();
  }
  
  diceRace(e) {
    this.updateRace(e.detail.dice);
  }
  
  updateRace(race) {
    this.updateSave('race', race);
    this.updateRaceKey();
  }
  
  updateRaceKey() {
    this.updateSave('race_key', race_key_map[this.save.camp - 1][this.save.race - 1]);
  }
}
