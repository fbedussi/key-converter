//@ts-check

import {notationEng} from './state.js'

class ChangeNotes extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.querySelector('input[value="eng"]')?.addEventListener('change', e => {      
      const checked = e.target && 'checked' in e.target && e.target.checked 
      notationEng.value = checked
    })
    this.querySelector('input[value="ita"]')?.addEventListener('change', e => {
      const checked = e.target && 'checked' in e.target && e.target.checked 
      notationEng.value = !checked
    })
  }
}

customElements.define("change-notes", ChangeNotes);

