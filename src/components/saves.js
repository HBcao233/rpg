import { RPGElement, html, css, until, unsafeHTML, repeat } from '/src/element.js';
import { 
  range, 
  getValue, setValue, 
  getTime, formatDateTime, formatDateTimeLess, 
  downloadFile,
} from '/src/utils/index.js';
import '/assets/core-js_v3.47.0-actual-iterator-map.esm.js';
import { getSectionSummary, sectionSummary2html, cutSectionSummary } from '/src/utils/section-summary.js';
import { gz64_decode, gz64_encode } from '/src/utils/coding.js';


// 最大存档数量
const MAX_SAVE_NUM = 30;

class Saves extends RPGElement {
  static styles = [this.globalCSS, css`
rpg-box {
  margin: 15px 0;
}
rpg-box:first-child {
  margin-top: 0;
}

.save_name {
  font-weight: bold;
}

.save_info,
.save_details {
  display: flex;
  justify-content: space-between;
}

.save_desc {
  display: -webkit-box; 
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; 
  overflow: hidden; 
}
.save_time {
  flex-shrink: 0;
}

.save_details el-button::part(el-button) {
  margin: 0 2px;
  flex-shrink: 0;
}

.placeholder {
  height: 73px;
}
  `];
  
  static properties = {
    open: {
      type: Boolean,
      reflect: true,
    },
    save: {
      type: Object,
      state: true,
    },
    patch: {
      type: Number,
      state: true,
      default: 10,
    },
  }
  
  render() {
    const renderDesc = (i) => {
      if (this.isEmpty(i)) return '空'
      if (i === 0) {
        return until(getSectionSummary(this.save.section).then(sectionSummary2html).then(unsafeHTML), '空');
      }
      return unsafeHTML(sectionSummary2html(this.saves[i].desc));
    }
    const renderTime = (i) => {
      const create_time = i === 0 ? this.save?.update_time : this.saves?.[i]?.create_time;
      return this.isEmpty(i) ? '' : formatDateTimeLess(create_time);
    }
    const renderItems = (patch) => {
      return repeat(range(MAX_SAVE_NUM + 1), i => i, i => i > patch ? html`<div class="placeholder" data-index="${i}"></div>` : html`<rpg-box>
  <div class="save_info">
    <div class="save_name">${i === 0 ? '自动存档' : `存档 ${i}`}</div>
    <div class="save_controls">
      <el-tooltip content="删除">
        <el-button class="btn" icon="DeleteFilled" type="danger" ?disabled="${this.isEmpty(i)}" @click="${this.deleteSave.bind(this, i)}"></el-button>
      </el-tooltip>
      <el-tooltip content="读档">
        <el-button class="btn" icon="Reading" ?disabled="${this.isEmpty(i)}" @click="${this.loadSave.bind(this, i)}"></el-button>
      </el-tooltip>
      <el-tooltip content="保存">
        <el-button class="btn" icon="HelpFilled" ?disabled="${i === 0}" @click="${this.saveSave.bind(this, i)}"></el-button>
      </el-tooltip>
    </div>
  </div>
  <div class="save_desc">${renderDesc(i)}</div>
  <div class="save_details">
    <div class="save_time">${renderTime(i)}</div>
    <div class="save_controls">
      <el-tooltip content="导出"><el-button class="btn" icon="Download" ?disabled="${this.isEmpty(i)}" @click="${this.exportSave.bind(this, i)}"></el-button></el-tooltip>
      <el-tooltip content="导入">
        <el-button class="btn" icon="Upload" ?disabled="${i === 0}" @click="${this.importSave.bind(this, i)}"></el-button>
      </el-tooltip>
    </div>
  </div>
</rpg-box>`);
    }
    
    return html`<el-dialog title="存档">${renderItems(this.patch)}</el-dialog>`;
  }
  
  setup() {
    getValue('saves').then((v) => {
      this.saves = v ?? {};
    });
  }
  
