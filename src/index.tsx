import "@assets/styles/index.scss";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { App } from './App';

const root = document.getElementById('root');
const render = (Component) => ReactDOM.render(
    <AppContainer>
        <Component>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos temporibus a quod facilis libero veniam unde maxime eum earum, aperiam inventore commodi labore nobis dolore facere cupiditate, velit rerum id.
            </p>
        </Component>
    </AppContainer>,
    root
);

render(App)

if ((module as any).hot) {
    (module as any)
        .hot
        .accept((...args) => {
            console.log(args);
            render(App)
        });
}