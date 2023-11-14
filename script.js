import { createSignal } from './signal.js';

const notesEng = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const notesIta = ["DO", "DO#", "RE", "RE#", "MI", "FA", "FA#", "SOL", "SOL#", "SÌ"]

const majorModes = ["", "m", "m", "", "", "m", "m"];
const minorModes = ["m", "m", "", "m", "m", "", ""];

const ui = {
  notationEng: document.querySelector('[name="notation"][value="eng"]'),
  notationIta: document.querySelector('[name="notation"][value="ita"]'),
  minor: document.querySelector("#minor"),
  selectStartKey: document.querySelector("#select-start-key"),
  selectDestKey: document.querySelector("#select-dest-key"),
  startKey: document.querySelector("#start-key"),
  destKey: document.querySelector("#dest-key")
};

const notationEng = createSignal(true)

ui.notationEng.addEventListener('change', e => {
  notationEng.value = e.target.checked
})
ui.notationIta.addEventListener('change', e => {
  notationEng.value = !e.target.checked
})

notationEng.subscribe(() => {
  renderStartKey();
  renderDestKey();
  populateSelect(ui.selectStartKey, "Choose the starting key");
  populateSelect(ui.selectDestKey, "Choose the destination key");
})

const minor = createSignal(false);

ui.minor.addEventListener("change", (e) => {
  minor.value = e.target.checked;
});

minor.subscribe(() => {
  renderStartKey();
  renderDestKey();
});

function populateSelect(select, label) {
  select.innerHTML = ''
  
  const header = document.createElement("option");
  header.innerText = label;
  header.disabled = true;
  header.selected = true;
  select.appendChild(header);
  
  const notes = notationEng.value ? notesEng : notesIta

  notes.forEach((note, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.innerText = note;
    select.appendChild(option);
  });
}

populateSelect(ui.selectStartKey, "Choose the starting key");
populateSelect(ui.selectDestKey, "Choose the destination key");

const selectedStartKey = createSignal(null);
selectedStartKey.subscribe(renderStartKey)

const selectedDestKey = createSignal(null);
selectedDestKey.subscribe(renderDestKey)

function renderKey(destination, signal) {
  if (signal.value === null) {
    return
  }
  
  destination.innerHTML = "";
  const index = signal.value;
  const notes = notationEng.value ? notesEng : notesIta
  const repeatedNotes = notes.concat(notes);
  const keyNotes = [
    repeatedNotes[index],
    repeatedNotes[index + 2],
    repeatedNotes[index + 4],
    repeatedNotes[index + 5],
    repeatedNotes[index + 7],
    repeatedNotes[index + 9],
    repeatedNotes[index + 11]
  ];

  const modes = ui.minor.checked ? minorModes : majorModes;

  keyNotes.forEach((note, index) => {
    const el = document.createElement("td");
    el.innerText = `${note}${modes[index]}`;
    destination.appendChild(el);
  });
}

function renderStartKey() {
  renderKey(ui.startKey, selectedStartKey);
}

function renderDestKey() {
  renderKey(ui.destKey, selectedDestKey);
}

ui.selectStartKey.addEventListener(
  "change",
  e => {
    selectedStartKey.value = Number(e.target.value)
  }
);

ui.selectDestKey.addEventListener(
  "change",
  e => {
    selectedDestKey.value = Number(e.target.value)
  }
);