  firstUpdated() {
    this.dialog = this.renderRoot.firstElementChild;
    requestAnimationFrame(() => {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.observer.unobserve(entry.target);
            const index = parseInt(entry.target.dataset.index);
            if (index > this.patch) {
              this.patch = index;
            }
          }
        });
      }, { 
        root: this.dialog.content,
        rootMargin: '100px', 
        threshold: 0, 
      });
      
      // 观察占位符
      this.shadowRoot.querySelectorAll('.placeholder').forEach(el => {
        this.observer.observe(el);
      });
    });
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
  
  isEmpty(i) {
    return i === 0 ? !this.save?.section : !this.saves?.[i]?.save;
  }

  loadSave(i, e) {
    if (i === NaN) return; 
    if (this.isEmpty(i)) return alert('存档为空');
    let save = null;
    if (i !== 0) {
      try {
        if (!this.saves[i]?.save) return alert('存档为空');
        save = JSON.parse(gz64_decode(this.saves[i].save));
      } catch (e) {
        console.error('加载存档失败', e);
        alert('加载存档失败');
        return;
      }
      if (!save.section) {
        alert('存档不存在');
        return;
      }
    }
    this.hide();
    this.dispatchEvent(new CustomEvent('action', {
      bubbles: true,
      composed: true,
      cancelable: false,
      detail: {
        action: 'load_save',
        save: save,
      },
    }));
  }
  
  async _saveSave() {
    let race_name = '';
    if (this.save.race_key) {
      let race_color = '#ffb700';
      if (this.save.camp == 2) 
        race_color = '#7530a4';
      race_name = `ō${races[save.race_key].name}óǒ${race_color}ò: `;
    }
    const summary = await getSectionSummary(this.save.section);
    const desc = cutSectionSummary(race_name + summary);
    return {
      create_time: this.save.update_time,
      desc: desc,
      save: gz64_encode(JSON.stringify(this.save)),
    }
  }
  
  async saveSave(i, e) {
    if (i <= 0) return;
    if (i > MAX_SAVE_NUM) return alert(`最多只能存 ${MAX_SAVE_NUM} 个存档`);
    if (!this.save?.section) return alert('自动存档为空');
    const save = await this._saveSave();
    save.create_time = getTime();
    this.saves[i] = save;
    this.requestUpdate()
    setValue('saves', this.saves);
  }
  
  deleteSave(i) {
    if (i > MAX_SAVE_NUM) return alert('存档不存在');
    let name = '自动存档';
    if (i > 0) name = '存档 ' + i;
    if (!confirm(`确定要删除 ${name} 吗？`)) return;
    if (i === 0) {
      this.save = {};
      this.requestUpdate();
      this.dispatchEvent(new CustomEvent('action', {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: {
          action: 'delete_save',
        },
      }));
      return;
    }
    delete this.saves[i];
    this.requestUpdate();
    setValue('saves', this.saves);
  }
  
  async exportSave(i, e) {
    if (i > MAX_SAVE_NUM) return alert('存档不存在');
    let jsonString, create_time;
    if (i === 0) {
      const save = await this._saveSave();
      create_time = this.save.update_time;
      jsonString = JSON.stringify(save);
    } else {
      if (!this.saves[i].save) return alert('存档为空');
      create_time = this.saves[i].create_time;
      jsonString = JSON.stringify(this.saves[i]);
    }

    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    create_time = formatDateTime(create_time * 1000).replaceAll(':', '-').replace(' ', '_');
    const name = `rbqrpg_save_${create_time}.json`
    downloadFile(url, name);
    URL.revokeObjectURL(url);
  }
  
  importSave(i) {
    if (i <= 0 || i > MAX_SAVE_NUM) return alert('存档不存在');
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'text/plain, application/json';
    input.onchange = () => {
      const file = input.files[0];
      const maxSizeBytes = 10 * 1024 * 1024; 
      input.remove();
      if (!(['text/plain', 'application/json'].includes(file.type))) {
        return alert('必须是 json 或 txt 文件');
      }
      if (file.size > maxSizeBytes) {
        return alert('文件不能大于 10MB');
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const fileContent = e.target.result;
          let s = JSON.parse(fileContent);
          s = {
            create_time: s.create_time,
            desc: s.desc,
            save: s.save,
          }
          const save = JSON.parse(gz64_decode(s.save));
          if (save.section === undefined) {
            return alert('存档为空');
          }
          if (this.saves[i]?.save && !confirm(`覆盖存档 ${i} 吗？`)) return;
          this.saves[i] = s;
          this.requestUpdate()
          setValue('saves', this.saves);
        } catch (e) {
          console.error('导入存档失败:', e);
          return alert('导入存档失败')
        }
      };
      reader.readAsText(file);
    }
    input.oncancel = function() {
      input.remove();
    }
    input.click();
  }
}

customElements.define('rpg-saves', Saves);