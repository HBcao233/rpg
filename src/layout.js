import { RPGElement, html, css, nothing, staticHtml, unsafeStatic } from '/src/element.js';
import { getValue, setValue } from './utils/index.js';
import { gameStore } from '/src/core/game-store.js';
import { History } from '/src/core/history.js';

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
    store: {
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
    <rpg-content>
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
    gameStore.addHost(this);

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

  toSection(id) {
    const success = this.rpg_content.toSection(id);
    if (success) {
      if (parseInt(id)) {
        gameStore.section = String(id);
        gameStore.pushHistory(History.to_section(id));
      }
      this.onLoad(id);
    }
  }

  nextSection() {
    if (!gameStore.section) return this.toSection(1);
    const numid = parseInt(gameStore.section);
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
      gameStore.updatePlayer('block', 0);
      gameStore.updatePlayer('round', 0);
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
          gameStore.set(e.detail.save);
        }
        this.toSection(this.save.section);
        break;
      case 'delete_save':
        gameStore.reset();
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
    if (gameStore.section) {
      if(!confirm('该操作将会覆盖自动存档，确定继续吗')) {
        return;
      }
    }
    gameStore.reset();
    this.toSection(0);
  }

  continueGame() {
    if (!gameStore.section) {
      return
    }
    this.toSection(gameStore.section);
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
      dialog.show();
    });
  }

  showSettings() {
    this.showDialog('settings').then((dialog) => {
      dialog.show();
    });
  }

  showMap() {
    this.showDialog('map').then((map) => {
      this.map = map;
    });
  }

  showStatus() {
    this.showDialog('status').then((status) => {
      this.status = status;
    });
  }

  showOptions() {
    this.showDialog('options').then((dialog) => {
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
      dialog.show();
    });
  }
}

customElements.define('rpg-app', App);