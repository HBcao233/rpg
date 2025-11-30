import { RPGElement, html, css, nothing } from '/src/element.js';
import { getValue, setValue } from '/src/utils/index.js';


class RpgMap extends RPGElement {
  static styles = [this.globalCSS, css`
:host {
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 15px 0;
}

.map-box {
  position: relative;
}

.map {
  width: 100%;
  max-width: 500px;
  aspect-ratio: 1 / 1; /* 保持正方形 */
  overflow: hidden;
  position: relative;
  cursor: grab;
  touch-action: none;
}
:host([dragging]) .map {
  cursor: grabbing;
}

/* 地图内容包装器 */
.map-content {
  width: 100%;
  height: 100%;
  position: relative;
  transform-origin: center center;
  transition: none;
}
:host([animate]) .map-content {
  transition: transform .3s ease;
}

/* 标记层 */
.map-markers {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* 默认不接收鼠标事件 */
}

/* 地图标记样式 */
.map-marker {
  position: absolute;
  pointer-events: auto; /* 标记可以接收鼠标事件 */
  cursor: pointer;
  transition: transform 0.2s;
  font-size: 5px;
  line-height: 1;
  border: none;
}

.map-marker:hover {
  transform: translate(0, -10%) scale(1.1);
}
.map-marker:hover > div {
  border: 1px solid #c1b91c;
}

/* 默认标记样式 */
.marker-pin {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.marker-pin::before {
  content: '';
  width: 50%;
  height: 50%;
  background: white;
  border-radius: 50%;
  transform: rotate(45deg);
}

.marker-battle {
  width: 100%;
  height: 100%;
  background: url('/static/images/icon_fight.jpg') no-repeat;
  background-size: cover;
  /*background-color: #ff5a57;*/
  border: .7px solid #000;
}
.marker-random_event {
  width: 100%;
  height: 100%;
  background: url('/static/images/icon_random.jpg') no-repeat;
  background-size: cover;
  /*background-color: #ff5a57;*/
  border: .7px solid #000;
}

/* 标记标签 */
.marker-label {
  position: absolute;
  bottom: 45px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0,0,0,0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 5px;
  white-space: nowrap;
  display: none;
}

.map-marker:hover .marker-label {
  display: block;
}

.map-marker .box {
  margin: 0;
  padding: 2px 5px;
}
.map-marker .tooltip-box {
  width: fit-content;
  white-space: nowrap;
  font-size: 5px;
  bottom: calc(100% + 5px);
  border-radius: 5px;
  padding: 2px 4px;
}
.map-marker .tooltip-box::after {
  width: 2px;
  height: 2px;
  border-width: 1px;
}

.map-image {
  width: 100%;
  object-fit: cover;
  transform-origin: center center;
  transition: none;
  user-select: none;
  -webkit-user-drag: none;
}

.map .zoom-info {
  position: absolute;
  top: 0;
  right: 5px;
  color: #ecf0f1;
  font-size: 14px;
  line-height: 34px;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.map .zoom-info.show {
  opacity: .8;
}

.map-box .zoomIn,
.map-box .zoomOut {
  position: absolute;
  right: 5px;
  width: 25px;
  z-index: 1;
  touch-action: manipulation;
}
.map-box .zoomIn {
  bottom: 30px;
}
.map-box .zoomOut {
  bottom: 5px;
}
  `];
  
  static properties = {
    /* 当前缩放比例 */
    scale: {
      type: Number,
      state: true,
      default: 1,
    },
    /* 是否正在拖动 */
    dragging: {
      type: Boolean,
      reflect: true,
    },
    /** X轴位置 */
    posX: {
      type: Number,
      state: true,
      default: 0,
    },
    /** Y轴位置 */
    posY: {
      type: Number,
      state: true,
      default: 0,
    },
    animate: {
      type: Boolean,
      reflect: true,
      default: false,
    },
    /** 标记数组 */
    markers:  {
      type: Array,
      default: [],
    },
  }
  
  static #marker_index = 0;
  
