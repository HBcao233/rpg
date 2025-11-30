import { pages } from '/src/pages/index.js';

/**
 * rgb(r,g,b)颜色转十六进制
 */
export const rgbToHex = (rgb) => {
  // 检查rgb或rgba格式
  const match = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.?\d*))?\)$/);
  if (!match) {
    return '';
  }
  // 提取RGB值
  const r = parseInt(match[1]);
  const g = parseInt(match[2]);
  const b = parseInt(match[3]);
  // 转换为十六进制
  const hex = '#' + 
    ((1 << 24) + (r << 16) + (g << 8) + b)
    .toString(16)
    .slice(1);
  return hex;
}

/**
 * 获取Element带颜色文本，注意 Element 需要添加到body中才能获取到 color
 */
export const getElementText = (obj) => {
  if (obj == null) return '';
  if (typeof obj[Symbol.iterator] === 'function') {
    return [...obj].map(getElementText).join(' ');
  }
  if (obj.childElementCount > 0) {
    return getElementText(obj.children);
  }
  const color = rgbToHex(window.getComputedStyle(obj).color);
  return `ō${obj.innerText}óǒ${color}ò`;
}

/**
 * getElementText 得到的带颜色文本转 html
 */
export const sectionSummary2html = (text) => {
  return text.replaceAll(/\ō(.*?)\ó\ǒ(#.*?)\ò/g, '<span style="color: $2">$1</span>');
}

/**
 * 清除 html标签
 */
export const cleanHTML = (text) => {
  return text.replaceAll(/<.*?\>.*?\<\/.*?\>/g, '');
}

/**
 * 裁剪 ElementText
 */
export const cutSectionSummary = (str, maxLength = 100) => {
  let totalLength = 0;
  let result = '';
  let i = 0;
  let flag = false;
  while (i < str.length && totalLength < maxLength) {
    if (str[i] === 'ō' && str.indexOf('óǒ', i) !== -1) {
      const bracketEnd = str.indexOf('óǒ', i);
      const linkEnd = str.indexOf('ò', bracketEnd + 2);
      if (linkEnd === -1) break;
      const content = str.substring(i + 1, bracketEnd);
      const remaining = maxLength - totalLength;
      if (content.length <= remaining) {
        result += str.substring(i, linkEnd + 1);
        totalLength += content.length;
        i = linkEnd + 1;
      } else {
        result += 'ō' + content.substring(0, remaining) + str.substring(bracketEnd, linkEnd + 1);
        totalLength += remaining;
        i = linkEnd + 1;
        flag = true;
        break;
      }
    } else {
      result += str[i];
      totalLength++;
      i++;
    }
  }
  if (flag || totalLength >= maxLength) result += '...';
  return result;
}

export const getSectionSummary = (section_id) => {
  return new Promise((resolve, reject) => {
    const tag_name = pages.get(String(section_id));
    if (!tag_name) return resolve(null);
    const tag = document.createElement(tag_name);
    tag.style.display = 'none';
    document.body.appendChild(tag);
    requestAnimationFrame(() => {
      const res = getElementText(tag.shadowRoot);
      tag.remove();
      resolve(res);
    })
  });
}