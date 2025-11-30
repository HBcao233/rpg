export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
    || (window.innerWidth <= 768);
}

export const copyToClipboard = (text) => {
  let nav = navigator || window.navigator;
  if (MoeApp.initData == '' && nav && nav.clipboard && nav.clipboard.writeText) {
    nav.clipboard.writeText(text);
    return
  }
  const tempInput = document.createElement("textarea");
  tempInput.value = text;
  let t = $('dialog[open]');
  if (!t) t = document.body;
  t.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  t.removeChild(tempInput);
}

/**
 * 下载文件
 */
export const downloadFile = (url, filename) => {
  if (!filename) filename = `${Date.now()}.png`;
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
};
