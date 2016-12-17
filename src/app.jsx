import './style/main.scss';
import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute} from 'inferno-router';
import createBrowserHistory from 'history/createBrowserHistory';
import Header from './components/header';
import Home from './components/home';
import Graffiti from './components/graffiti';
import Cover from './components/cover';
import Error from './components/error';
const browserHistory = createBrowserHistory();
function App({children}) {
    return (
        <div className='app'>
            <Header/> {children}
        </div>
    );
}
render((
    <Router history={browserHistory}>
        <Route component={App}>
            <IndexRoute component={Home}/>
            <Route path='graffiti' component={Graffiti}/>
            <Route path='cover' component={Cover}/>
            <Route path='*' component={Error}/>
        </Route>
    </Router>
), document.querySelector('#root'));
