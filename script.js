import {notationEng, minor} from './state.js'

const ui = {
  notationEng: document.querySelector('[name="notation"][value="eng"]'),
  notationIta: document.querySelector('[name="notation"][value="ita"]'),
  minor: document.querySelector("#minor"),
};

ui.notationEng.addEventListener('change', e => {
  notationEng.value = e.target.checked
})
ui.notationIta.addEventListener('change', e => {
  notationEng.value = !e.target.checked
})

ui.minor.addEventListener("change", (e) => {
  minor.value = e.target.checked;
});