  setup() {
    getValue('map').then((v) => {
      v = v ?? {};
      if (v.scale) this.scale = v.scale;
      if (v.posX) this.posX = v.posX;
      if (v.posY) this.posY = v.posY;
    });
    
    /** @type {number} 最小缩放比例 */
    this.minScale = 1;
    /** @type {number} 最大缩放比例 */
    this.maxScale = 3;
    /** @type {number} 缩放速度 */
    this.zoomSpeed = 0.1;
    
    /** @type {number} 拖动起始X坐标 */
    this.startX = 0;
    /** @type {number} 拖动起始Y坐标 */
    this.startY = 0;
    /** @type {number} 拖动起始时的X位置 */
    this.startPosX = 0;
    /** @type {number} 拖动起始时的Y位置 */
    this.startPosY = 0;
    
    /** @type {number} 双指触摸的初始距离 */
    this.initialPinchDistance = 0;
    /** @type {number} 双指触摸的初始缩放比例 */
    this.initialScale = 1;
    
    /** @type {number|null} 缩放信息隐藏定时器 */
    this.zoomInfoTimer = null;
    
    /** @type {number|null} 双击检测定时器 */
    this.tapTimeout = null;
    /** @type {number} 上次点击时间 */
    this.lastTapTime = 0;
    /** @type {number} 双击时间阈值（毫秒） */
    this.doubleTapDelay = 300;
  }
  
  render() {
    return html`<rpg-box type="13" class="map-box">
  <div class="map" 
    @mousedown="${this.handleMouseDown}" 
    @wheel="${this.handleWheel}"
    @dblclick=${this.handleDoubleClick}
    @touchstart=${this.handleTouchStart}
    @touchmove=${this.handleTouchMove}
    @touchend="${this.handleTouchEnd}"
    @contextmenu="${e => e.preventDefault()}"
  >
    <div class="map-content" style="transform: translate(${this.posX}px, ${this.posY}px) scale(${this.scale})">
      <img class="map-image" src="/assets/images/map1.jpg">
      <div class="map-markers"></div>
    </div>
    <span class="zoom-info">${Math.round(this.scale * 100)}%</span>
  </div>
  <img class="zoomIn" src="/assets/svg/zoomIn.svg" @click="${this.zoomIn}">
  <img class="zoomOut" src="/assets/svg/zoomOut.svg" @click="${this.zoomOut}">
</rpg-box>`;
  }
  
  onMounted() {
    // 事件绑定
    document.addEventListener('mousemove', this);
    document.addEventListener('mouseup', this);
  }
  
  onBeforeUnmounted() {
    document.removeEventListener('mousemove', this);
    document.removeEventListener('mouseup', this);
  }
  
  firstUpdated() {
    this.box = this.renderRoot.firstElementChild;
    /** @type {HTMLElement} 地图容器元素 */
    this.container = this.box.firstElementChild;
    this.content = this.container.firstElementChild;
    /** @type {HTMLImageElement} 地图图片元素 */
    this.image = this.content.firstElementChild;
    /** @type {HTMLElement} 缩放信息显示元素 */
    this.zoomInfo = this.content.nextElementSibling;
  }
  
  handleEvent(e) {
    const handles = {
      'mousemove': this.handleMouseMove,
      'mouseup': this.handleMouseUp,
    }
    handles[e.type].call(this, e);
  }
  
  /**
   * 处理鼠标按下事件
   * @param {MouseEvent} e - 鼠标事件对象
   */
  handleMouseDown(e) {
    this.dragging = true;
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.startPosX = this.posX;
    this.startPosY = this.posY;
  }
  
  /**
   * 处理鼠标移动事件
   * @param {MouseEvent} e - 鼠标事件对象
   */
  handleMouseMove(e) {
    if (!this.dragging) return;
    
    const deltaX = e.clientX - this.startX;
    const deltaY = e.clientY - this.startY;
    
    this.posX = this.startPosX + deltaX;
    this.posY = this.startPosY + deltaY;
    
    this.updateTransform();
  }
  
  /**
   * 处理鼠标释放事件
   * @param {MouseEvent} e - 鼠标事件对象
   */
  handleMouseUp(e) {
    this.dragging = false;
    this.saveTransform();
  }
  
  /**
   * 处理双击事件
   * @param {MouseEvent} e - 鼠标事件对象
   */
  handleDoubleClick(e) {
    e.preventDefault();
    
    // 获取点击位置相对于容器中心的坐标
    const rect = this.container.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    this.toggleZoom(x, y);
  }

  /**
   * 处理鼠标滚轮事件
   * @param {WheelEvent} e - 滚轮事件对象
   */
  handleWheel(e) {
    e.preventDefault();
    
    const delta = e.deltaY > 0 ? -this.zoomSpeed : this.zoomSpeed;
    const oldScale = this.scale;
    const newScale = Math.max(this.minScale, Math.min(this.maxScale, this.scale + delta));
    
    if (newScale !== this.scale) {
      // 计算鼠标位置相对于容器的坐标
      const rect = this.container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // 调整位置以保持鼠标下的点不动
      const scaleRatio = newScale / oldScale;
      this.posX = x - (x - this.posX) * scaleRatio;
      this.posY = y - (y - this.posY) * scaleRatio;
      
      this.scale = newScale;
      this.updateTransform();
    }
  }

