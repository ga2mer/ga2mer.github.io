global.Promise = require('bluebird');
import './style/main.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import Header from './components/header/header.jsx';
import Home from './components/home/home.jsx';
import Graffiti from './components/graffiti/graffiti.jsx';
function Error() {
    return (
        <div>404</div>
    );
}
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentRoute: '/'
        };
        this.handleRoute = this.handleRoute.bind(this);
    }
    handleRoute(e) {
        console.log(e);
        this.setState({currentRoute: e.url});
    }
    render() {
        return (
            <div className='app'>
                <Header currentRoute={this.props.location.pathname}/>
                {this.props.children}
            </div>
        );
    }
}
ReactDOM.render((
    <Router history={browserHistory}>
        <Route path='/' component={App}>
            <IndexRoute component={Home} />
            <Route path='graffiti' component={Graffiti}/>
            <Route path='*' component={Error}/>
        </Route>
    </Router>
), document.querySelector('#root'));
