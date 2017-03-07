import './style/main.scss';
import React from 'react';
import { render } from 'react-dom';
import ReactDOMFeatureFlags from 'react-dom/lib/ReactDOMFeatureFlags';
ReactDOMFeatureFlags.useFiber = true;
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import { Layout } from 'antd';
const { Sider, Content } = Layout;
import HeaderComponent from './components/header';
import Home from './components/home';
import Graffiti from './components/graffiti';
import Cover from './components/cover';
import Error from './components/error';
render((
    <Router>
        <Layout className={'layout-center'}>
            <Sider collapsible><HeaderComponent /></Sider>
            <Layout>
                <Content>
                    <Switch>
                        <Route path={'/'} exact component={Home} />
                        <Route path={'/graffiti'} component={Graffiti} />
                        <Route path={'/cover'} component={Cover} />
                        <Route component={Error} />
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    </Router>
), document.querySelector('#root'));