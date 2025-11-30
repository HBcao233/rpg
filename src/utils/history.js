import { html, safeHTML, until } from '/src/element.js';
import { getSectionSummary, sectionSummary2html } from './section-summary.js';
import { races, race_key_map } from '/src/contants/index.js';


export class History {
  static TO_SECTION = 'to_section';
  static SELECT_RACE = 'select_race';
  static DICE = 'dice';
  
  static to_section(section) {
    return {
      type: this.TO_SECTION,
      section: String(section),
      id: `${this.TO_SECTION}-${section}`,
    }
  }
  
  static select_race(camp, race) {
    return {
      type: this.SELECT_RACE,
      camp: camp,
      race: race,
      id: this.SELECT_RACE,
    }
  }
  
  static dice(action, num) {
    return {
      type: this.DICE,
      action,
      dice: num,
      id: `${this.DICE}-${action}`,
    }
  }
  
  static passive_skill(race_key, skill_index) {
    
  }
  
  static stringify(history) {
    switch (history.type) {
      case this.TO_SECTION:
        return until(getSectionSummary(history.section).then(sectionSummary2html).then(safeHTML));
      case this.SELECT_RACE:
        const race_key = race_key_map[history.camp - 1][history.race - 1];
        const r = races[race_key];
        return html`选择职业 <span class="color_camp${r.camp}">${r.name}</span>`
        break;
      case this.DICE:
        break;
    }
  }
}