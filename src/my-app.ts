import { customElement } from '@aurelia/runtime';

import { MuaSearchWithSelect } from './components/mua-search-with-select';
import template from './my-app.html';

@customElement({
  name: 'my-app',
  dependencies: [
    MuaSearchWithSelect
  ],
  template
})
export class MyApp {
  public items = [
    { id: 1, text: 'NDC London' },
    { id: 2, text: 'NDC Sydney' },
    { id: 3, text: 'NDC Malmo' },
    { id: 4, text: 'NDC Oslo' },
    { id: 5, text: 'Techorama NL' },
    { id: 6, text: 'Techorama BE' },
    { id: 7, text: 'Techorama Las Vegas' },
  ];

  public addNewItem(itemToAdd: string) {
    this.items.push({ id: this.items.length, text: itemToAdd});
  }
}
