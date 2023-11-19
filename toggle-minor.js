//@ts-check

import {minor} from './state.js'

customElements.define(
  "toggle-minor",
  class extends HTMLElement {
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
)
