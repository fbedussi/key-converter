import {notes, selectedStartKey, selectedDestKey} from './state.js'

document.querySelector('#select-start-key').onChange = e => {
  selectedStartKey.value = Number(e.target.value)
}

document.querySelector('#select-dest-key').onChange = e => {
  selectedDestKey.value = Number(e.target.value)
}

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

