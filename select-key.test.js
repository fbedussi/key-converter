import { expect, fixture, html } from '@open-wc/testing';
import './select-key.js'

describe('SelectKey', () => {
  it('works', async () => {
    const el = await fixture(`<select is="select-key" label="Choose the starting key" id="select-start-key"></select>`);
    await expect(el).dom.to.equalSnapshot();
  });
});
