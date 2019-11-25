import { customElement, styles } from "aurelia";
import { DebounceBindingBehavior, bindable, BindingMode } from "@aurelia/runtime";

import template from './mua-search-with-select.html';
import css from './mua-search-with-select.css';

export class SearchValueConverter {
    public toView(items: { text: string, highLightText: string }[], searchString: string) {
        
        console.log(`%crunning toView searchString: '${searchString}' with item length of ${items.length}`, "color:red");
        
        if (searchString == undefined || searchString.trim() === '') {
            return items;
        }

        const searchStringLower = searchString.toLowerCase();
        for(var i = 0; i < items.length; i++) {
            const idx = items[i].text.toLowerCase().indexOf(searchStringLower);
            if (idx > -1) {
                items[i].highLightText = items[i].text.substring(0, idx) 
                    + "<strong class=\"highlight\">" 
                    + items[i].text.substring(idx, searchString.length) 
                    + "</strong>" 
                    + items[i].text.substring(idx + searchString.length);
            } else {
                items[i].highLightText = undefined;
            }
        }
        return items;

    }
}

@customElement({
    name: 'mua-search-with-select',
    template,
    shadowOptions: { mode: 'open' },
    dependencies: [
        styles(css),
        DebounceBindingBehavior,
        SearchValueConverter
    ]
})
export class MuaSearchWithSelect {
    @bindable({
        attribute: 'label',
        mode: BindingMode.toView
    })
    public label: string = '';

    @bindable({
        attribute: 'items',
        mode: BindingMode.twoWay
    })
    public items = [];

    public searchText = '';
}