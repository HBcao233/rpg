import { RPGElement, html, css, nothing, staticHtml, unsafeStatic } from '/src/element.js';
import { getValue, setValue, getTime } from './utils/index.js';
import { History } from './utils/history.js';
import { races } from '/src/contants/index.js';


const dialogs = ['saves', 'settings', 'inventory', 'options', 'recall'];


class App extends RPGElement {
  static styles = css`
el-main {
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-x: hidden;
  overflow-y: auto;
}

el-footer {
  height: auto;
  padding: 0;
}
  `;
  
  static properties = {
    save: {
      type: Object,
      state: true,
    },
    config: {
      type: Object,
      state: true,
    },
    map_showed: {
      type: Boolean,
      state: true,
    },
    status_showed: {
      type: Boolean,
      state: true,
    },
    ...Object.fromEntries(dialogs.map(i => [i + '_showed', {
      type: Boolean,
      state: true,
    }])),
  }
  
  render() {
    return html`
<el-container @action="${this.onAction}">
  <el-main @click="${this.containerClick}">
    <rpg-content .save="${this.save}">
      ${this.map_showed ? html`<rpg-map></rpg-map>`: nothing}
    </rpg-content>
  </el-main>
  ${this.status_showed ? html`<el-footer>
    <rpg-status></rpg-status>
  </el-footer>` : nothing}
  ${dialogs.map(i => this[i + '_showed'] ? staticHtml`<${unsafeStatic(`rpg-${i}`)}></${unsafeStatic(`rpg-${i}`)}>`: nothing)}
</el-container>
    `;
  }
  
  setup() {
    getValue('save').then((v) => {
      this.save = v ?? {};
      this.requestUpdate();
    });
    getValue('config').then((v) => {
      this.config = v ?? {};
    });
  }
  
  firstUpdated() {
    this.rpg_content = this.renderRoot.querySelector('rpg-content');
  }
  
  requestUpdate() {
    super.requestUpdate();
    this.rpg_content && this.rpg_content.requestUpdate();
  }
  
  setSave() {
    this.save.update_time = getTime();
    setValue('save', this.save);
  }
  
  updateSave(key, value) {
    this.save[key] = value;
    if (key === 'race_key') {
      const r = races[value];
      this.save.player = {
        hp: r.hp,
        max_hp: r.hp,
        atk: r.atk,
      }
      this.pushHistory(History.select_race(this.save.camp, this.save.race));
    }
    this.setSave();
  }
  
  equalHistory(target, check) {
    if (!check) return false;
    return target.id === check.id;
  }
  
  findHistory(target) {
    for (let i = this.save.history.length - 1; i >= 0; i--) {
      const h = this.save.history[i];
      if (this.equalHistory(target, h)) return h;
    }
    return null;
  }
  
  pushHistory(history) {
    if (!this.save.history) this.save.history = [];
    const h = this.findHistory(history);
    if (!h) {
      this.save.history.push(history);
    } else {
      if (history.type == 'select_race') {
        h.camp = history.camp;
        h.race = history.race;
      }
    }
  }
  
  toSection(id) {
    const success = this.rpg_content.toSection(id);
    if (success) {
      if (parseInt(id)) {
        this.save.section = String(id);
        this.pushHistory(History.to_section(id));
      }
      this.onLoad(id);
      this.setSave();
    }
  }
  
  nextSection() {
    if (!this.save.section) return this.toSection(1);
    const numid = parseInt(this.save.section);
    if (!isNaN(numid)) this.toSection(numid + 1);
    else this.toSection('page500');
  }
  
  onLoad(id) {
    if (id === 'title-screen') {
      this.options_dialog.hide();
      this.status_showed = false;
      this.map_showed = false;
      return;
    } 
    const numid = parseInt(id);
    if (numid >= 8) {
      this.showMap();
      this.showStatus();
    }
    if (numid === 8) {
      this.save.player.block = 0;
      this.save.player.round = 0;
    }
  }
  
  onAction(e) {
    if (!e.detail.action) return;
    switch (e.detail.action) {
      case 'start_game':
        this.startGame();
        break;
      case 'continue_game':
        this.continueGame();
        break;
      case 'next':
        this.nextSection();
        break;
      case 'to_section':
        this.toSection(e.detail.section);
        break;
      case 'back':
        this.toSection(this.save.section)
        break;
        
      case 'show_saves':
        this.showSaves();
        break;
      case 'load_save':
        if (e.detail.save) {
          this.save = e.detail.save
        }
        this.toSection(this.save.section);
        break;
      case 'delete_save':
        this.save = {}
        this.setSave();
        break;
        
      case 'show_settings':
        this.showSettings();
        break;
      
      case 'update_config': 
        this.config[e.detail.key] = e.detail.value;
        setValue('config', this.config);
        break;
      case 'update_save':
        this.updateSave(e.detail.key, e.detail.value);
        break;
        
      case 'show_options':
        this.showOptions();
        break;
      case 'show_inventory':
        this.showInventory();
        break;
      case 'show_recall':
        this.showRecall();
        break;
    }
  }
  
  startGame() {
    if (this.save.section) {
      if(!confirm('该操作将会覆盖自动存档，确定继续吗')) {
        return;
      }
    }
    this.save = {};
    this.toSection(0);
  }
  
  continueGame() {
    if (!this.save?.section) {
      return
    }
    this.toSection(this.save.section);
  }
  
  containerClick(e) {
    if (this.rpg_content.renderRoot.querySelectorAll('section').length > 1) return;
    const isSimple = this.rpg_content.renderRoot.querySelector('[simple]');
    if (isSimple) {
      this.nextSection();
    }
  }
  
  showDialog(name) {
    return new Promise((resolve, reject) => {
      this[name + '_showed'] = true;
      requestAnimationFrame(() => {
        const dialog = this.renderRoot.querySelector(`rpg-${name}`);
        resolve(dialog);
      });
    });
  }
  
  showSaves() {
    this.showDialog('saves').then((dialog) => {
      dialog.save = this.save;
      dialog.show();
    });
  }
  
  showSettings() {
    this.showDialog('settings').then((dialog) => {
      dialog.config = this.config;
      dialog.show();
    });
  }
  
  showMap() {
    this.showDialog('map').then((map) => {
      map.save = this.save;
      this.map = map;
    });
  }
  
  showStatus() {
    this.showDialog('status').then((status) => {
      status.save = this.save;
      this.status = status;
    });
  }
  
  showOptions() {
    this.showDialog('options').then((dialog) => {
      this.options_dialog = dialog;
      dialog.show();
    });
  }
  
  showInventory() {
    this.showDialog('inventory').then((dialog) => {
      dialog.show();
    });
  }
  
  showRecall() {
    this.showDialog('recall').then((dialog) => {
      dialog.save = this.save;
      dialog.show();
    });
  }
}

customElements.define('rpg-app', App);