global.Promise = require('bluebird');
import './style/main.scss';
import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import Header from './components/header';
import Home from './components/home';
import Graffiti from './components/graffiti';
import Cover from './components/cover';
import Error from './components/error';
function App(props) {
    return (
        <div className='app'>
            <Header currentRoute={props.location.pathname}/>
             {props.children}
        </div>
    );
}
render((
    <Router history={browserHistory}>
        <Route path='/' component={App}>
            <IndexRoute component={Home}/>
            <Route path='graffiti' component={Graffiti}/>
            <Route path='cover' component={Cover}/>
            <Route path='*' component={Error}/>
        </Route>
    </Router>
), document.querySelector('#root'));
