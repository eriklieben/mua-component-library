import Aurelia, { StyleConfiguration, CustomElement } from 'aurelia';
import { MyApp } from '../src/my-app';

function createAu(template: string, ...deps: readonly unknown[]) {
  const wrapper = CustomElement.define({name: 'wrapper', template});
  document.body.appendChild(document.createElement('wrapper'));
  return Aurelia.register(StyleConfiguration.shadowDOM()).register(deps).app(wrapper);
}

function cleanup() {
  const wrapper = document.querySelector('wrapper');
  if (wrapper) {
    wrapper.remove();
  }
}

describe('my-app', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render message', async () => {
    const au = createAu('<my-app></my-app>', MyApp);
    await au.start().wait();
    const node = document.querySelector('my-app');
    // In Shadow DOM open mode, shadowRoot is also accessible through DOM API
    //   node.shadowRoot
    // But only Aurelia API can access shadowRoot in both open and closed mode.
    const shadowRoot = CustomElement.for(node).projector.provideEncapsulationSource();
    const text = (shadowRoot as Node).textContent;
    expect(text.trim()).toBe('Hello World!');
    await au.stop().wait();
    cleanup();
  });
});
