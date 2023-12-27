//@ts-check

import {subscribeSignals} from './signal.js'
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
      subscribeSignals(this)
    }

    render() {
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

      const text = `${keyNotes[this.index]}${modes.value[this.index]}`

      if (this.selectedKey?.value === null) {
        return
      }

      this.innerText = text
    }
  },
  {extends: "td"}
)


