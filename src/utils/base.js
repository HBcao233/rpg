import '/assets/localforage.min.js';

String.prototype.vanilla_split = String.prototype.split;
String.prototype.split = function(separator, limit) {
  // 如果没有提供separator，使用原生split
  if (separator === undefined) {
    return this.vanilla_split();
  }
  
  // 如果没有提供limit或limit为0，使用原生split
  if (limit === undefined || limit < 0) {
    return this.vanilla_split(separator);
  }
  if (limit === 0) return [this.toString()];
  
  const result = [];
  let str = this.toString();
  let count = 0;
  
  // 处理separator为空字符串的情况
  if (separator === '') {
    const chars = str.split('');
    return chars.slice(0, limit).concat(chars.slice(limit).join('') || []).filter(s => s !== '');
  }
  
  // 处理正则表达式separator
  if (separator instanceof RegExp) {
    const parts = [];
    let lastIndex = 0;
    let match;
    const regex = new RegExp(separator.source, separator.flags.includes('g') ? separator.flags : separator.flags + 'g');
    
    while ((match = regex.exec(str)) !== null && count < limit) {
      parts.push(str.slice(lastIndex, match.index));
      lastIndex = regex.lastIndex || match.index + match[0].length;
      count++;
      if (!regex.global) break;
    }
    
    if (lastIndex < str.length) {
      parts.push(str.slice(lastIndex));
    }
    
    return parts;
  }
  
  // 处理字符串separator
  let searchIndex = 0;
  
  while (count < limit) {
    const index = str.indexOf(separator, searchIndex);
    
    if (index === -1) {
      // 没有更多的分隔符了
      result.push(str.slice(searchIndex));
      break;
    }
    
    result.push(str.slice(searchIndex, index));
    searchIndex = index + separator.length;
    count++;
    
    if (count === limit) {
      // 达到limit，剩余部分作为最后一个元素
      result.push(str.slice(searchIndex));
    }
  }
  
  // 如果字符串为空或只有分隔符，确保返回正确结果
  if (result.length === 0) {
    result.push(str);
  }
  
  return result;
};

export const camelToKebab = (str) => {
  return str
    .replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)
    .replace(/^-/, '');
}

export const getValue = (k, callback) => {
  return localforage.getItem(k, callback);
}
export const setValue = (k, v, callback) => {
  localforage.setItem(k, v, callback);
}


export function* range(start, end, step = 1) {
  if (step === 0) {
    throw new RangeError('The step of the range cannot be 0')
  }
  if (end === undefined) {
    end = start
    start = 0
  }
  if (typeof start !== 'number' || typeof end !== 'number' || typeof step !== 'number') {
    throw new RangeError('Only numbers are accepted as arguments')
  }
  if (step > 0) {
    while (start < end) {
      yield start
      start += step
    }
  } else {
    while (start > end) {
      yield start
      start += step
    }
  }
}

export const isNumber = s => Object.prototype.toString.call(s) === "[object Number]";
export const isString = s => Object.prototype.toString.call(s) === "[object String]";
export const isArrayLike = s => s != null && typeof s[Symbol.iterator] === 'function';
