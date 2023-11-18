//@ts-check

import {notes, selectedStartKey, selectedDestKey} from './state.js'
import {t} from './i-18.js'

const key = {
  selectedStartKey, 
  selectedDestKey,
}

class SelectKey extends HTMLSelectElement {
  constructor() {
    super()

    this.label = this.getAttribute('label')
    this.key = key[this.dataset.key]
  }

  connectedCallback() {
    this.render()

    notes.subscribe(this.render.bind(this))


    this.addEventListener('change',  (e) => {
      // @ts-ignore
      this.key.value = Number(e.target?.value)
    })
  }

  render() {
    this.innerHTML = ''

    const header = document.createElement("option");
    header.innerText = t(this.label) || '';
    header.disabled = true;
    header.selected = true;
    this.appendChild(header);

    notes.value.forEach((note, index) => {
      const option = document.createElement("option");
      option.value = index;
      option.innerText = note;
      option.selected = index === this.key.value
      this.appendChild(option);
    });
  }
}

customElements.define("select-key", SelectKey, {extends: "select"});

