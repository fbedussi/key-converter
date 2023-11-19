//@ts-check

import {notes, selectedStartKey, selectedDestKey, modes} from './state.js'

const key = {
  selectedStartKey,
  selectedDestKey
}

customElements.define(
  "key-cell",
  class extends HTMLTableCellElement {
    constructor() {
      super()

      this.selectedKey = key[this.getAttribute('key')]
      this.index = Number(this.getAttribute('index'))
    }

    connectedCallback() {
      this.render()

      this.selectedKey?.subscribe(this.render.bind(this))

      modes.subscribe(this.render.bind(this))

      notes.subscribe(this.render.bind(this))
    }

    render() {
      if (this.selectedKey?.value === null) {
        return
      }

      const index = this.selectedKey?.value;
      const repeatedNotes = notes.value.concat(notes.value);
      const keyNotes = [
        repeatedNotes[index],
        repeatedNotes[index + 2],
        repeatedNotes[index + 4],
        repeatedNotes[index + 5],
        repeatedNotes[index + 7],
        repeatedNotes[index + 9],
        repeatedNotes[index + 11]
      ];

      this.innerText = `${keyNotes[this.index]}${modes.value[this.index]}`
    }
  },
  {extends: "td"}
)


