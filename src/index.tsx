import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { App } from './App';
import './assets/styles/index.scss';

const root = document.getElementById('root');
const render = (Component) => ReactDOM.render(
    <AppContainer>
        <Component />
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