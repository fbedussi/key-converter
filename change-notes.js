//@ts-check

import {notationEng} from './state.js'

class ChangeNotes extends HTMLElement {
  constructor() {
    super()

    this.ita = this.querySelector('input[value="ita"]')
    this.eng = this.querySelector('input[value="eng"]')
  }

  connectedCallback() {
    if (navigator.language.split('-')[0].toLowerCase() === 'it') {
      // @ts-ignore
      this.ita.checked = true
      notationEng.value = false
    }
    this.eng?.addEventListener('change', e => {      
      const checked = e.target && 'checked' in e.target && e.target.checked 
      notationEng.value = checked
    })
    this.ita?.addEventListener('change', e => {
      const checked = e.target && 'checked' in e.target && e.target.checked 
      notationEng.value = !checked
    })
  }
}

customElements.define("change-notes", ChangeNotes);

