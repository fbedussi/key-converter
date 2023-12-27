//@ts-check

import {notationEng} from './state.js'

customElements.define(
  "change-notes",
  class ChangeNotes extends HTMLFieldSetElement {
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
      this.addEventListener('change', e => {
        // @ts-ignore
        notationEng.value = e.target.checked && e.target.value === 'eng'
      })
    }
  },
  {extends: "fieldset"}
)
