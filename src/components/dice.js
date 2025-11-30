import { ElElement, html, css } from '/src/element.js';


class Dice extends ElElement {
  static styles = css`
:host {
  display: inline-block;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s;
  width: 40px;
  height: 40px;
  margin: 0 10px;
  font-size: 20px;
  font-weight: bold;
  color: #000;
  line-height: 40px;
  vertical-align: text-bottom;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB4PSI1IiB5PSI1IiB3aWR0aD0iOTAiIGhlaWdodD0iOTAiIHJ4PSIxMCIgc3R5bGU9ImZpbGw6I2ZmZjtzdHJva2U6IzMzMztzdHJva2Utd2lkdGg6MjsiLz48L3N2Zz4=');
}

:host(:active) {
  transform: scale(0.95);
}

:host([disabled]) {
  opacity: .3;
}

:host([data-dice="1"]) {
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB4PSI1IiB5PSI1IiB3aWR0aD0iOTAiIGhlaWdodD0iOTAiIHJ4PSIxMCIgc3R5bGU9ImZpbGw6I2ZmZjtzdHJva2U6IzMzMztzdHJva2Utd2lkdGg6MjsiLz48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI4IiBmaWxsPSIjMzMzIi8+PC9zdmc+');
}

:host([data-dice="2"]) {
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB4PSI1IiB5PSI1IiB3aWR0aD0iOTAiIGhlaWdodD0iOTAiIHJ4PSIxMCIgc3R5bGU9ImZpbGw6I2ZmZjtzdHJva2U6IzMzMztzdHJva2Utd2lkdGg6MjsiLz48Y2lyY2xlIGN4PSIyNSIgY3k9IjI1IiByPSI4IiBmaWxsPSIjMzMzIi8+PGNpcmNsZSBjeD0iNzUiIGN5PSI3NSIgcj0iOCIgZmlsbD0iIzMzMyIvPjwvc3ZnPg==');
}

:host([data-dice="3"]) {
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB4PSI1IiB5PSI1IiB3aWR0aD0iOTAiIGhlaWdodD0iOTAiIHJ4PSIxMCIgc3R5bGU9ImZpbGw6I2ZmZjtzdHJva2U6IzMzMztzdHJva2Utd2lkdGg6MjsiLz48Y2lyY2xlIGN4PSIyNSIgY3k9IjI1IiByPSI4IiBmaWxsPSIjMzMzIi8+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iOCIgZmlsbD0iIzMzMyIvPjxjaXJjbGUgY3g9Ijc1IiBjeT0iNzUiIHI9IjgiIGZpbGw9IiMzMzMiLz48L3N2Zz4=');
}

:host([data-dice="4"]) {
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB4PSI1IiB5PSI1IiB3aWR0aD0iOTAiIGhlaWdodD0iOTAiIHJ4PSIxMCIgc3R5bGU9ImZpbGw6I2ZmZjtzdHJva2U6IzMzMztzdHJva2Utd2lkdGg6MjsiLz48Y2lyY2xlIGN4PSIyNSIgY3k9IjI1IiByPSI4IiBmaWxsPSIjMzMzIi8+PGNpcmNsZSBjeD0iMjUiIGN5PSI3NSIgcj0iOCIgZmlsbD0iIzMzMyIvPjxjaXJjbGUgY3g9Ijc1IiBjeT0iMjUiIHI9IjgiIGZpbGw9IiMzMzMiLz48Y2lyY2xlIGN4PSI3NSIgY3k9Ijc1IiByPSI4IiBmaWxsPSIjMzMzIi8+PC9zdmc+');
}

:host([data-dice="5"]) {
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB4PSI1IiB5PSI1IiB3aWR0aD0iOTAiIGhlaWdodD0iOTAiIHJ4PSIxMCIgc3R5bGU9ImZpbGw6I2ZmZjtzdHJva2U6IzMzMztzdHJva2Utd2lkdGg6MjsiLz48Y2lyY2xlIGN4PSIyNSIgY3k9IjI1IiByPSI4IiBmaWxsPSIjMzMzIi8+PGNpcmNsZSBjeD0iMjUiIGN5PSI3NSIgcj0iOCIgZmlsbD0iIzMzMyIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjgiIGZpbGw9IiMzMzMiLz48Y2lyY2xlIGN4PSI3NSIgY3k9IjI1IiByPSI4IiBmaWxsPSIjMzMzIi8+PGNpcmNsZSBjeD0iNzUiIGN5PSI3NSIgcj0iOCIgZmlsbD0iIzMzMyIvPjwvc3ZnPg==');
}

:host([data-dice="6"]) {
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB4PSI1IiB5PSI1IiB3aWR0aD0iOTAiIGhlaWdodD0iOTAiIHJ4PSIxMCIgc3R5bGU9ImZpbGw6I2ZmZjtzdHJva2U6IzMzMztzdHJva2Utd2lkdGg6MjsiLz48Y2lyY2xlIGN4PSIyNSIgY3k9IjI1IiByPSI4IiBmaWxsPSIjMzMzIi8+PGNpcmNsZSBjeD0iMjUiIGN5PSI1MCIgcj0iOCIgZmlsbD0iIzMzMyIvPjxjaXJjbGUgY3g9IjI1IiBjeT0iNzUiIHI9IjgiIGZpbGw9IiMzMzMiLz48Y2lyY2xlIGN4PSI3NSIgY3k9IjI1IiByPSI4IiBmaWxsPSIjMzMzIi8+PGNpcmNsZSBjeD0iNzUiIGN5PSI1MCIgcj0iOCIgZmlsbD0iIzMzMyIvPjxjaXJjbGUgY3g9Ijc1IiBjeT0iNzUiIHI9IjgiIGZpbGw9IiMzMzMiLz48L3N2Zz4=');
}
  `;
  
  static properties = {
    sides: {
      type: Number,
      attribute: true,
      default: 6,
    },
    disabled: {
      type: Boolean,
      attribute: true,
      reflect: true,
      default: false,
    },
    rolling: {
      type: Boolean,
      reflect: true,
    },
    dice: {
      type: Number,
      attribute: 'data-dice',
      reflect: true,
      default: 6,
    },
  }
  
  onMounted() {
    this.addEventListener('click', this);
  }
  
  onBeforeUnmounted() {
    this.removeEventListener('click', this);
  }
  
  handleEvent(e) {
    if (e.type === 'click') this.onClick();
  }
  
  onClick() {
    if (this.disabled) return;
    if (this.rolling) {
      this.randomResult();
      return;
    }
    this.rolling = true;
    this.timer = setInterval(() => {
      const count = Math.floor(Math.random() * this.sides) + 1;
      this.dice = count;
      if (this.sides > 6) {
        this.dice.innerText = count;
      } 
    }, 100);
    
    const duration = 1500 + Math.random() * 500;
    this.timer2 = setTimeout(() => {
      this.randomResult();
    }, duration);
  }
  
  randomResult() {
    clearInterval(this.timer);
    clearInterval(this.timer2);
    this.rolling = false;
    
    const result = Math.floor(Math.random() * this.sides) + 1;
    this.dice = result;
    if (this.sides > 6) {
      dice.innerText = result;
    } 
    const event = new CustomEvent('dice', {
      bubbles: true,
      composed: true,
      cancelable: false,
      detail: { dice: result },
    });
    this.dispatchEvent(event);
  }
}

customElements.define('rpg-dice', Dice);