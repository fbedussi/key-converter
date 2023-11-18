//@ts-check

import { createSignal } from './signal.js';

export const notationEng = createSignal(true)

export const minor = createSignal(false);

export const selectedStartKey = createSignal(null);

export const selectedDestKey = createSignal(null);

const notesEng = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const notesIta = ["DO", "DO#", "RE", "RE#", "MI", "FA", "FA#", "SOL", "SOL#", "LA", "LA#", "SÌ"]

export const notes = createSignal(notesEng)

notationEng.subscribe(() => {
  notes.value = notationEng.value ? notesEng : notesIta
})

const majorModes = ["", "m", "m", "", "", "m", "m"];
const minorModes = ["m", "m", "", "m", "m", "", ""];

export const modes = createSignal(majorModes)

minor.subscribe(minor => {
  modes.value = minor ? minorModes : majorModes
})

export const labels = createSignal()
