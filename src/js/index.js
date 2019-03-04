import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import "./index.styl";
import App from "./components/App/App";

ReactDOM.render(
    <BrowserRouter>
        <Route component={App}/>
    </BrowserRouter>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept();
}
