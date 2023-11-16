import { expect, fixture, html } from '@open-wc/testing';
import './key-row.js'
import {selectedStartKey} from './state.js'


describe('KeyRow', () => {
  it('C', async () => {
    selectedStartKey.value = 0
    const el = await fixture(`<table><tr is="key-row" id="start-key"></tr></table>`);
    await expect(el).dom.to.equalSnapshot();
  });
});
