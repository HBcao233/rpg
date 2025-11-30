import pako from '/assets/pako_v2.1.0.esm.js';

class Base64 {
  /**
   * 代码来自https://github.com/haochuan9421/base64-pro/
   */
  _lookup;
  _revLookup;
  _encodeChunkSize = 16383;
  constructor() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
    this._lookup = [...alphabet].filter((char, i, arr) => arr.indexOf(char) === i && char.charCodeAt(0) < 128);
    this._revLookup = this._lookup.reduce(
      (map, char, i) => {
        map[char.charCodeAt(0)] = i;
        return map;
      },
      { 43: 62, 47: 63, 45: 62, 95: 63 }
    );
  }
  
  bufferToBase64(value, padding) {
    let arrayBuffer; // 底层的二进制数据
    let byteOffset; // 开始编码的位置
    let totalBytes; // 需要编码的字节总数
    if (ArrayBuffer.isView(value)) {
      arrayBuffer = value.buffer;
      byteOffset = value.byteOffset;
      totalBytes = value.byteLength;
    } else if (value instanceof ArrayBuffer) {
      arrayBuffer = value;
      byteOffset = 0;
      totalBytes = value.byteLength;
    } else {
      throw new Error("encode value can only be arrayBuffer or typedArray or dataView");
    }

    // 3个字节为一组进行处理，多出来的1个或2个字节最后单独处理
    const extraBytes = totalBytes % 3;
    const unit3Bytes = totalBytes - extraBytes;
    // 创建 Uint8Array 视图用于读取字节内容
    const view = new Uint8Array(arrayBuffer, byteOffset, totalBytes);

    // 字符串频繁拼接会比较慢，所以先分块保存，最后再一次性 join 成一个完整的字符串返回
    let chunks = [];
    for (let i = 0; i < unit3Bytes; i += this._encodeChunkSize) {
      let chunk = [];
      for (let j = i, chunkEnd = Math.min(unit3Bytes, i + this._encodeChunkSize); j < chunkEnd; j += 3) {
        // 把三个字节拼接成一个完整的 24 bit 数字
        const $24bitsNum = (view[j] << 16) | (view[j + 1] << 8) | view[j + 2];
        // 以 6 bit 为一个单元进行读取
        chunk.push(
          this._lookup[$24bitsNum >> 18] +
            this._lookup[($24bitsNum >> 12) & 0b111111] + // "& 0b111111" 是为了只保留最后面的6个字节
            this._lookup[($24bitsNum >> 6) & 0b111111] +
            this._lookup[$24bitsNum & 0b111111]
        );
      }
      chunks.push(chunk.join(""));
    }
    // 处理多出来的1个或2个字节
    if (extraBytes === 1) {
      const $8bitsNum = view[totalBytes - 1];
      chunks.push(this._lookup[$8bitsNum >> 2]);
      chunks.push(this._lookup[($8bitsNum << 4) & 0b111111]);
      padding && chunks.push("==");
    } else if (extraBytes === 2) {
      const $16bitsNum = (view[totalBytes - 2] << 8) | view[totalBytes - 1];
      chunks.push(this._lookup[$16bitsNum >> 10]);
      chunks.push(this._lookup[($16bitsNum >> 4) & 0b111111]);
      chunks.push(this._lookup[($16bitsNum << 2) & 0b111111]);
      padding && chunks.push("=");
    }

    return chunks.join("");
  }
  
  base64ToBuffer(base64Str) {
    if (typeof base64Str !== "string") {
      throw new Error("the first argument must be string");
    }
    // 去除尾部的 padding
    base64Str = base64Str.replace(/==?$/, "");
    
    // 4 个字符为一组进行处理，多出来的2个或3个字符最后单独处理
    let totalChars = base64Str.length;
    const extraChars = totalChars % 4;
    const unit4Chars = totalChars - extraChars;
    // 创建 arrayBuffer，每4个字符需要3个字节，如果最后多出来2个字符额外需要1个字节，如果最后多出来3个字符额外需要2个字节
    const arrayBuffer = new ArrayBuffer((unit4Chars / 4) * 3 + (extraChars === 0 ? 0 : extraChars - 1));
    // 创建 DataView 视图用于修改字节内容
    const view = new Uint8Array(arrayBuffer);

    let byteOffset = 0;
    for (let i = 0; i < unit4Chars; i += 4) {
      // 把4个字符对应的 code pointer 还原成3字节的数字
      const $24bitsNum =
        (this._revLookup[base64Str.charCodeAt(i)] << 18) |
        (this._revLookup[base64Str.charCodeAt(i + 1)] << 12) |
        (this._revLookup[base64Str.charCodeAt(i + 2)] << 6) |
        this._revLookup[base64Str.charCodeAt(i + 3)];

      // 以 8 bit 为一个单元修改 arrayBuffer 3次
      view[byteOffset++] = $24bitsNum >>> 16;
      view[byteOffset++] = ($24bitsNum >>> 8) & 0b11111111;
      view[byteOffset++] = $24bitsNum & 0b11111111;
    }
    
    // 处理多出来的2个或3个字符
    if (extraChars === 2) {
      const $8bitNum = (this._revLookup[base64Str.charCodeAt(totalChars - 2)] << 2) | (this._revLookup[base64Str.charCodeAt(totalChars - 1)] >>> 4);
      view[byteOffset++] = $8bitNum;
    } else if (extraChars === 3) {
      const $16bitNum =
        (this._revLookup[base64Str.charCodeAt(totalChars - 3)] << 10) |
        (this._revLookup[base64Str.charCodeAt(totalChars - 2)] << 4) |
        (this._revLookup[base64Str.charCodeAt(totalChars - 1)] >> 2);
      view[byteOffset++] = $16bitNum >>> 8;
      view[byteOffset++] = $16bitNum & 0b11111111;
    }
    return arrayBuffer;
  }
  
  encode(str) {
    const encoder = new TextEncoder();
    let buffer = encoder.encode(str);
    return this.bufferToBase64(buffer);
  }
  
  decode(str) {
    const decoder = new TextDecoder("utf-8");
    let buffer = this.base64ToBuffer(str)
    if (buffer === false) return false;
    return decoder.decode(buffer);
  }
}
export const b64 = new Base64();

export const gz_encode = function (s) {
  return b64.bufferToBase64(pako.gzip(s));
}

export const gz_decode = function (s) {
  const decoder = new TextDecoder("utf-8");
  return decoder.decode(pako.ungzip(b64.base64ToBuffer(s)));
}

export const gz64_encode = function (s) {
  const encoder = new TextEncoder();
  let buffer = encoder.encode(s);
  if (buffer.length > 140) {
    return gz_encode(s)
  }
  return b64.bufferToBase64(buffer);
}

export const gz64_decode = function (s) {
  if (s.startsWith('H4sI')) {
    return gz_decode(s)
  }
  return b64.decode(s)
}