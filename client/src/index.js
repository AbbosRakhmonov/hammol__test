import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";
import Store from "./App/Store";
import "bootstrap/dist/css/bootstrap.min.css"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode>
    <Router>
        <Provider store={Store}>
            <App/>
        </Provider>
    </Router>
</React.StrictMode>);
