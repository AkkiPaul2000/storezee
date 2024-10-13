// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductList from './components/ProductList';
import CartPage from './components/CartPage';

const App = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/" exact component={ProductList} />
                    <Route path="/cart" component={CartPage} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
