import 'whatwg-fetch';
import Aurelia, { StyleConfiguration } from 'aurelia';

import { MyApp } from './my-app';
import css from './main.css';

Aurelia.register(StyleConfiguration.shadowDOM({
    sharedStyles: [css]
})).app(MyApp).start();
