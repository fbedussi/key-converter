//@ts-check
import {labels} from './state.js'

export const t = (text) => {
  const translation = labels.value?.[text]
  return translation ?? text
}

fetch(`/${navigator.language.split('-')[0].toLowerCase()}.json`)
  .then(res => res.status === 200 && res.json())
  .then(res => {
    document.documentElement.lang = navigator.language
    labels.value = res
  })

customElements.define("i-18", class extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    if (labels.value) {
      this.render()
    }
    labels.subscribe(this.render.bind(this))
  }

  render() {
    this.innerText = t(this.innerText)
  }
})


