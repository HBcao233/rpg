import { RPGElement, html, css, unsafeStatic, staticHtml, repeat } from '/src/element.js';
import { pages } from '/src/pages/index.js';
import { camelToKebab } from '/src/utils/index.js';


class Content extends RPGElement {
  static get styles() {
    return [this.globalCSS, css`
:host {
  display: grid;
  grid-template-areas: "main";
  width: 100%;
  height: 100%;
}

section {
  grid-area: main;
  transition: opacity 0.5s ease;
}
    `];
  }
  
  static properties = {
    sections: {
      type: Array,
      state: true,
      default: [],
    },
    save: {
      type: Object, 
      state: true,
    },
  }
  
  render() {
    return html`${repeat(this.sections, (item) => item.id, (item) => item.template)}<slot></slot>`;
  }
  
  onMounted() {
    this.toSection('title-screen');
  }
  
  firstUpdated() {
    this.currentSection = null;
  }
  
  updated() {
    if (this.currentSection?.firstElementChild) this.currentSection.firstElementChild.save = this.save;
  }
  
  requestUpdate() {
    super.requestUpdate();
    this.currentSection?.firstElementChild && this.currentSection.firstElementChild.requestUpdate();
  }
  
  /**
   * 切换section
   */
  toSection(id) {
    if (id === this.currentPage) return false;
    
    let tag_name = pages.get(String(id));
    let success = true;
    if (!tag_name) {
      success = false;
      id = 'page404';
      tag_name = 'rpg-page404';
    }

    this.currentPage = id;
    const tag = unsafeStatic(tag_name);
    this.sections.push({
      id: id,
      template: staticHtml`<section style="opacity: 0"><${tag}></${tag}></section>`,
    });
    this.requestUpdate();
    
    requestAnimationFrame(() => {
      if (!this.currentSection) {
        this.currentSection = this.renderRoot.firstElementChild;
        this.currentSection.style.opacity = '1';
        return;
      }
      const newSection = this.renderRoot.querySelector('section:last-of-type');
      this.currentSection.style.opacity = '0';
      newSection.style.opacity = '1';
      newSection.addEventListener('transitionend', () => {
        this.currentSection.remove();
        this.currentSection = newSection;
        this.currentSection.firstElementChild.save = this.save;
        this.sections.shift();
        this.requestUpdate();
      }, { once: true });
    });
    return success;
  }
}

customElements.define('rpg-content', Content);