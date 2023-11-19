//@ts-check

import {notes, selectedStartKey, selectedDestKey} from './state.js'

const key = {
  selectedStartKey,
  selectedDestKey,
}

customElements.define(
  "select-key",
  class extends HTMLSelectElement {
    constructor() {
      super()

      this.label = this.getAttribute('label')
      this.key = key[this.getAttribute('key')]
    }

    connectedCallback() {
      this.render()

      notes.subscribe(this.render.bind(this))


      this.addEventListener('change', (e) => {
        // @ts-ignore
        this.key.value = Number(e.target?.value)
      })
    }

    render() {
      this.innerHTML = ''

      const header = document.createElement("option");
      header.innerHTML = `<i-18>${this.label || ''}</i-18>`
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
  },
  {extends: "select"}
)
