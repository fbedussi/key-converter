import {notes, selectedStartKey, selectedDestKey, modes} from './state.js'

class KeyRow extends HTMLTableRowElement {
  constructor() {
    super()

    if (this.id === 'start-key') {
      this.selectedKey = selectedStartKey
    } else if (this.id === 'dest-key') {
      this.selectedKey = selectedDestKey
    }
  }

  connectedCallback() {
    this.render()

    this.selectedKey.subscribe(this.render.bind(this))

    modes.subscribe(this.render.bind(this))
    
    notes.subscribe(this.render.bind(this))
  }

  render() {
    if (this.selectedKey.value === null) {
      return
    }
    
    this.innerHTML = "";
    const index = this.selectedKey.value;
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

    keyNotes.forEach((note, index) => {
      const el = document.createElement("td");
      el.innerText = `${note}${modes.value[index]}`;
      this.appendChild(el);
    });
  }
}

customElements.define("key-row", KeyRow, {extends: "tr"});

