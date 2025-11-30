import * as components from './pages.js';
import { camelToKebab } from '/src/utils/index.js';

export const pages = new Map();
for (const [k, cls] of Object.entries(components)) {
  const key = camelToKebab(k);
  const tag = `rpg-${key}`;
  customElements.define(tag, cls);
  pages.set(key.replace('section', ''), tag);
}