  /**
   * 处理触摸开始事件
   * @param {TouchEvent} e - 触摸事件对象
   */
  handleTouchStart(e) {
    // try{e.preventDefault();}catch(err){};
    
    if (e.touches.length === 1) {
      // 单指触摸 - 拖动
      this.dragging = true;
      this.startX = e.touches[0].clientX;
      this.startY = e.touches[0].clientY;
      this.startPosX = this.posX;
      this.startPosY = this.posY;
    } else if (e.touches.length === 2) {
      // 双指触摸 - 缩放
      this.dragging = false;
      this.initialPinchDistance = this.getPinchDistance(e.touches);
      this.initialScale = this.scale;
    }
  }

  /**
   * 处理触摸移动事件
   * @param {TouchEvent} e - 触摸事件对象
   */
  handleTouchMove(e) {
    e.preventDefault();
    
    if (e.touches.length === 1 && this.dragging) {
      // 单指移动
      const deltaX = e.touches[0].clientX - this.startX;
      const deltaY = e.touches[0].clientY - this.startY;
      
      this.posX = this.startPosX + deltaX;
      this.posY = this.startPosY + deltaY;
      
      this.updateTransform();
    } else if (e.touches.length === 2) {
      // 双指缩放
      const currentDistance = this.getPinchDistance(e.touches);
      const scale = currentDistance / this.initialPinchDistance;
      
      this.scale = Math.max(this.minScale, Math.min(this.maxScale, this.initialScale * scale));
      this.updateTransform();
    }
  }

  /**
   * 处理触摸结束事件
   * @param {TouchEvent} e - 触摸事件对象
   */
  handleTouchEnd(e) {
    if (e.touches.length === 0) {
      this.dragging = false;
      // 检测双击
      const currentTime = Date.now();
      const tapLength = currentTime - this.lastTapTime;
      
      if (tapLength >= this.doubleTapDelay || tapLength <= 0) {
        this.lastTapTime = currentTime;
      } else {
        // 双击检测成功
        e.preventDefault();
        
        // 获取最后一个触摸点的位置
        const touch = e.changedTouches[0];
        const rect = this.container.getBoundingClientRect();
        const x = touch.clientX - rect.left - rect.width / 2;
        const y = touch.clientY - rect.top - rect.height / 2;
        
        this.toggleZoom(x, y);
        this.lastTapTime = 0; // 重置时间
      }
    } else if (e.touches.length === 1) {
      // 从双指变为单指，重新初始化拖动
      this.dragging = true;
      this.startX = e.touches[0].clientX;
      this.startY = e.touches[0].clientY;
      this.startPosX = this.posX;
      this.startPosY = this.posY;
    }
    this.saveTransform();
  }

  /**
   * 计算两个触摸点之间的距离
   * @param {TouchList} touches - 触摸点列表
   * @returns {number} 两点之间的距离
   */
  getPinchDistance(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }
  
  /**
   * 切换缩放状态
   * @param {number} centerX - 缩放中心X坐标
   * @param {number} centerY - 缩放中心Y坐标
   */
  toggleZoom(centerX = 0, centerY = 0) {
    const targetScale = this.scale === 1 ? 2 : 1;
    const scaleRatio = targetScale / this.scale;
    
    // 调整位置以保持点击位置不动
    if (targetScale === 2) {
      this.posX = centerX - (centerX - this.posX) * scaleRatio;
      this.posY = centerY - (centerY - this.posY) * scaleRatio;
    } else {
      // 恢复到100%时居中
      this.posX = 0;
      this.posY = 0;
    }
    
    this.scale = targetScale;
    this.animateTransform();
    this.saveTransform();
  }

  /**
   * 限制拖动范围，防止出现空白
   * @description 根据当前缩放比例计算并限制位置
   */
  limitPosition() {
    const containerRect = this.container.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;
    
    // 计算缩放后的图片尺寸
    const scaledWidth = containerWidth * this.scale;
    const scaledHeight = containerHeight * this.scale;
    
    // 计算最大可移动距离
    const maxX = Math.max(0, (scaledWidth - containerWidth) / 2);
    const maxY = Math.max(0, (scaledHeight - containerHeight) / 2);
    
    // 限制位置在边界内
    this.posX = Math.max(-maxX, Math.min(maxX, this.posX));
    this.posY = Math.max(-maxY, Math.min(maxY, this.posY));
  }

