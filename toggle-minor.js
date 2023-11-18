//@ts-check

import {minor} from './state.js'

class ToggleMinor extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.querySelector("input")?.addEventListener("change", (e) => {
      const checked = e.target && 'checked' in e.target && e.target.checked 
      minor.value = checked
    })
  }
}

customElements.define("toggle-minor", ToggleMinor);

