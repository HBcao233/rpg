export const getTime = () => {
  return parseInt(Date.now() / 1000);
}
export function formatDateTime(d) {
  if (d < 9999999999) d *= 1000;
  const formatter = new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
  return formatter.format(d).replaceAll('/', '-');
}

export function formatDateTimeLess(d) {
  d = parseInt(d);
  if (d < 9999999999) d *= 1000;
  if (Number.isNaN(d)) d = undefined;
  const t = formatDateTime(d);
  const now = new Date();
  const date = new Date(d);
  const dayStart = new Date().setHours(0, 0, 0, 0);
  if (date.getTime() > dayStart) return '今天 ' + t.slice(t.indexOf(' ') + 1, t.lastIndexOf(':'));
  if (date.getTime() > dayStart - 3600 * 24 * 1000) return '昨天 ' + t.slice(t.indexOf(' ') + 1, t.lastIndexOf(':'));
  if (date.getFullYear() == now.getFullYear()) return t.slice(t.indexOf('-') + 1, t.lastIndexOf(' '));
  return t.slice(0, t.lastIndexOf(' '));
}

export function formatTime(t) {
  let s = Math.floor(t % 60);
  if (s < 10) s = '0' + s;
  let m = Math.floor(t / 60 % 60);
  if (m < 10) m = '0' + m;
  let h = Math.floor(t / 3600 % 24);
  if (h < 10) h = '0' + h;
  let d = Math.floor(t / 86400);
  if (d < 10) d = '0' + d;
  
  if (d > 0) return `${d}d${h}:${m}:${s}`
  if (h > 0) return `${h}:${m}:${s}`;
  return `${m}:${s}`;
}

export function formatTime2(t) {
  let s = Math.floor(t % 60);
  let m = Math.floor(t / 60 % 60);
  let h = Math.floor(t / 3600 % 24);
  let d = Math.floor(t / 86400);
  if (d > 0) {
    if (h > 0) return `${d}d${h}h`;
    if (m > 0) return `${d}d${m}m`;
    if (s > 0) return `${d}d${s}s`;
    return `${d}d`;
  }
  if (h > 0) {
    if (m > 0) return `${h}h${m}m`;
    if (s > 0) return `${h}h${s}s`
    return `${h}h`;
  }
  if (m > 0) {
    if (s > 0) return `${m}m${s}s`;
    return `${m}m`;
  }
  if (s > 0) return `${s}s`;
  return '0';
}

export function formatTime3(t) {
  return formatTime2(t).replace('d', '天').replace('h', '小时').replace('m', '分钟').replace('s', '秒');
}