  /**
   * 更新图片的变换属性
   * @description 应用当前的缩放和位置到图片元素
   */
  updateTransform() {
    this.limitPosition();
    this.showZoomInfo();
  }
  /**
   * 保存的变换属性
   */
  saveTransform() {
    setValue('map', {
      scale: this.scale,
      posX: this.posX,
      posY: this.posY,
    });
  }
  
  /**
   * 带动画的变换更新
   * @description 平滑过渡缩放和位置变化
   */
  animateTransform() {
    this.animate = true;
    this.updateTransform();
    
    // 动画结束后移除过渡效果
    setTimeout(() => {
      this.animate = false;
    }, 300);
  }
  
  /**
   * 显示缩放信息并在3秒后自动隐藏
   * @description 显示当前缩放百分比，3秒后淡出
   */
  showZoomInfo() {
    // 清除之前的定时器
    if (this.zoomInfoTimer) {
      clearTimeout(this.zoomInfoTimer);
    }
    
    // 显示缩放信息
    this.zoomInfo.classList.add('show');
    
    // 3秒后隐藏
    this.zoomInfoTimer = setTimeout(() => {
      this.zoomInfo.classList.remove('show');
      this.zoomInfoTimer = null;
    }, 3000);
  }

  /**
   * 放大地图
   * @description 增加缩放比例
   */
  zoomIn() {
    this.scale = Math.min(this.maxScale, this.scale + this.zoomSpeed * 2);
    this.updateTransform();
    this.saveTransform();
  }

  /**
   * 缩小地图
   * @description 减少缩放比例
   */
  zoomOut() {
    this.scale = Math.max(this.minScale, this.scale - this.zoomSpeed * 2);
    this.updateTransform();
    this.saveTransform();
  }

  /**
   * 重置视图
   * @description 将地图恢复到初始位置和缩放
   */
  resetView() {
    this.scale = 1;
    this.posX = 0;
    this.posY = 0;
    this.updateTransform();
    this.saveTransform();
  }
  
  /**
   * 添加地图标记
   * @param {Object} options - 标记选项
   * @param {number} options.x - X坐标（百分比，0-100）
   * @param {number} options.y - Y坐标（百分比，0-100）
   * @param {string} [options.label] - 标记标签
   * @param {string} [options.type] - 标记类型
   * @param {string} [options.id] - 标记ID
   * @param {Function} [options.onClick] - 点击回调
   * @returns {HTMLElement} 标记元素
   */
  addMarker(options) {
    let { 
      x, y, key,
      label = '', 
      type = 'pin', 
      onclick,
      width, 
      height,
    } = options;
  
    // 创建标记元素
    const blocks = {
      'battle': '战斗格',
      'random_event': '随机事件格',
    }
    if (type in blocks) {
      label = blocks[type];
      label = `#${key} ` + label;
    }
    
    const id = ++RpgMap.#marker_index;
    marker.id = 'marker-' + id;
    marker.left = `${x}%`;
    marker.top = `${y}%`;
    switch (type) {
      case 'pin':
        width = 3.34;
        height = 3.34;
        break;
      case 'battle':
      case 'random_event':
        width = 4.1;
        height = 4.1;
        break;
    }
    if (width) {
      if (width != 'auto') width += '%';
      marker.width = width;
    }
    if (height) {
      if (height != 'auto') height += '%';
      marker.height = height;
    }
    
    // 根据类型创建标记内容
    switch (type) {
      case 'pin':
        marker.inner = html`<div class="marker-pin"></div>${label ? `<div class="marker-label">${label}</div>` : ''}`;
        break;
      case 'battle':
      case 'random_event':
        marker.inner = html`<div class="marker-${type}"></div><div class="tooltip-box">${label}</div>`;
        break;
      case 'box':
        marker.inner = html`<div class="box box15"></div><div class="tooltip-box">${label}</div>`;
        break;
      case 'start':
        marker.inner = html`<div class="box box15"><div>开始</div></div><div class="tooltip-box">${label}</div>`;
        break;
      case 'custom':
        marker.inner = safeHTML(options.html || '');
        break;
    }
    
    this.markers.push(marker);
  }
}

customElements.define('rpg-map', RpgMap);