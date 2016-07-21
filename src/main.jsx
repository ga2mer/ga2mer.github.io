global.Promise = require('bluebird');
import './style/main.scss'
import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'preact-router';
import Header from './components/header/header.jsx';
import Home from './components/home/home.jsx';
import Graffiti from './components/graffiti/graffiti.jsx';
class App extends React.Component {
    constructor() {
        super();
        this.state = {
            currentRoute: null
        };
        this.handleRoute = this.handleRoute.bind(this);
    }
    handleRoute(e) {
        this.setState({currentRoute: e.url});
    }
    render(props, state) {
        return (
            <div class="app">
                <Header currentRoute={state.currentRoute}/>
                <Router onChange={this.handleRoute}>
                    <Home path="/"/>
                    <Graffiti path="/graffiti"/>
                    <Error type="404" default/>
                </Router>
            </div>
        );
    }
}
ReactDOM.render((<App/>), document.querySelector('#root'));
