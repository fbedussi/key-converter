import {notes, selectedStartKey, selectedDestKey} from './state.js'

class SelectKey extends HTMLSelectElement {
  constructor() {
    super()

    this.label = this.getAttribute('label')
  }

  connectedCallback() {
    this.render()

    notes.subscribe(this.render.bind(this))

    this.addEventListener(
      "change",
      this.onChange
    );
  }

  onChange(e) {
    if (this.id === 'select-start-key') {
      selectedStartKey.value = Number(e.target.value)
    } else if (this.id === 'select-dest-key') {
      selectedDestKey.value = Number(e.target.value)
    }
  }

  render() {
    this.innerHTML = ''

    const header = document.createElement("option");
    header.innerText = this.label;
    header.disabled = true;
    header.selected = true;
    this.appendChild(header);

    notes.value.forEach((note, index) => {
      const option = document.createElement("option");
      option.value = index;
      option.innerText = note;
      option.selected = index === selectedStartKey.value
      this.appendChild(option);
    });
  }
}

customElements.define("select-key", SelectKey, {extends: "select"});

